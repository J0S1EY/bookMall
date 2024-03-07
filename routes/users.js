var express = require('express');
var router = express.Router();
var fruits = require('../public/javascripts/fruits')
var dbServices = require('./adminServices')
var userService = require('./userServices');
const session = require('express-session');



var cartCount = null
var cartTotal = 0

/* HOME PAGE */
router.get('/', async function (req, res, next) {
  let user = req.session.user
  let userId = req.session.userId

  try {
    const products = await dbServices.getAllBooks();

    if (userId) {
      cartCount = await userService.cartCount(userId)
      cartTotal = await userService.getOrderAmount(userId)

    }
    res.render('user/view-products', { title: 'Book Mall', products, user, cartCount, userId, cartTotal });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books.' });
  }
});

/* LOGIN PAGE */

router.get('/user-login', async function (req, res) {
  try {
    if (req.session.login) {
      res.redirect('/')
    } else {
      res.render('user/user-login',
        {
          style: 'userLogin.css',
          title: 'user login',
          "logErr": req.session.loginErr
        })
      req.session.loginErr = false
    }
  } catch (error) {
    res.status(500).json({ error: 'Error user login.' });
  }
})

/* REGISTER */

router.post('/user-register', async (req, res) => {
  try {
    let data = await userService.signUp(req.body);
    res.status(data.statusCode).json(data.result);
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});


/* LOGIN */

router.post('/user-login', async (req, res) => {
  try {
    let data = await userService.login(req.body);
    if (data.status == true) {
      req.session.user = data.user,
        req.session.userId = data.userId,
        req.session.login = true
      res.status(data.statusCode)
      res.redirect('/')
    } else {
      res.status(data.statusCode)
      req.session.loginErr = "Invalid User Name or Password"
      res.redirect('/user-login')
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

/* LOG-OUT */

router.get('/user-logout', async (req, res) => {
  try {
    req.session.destroy()
    cartCount = null
    res.redirect('/')
  } catch (error) {
    res.status(404).json(error);
  }
})

/* VERIFY LOGIN MIDILWARE */

const verifyLogin = (req, res, next) => {
  try {
    if (req.session.login) {
      next();
    } else {
      res.redirect('/user-login');
    }
  } catch (error) {
    // Handle any potential synchronous errors here
    console.error('Error in verifyLogin middleware:', error);
    res.status(500).send('Internal Server Error');
  }
};

/* USER CART */

router.get('/user-cart', verifyLogin, async (req, res) => {
  let user = req.session.user;
  let userId = req.session.userId;
  userService.getCart(userId).then(async (response) => {
    let cartProduct = response;
    cartTotal = await userService.getOrderAmount(userId)
    // console.log("Cart result", response)
    res.render('user/user-cart', { cartProduct, user, cartCount, cartTotal, userId });
  })
  // try {
  //   let items=userService.getCart(userId)
  //   console.log("Cart Item ",items)
  //   res.render('user/user-cart');
  // } catch (error) {
  //   res.status(404).json(error);
  // }


})

/* ADD CART */

router.get('/add-cart/:id', verifyLogin, async (req, res) => {
  let proId = req.params.id;
  let userId = req.session.userId;
  try {
    let data = userService.addToCart(proId, userId)
    // console.log(proId)
    res.status(200)
    res.redirect('/')
  } catch (error) {
    res.status(404).json(error);

  }

})

/* CHANGE QUANTITY  */

router.post("/changeCartQuantity", (req, res, next) => {
  // console.log(req.body)
  let cartId = req.body.cartId
  let proId = req.body.proId
  let count = req.body.count
  let quantity = req.body.quantity
  let userId = req.body.userId
  userService.changeCartCount(cartId, proId, count, quantity)
    .then(async (data) => {
      // console.log(data)
      cartCount = await userService.cartCount(userId)
      data.totalValue = await userService.getOrderAmount(userId);
      res.status(200).json(data);
    }).catch((error) => {
      res.status(500).json(error);
    });

})

/* CHECK OUT*/

router.get('/user-checkOut', verifyLogin, async (req, res, next) => {
  let userId = req.session.userId;
  cartTotal = await userService.getOrderAmount(userId)
  // console.log(cartAmount)
  res.render('user/place-order', { cartCount, cartTotal, userId })
});

/* PLACE ORDER*/
router.post('/place-order', verifyLogin, (req, res, next) => {
  let orderData = req.body;
  userService.getOrderList(orderData.userId)
    .then(cartProducts => userService.getOrderAmount(orderData.userId)
      .then(cartTotal => userService.placeOrder(orderData, cartProducts.cartItems, cartTotal)
        .then(result => {
          if (orderData.paymentMode === 'COD') {
            res.status(result.statusCode).json({ codSuccess: true, message: result.message });
          } else {
            let orderId = result.response.insertedId;
            let amount = cartTotal * 100
            userService.generateRazorpay(orderId, amount)
              .then(response => {
                res.json(response);
              })
              .catch(error => {
                res.status(500).json({ success: false, message: "Payment Error", error });
              });
          }
        })
        .catch(error => {
          console.error("Error placing order:", error);
          res.status(500).json({ success: false, message: "Internal Server Error", error });
        })
      )
      .catch(error => {
        console.error("Error getting order amount:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
      })
    )
    .catch(error => {
      console.error("Error getting order list:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error });
    });
});

/* PAYMENT VERIFY*/

router.post('/verify_payment', (req, res) => {
  console.log("verify payment", req.body)
})

/* ORDER  HISTORY */

router.get('/order-history', verifyLogin, async (req, res) => {
  try {
    let userId = req.session.userId;
    const response = await userService.orderHistory(userId);
    let orderHistory = response.orderData
    // console.log(orderHistory)
    res.render('user/order-history', { statusCode: response.statusCode, message: response.message, orderHistory, cartCount });
  } catch (error) {
    // console.error("Error fetching order history:", error);
    res.status(error.statusCode || 500).send(error.message || "Internal Server Error");
  }
});


/* VIEW PRODUCT */

router.get('/view-product', verifyLogin, async (req, res) => {
  try {
    const proId = req.query.id;
    const result = await userService.viewProduct(proId);
    const products = await dbServices.getAllBooks();

    // console.log(result.data);

    res.render('user/view-product', { result, products, cartCount, cartTotal });
  } catch (error) {
    console.error('Error in viewing product:', error);
    res.status(500).send('Internal Server Error');
  }
});


/* ADD CART FROM VIEW PRODUCT */

router.post('/add-to-cart', verifyLogin, async (req, res) => {
  try {
    let productId = req.body.productId;
    let quantity = parseInt(req.body.quantity);
    let userId = req.session.userId;
    // Call the `addCart` function to add the product to the cart
    if (userId) {
      const result = await userService.addCart(userId, productId, quantity, cartTotal);
      // Send a success response back to the client
      res.json({ success: true, message: result });
    } else {
      res.json({ success: false, message: "login error" })

    }

  } catch (error) {
    // If an error occurs, send an appropriate error response
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});








module.exports = router;
