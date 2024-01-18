var express = require('express');
var router = express.Router();
var fruits = require('../public/javascripts/fruits')
var dbServices = require('./adminServices')
var userService = require('./userServices');
const session = require('express-session');

var cartCount = null
var cartTotal = 0
/* GET home page. */
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

//register

router.post('/user-register', async (req, res) => {
  try {
    let data = await userService.signUp(req.body);
    res.status(data.statusCode).json(data.result);
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
});

//login


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
// logout

router.get('/user-logout', async (req, res) => {
  try {
    req.session.destroy()
    cartCount = null
    res.redirect('/')
  } catch (error) {
    res.status(404).json(error);
  }
})

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

router.get('/user-cart', verifyLogin, async (req, res) => {
  let user = req.session.user;
  let userId = req.session.userId;
  userService.getCart(userId).then((response) => {
    let cartProduct = response;
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

router.get('/add-cart/:id', verifyLogin, async (req, res) => {

  let proId = req.params.id;
  let userId = req.session.userId;
  try {
    let data = userService.addToCart(proId, userId)
    //  console.log(proId, userId)
    res.status(200)
    res.redirect('/')
  } catch (error) {
    res.status(404).json(error);

  }

})

router.post("/changeCartQuantity",verifyLogin, (req, res, next) => {
  // console.log(req.body)
  let cartId = req.body.cartId
  let proId = req.body.proId
  let count = req.body.count
  let quantity = req.body.quantity
  let userId = req.body.userId
  userService.changeCartCount(cartId, proId, count, quantity)
    .then(async (data) => {
      // console.log(data)
      data.totalValue = await userService.getOrderAmount(userId);
      cartCount = await userService.cartCount(userId)
      res.status(200).json(data);
    }).catch((error) => {
      res.status(500).json(error);
    });

})

router.get('/user-checkOut',verifyLogin, async (req, res, next) => {
  let userId = req.session.userId;
  cartTotal = await userService.getOrderAmount(userId)
  // console.log(cartAmount)
  res.render('user/place-order', { cartCount, cartTotal,userId })
});

router.post('/place-order',verifyLogin, async (req, res) => {
  console.log(req.body)
})






module.exports = router;
