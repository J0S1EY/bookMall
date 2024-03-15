var express = require('express');
const fruits = require('../public/javascripts/fruits');
var router = express.Router();
var dbServices = require('./adminServices')
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');



/* GET users listing. */
router.get('/', async function (req, res, next) {

  try {
    const books = await dbServices.getAllBooks(); // Wait for the asynchronous function to complete
    res.render('admin/view-products', { admin: true, books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books.' });
  }

})

handlebars.registerHelper('incrementIndex', function (index) {
  return index + 1;
});

router.get('/add-product', function (req, res) {
  res.render('admin/add-product', { admin: true })
},)



// adding a product
router.post('/add-product', async (req, res) => {
  try {
    const img = req.files.imgFile;
    const result = await dbServices.addProduct(req.body);
    img.mv(`./public/images/bookImg/${result.insertedId}.jpeg`, (err) => {
      if (err) {
        return res.status(500).json({ error: `Error uploading file: ${err}` });
      } else {
        return res.json({ message: `Inserted ${result.insertedId} documents into the 'products' collection.` }).redirect('/');
      }

    });
  } catch (error) {
    return res.status(500).json({ error: 'Error adding the product.' });
  }
});



// delete product using query

// router.get('/delete-product/:id', async function (req, res) { let id = req.params.id}   
// router.get('/delete-product/', (req, res) => {
//   let id = req.query.id;
//   dbServices.deleteBook(id).then((result) => {
//     res.status(result.statusCode).json(result)
//     res.redirect("/")
//   }).catch((error) => {
//     res.status(500).json(error)
//     res.redirect("/")
//   })
// });

/*
router.get('/delete-product/', async (req, res) => {
  try {
    let id = req.query.id;
    let bookName = req.query.productName
    const result = await dbServices.deleteBook(id);

    // Check if the book deletion was successful
    if (result.success) {
      res.redirect('/admin/')
      res.status(result.statusCode)
    } else {
      res.redirect('/admin/')
      res.status(result.statusCode)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      statusCode: 500,
      errorMessage: error.message
    });
  }
});
*/

router.get('/delete-product/', async (req, res) => {
  try {
    let productId = req.query.id;
    let result = await dbServices.deleteBook(productId);
    if (result.success) {
      // Construct the path to the image file
      let imagePath = `./public/images/bookImg/${productId}.jpeg`;
      //console.log("image path", imagePath);
      // Check if the image file exists
      if (fs.existsSync(imagePath)) {
        console.log('Image found. Deleting...');
        // Attempt to delete the image file
        fs.unlinkSync(imagePath);
        //console.log('Image deleted successfully.');

      } else {
        console.log('Image not found.');
      }
      return res.json({ message: `Deleted product with ID ${productId} and its associated image successfully.` });
    } else {
      return res.status(404).json({ error: `Product with ID ${productId} not found.` }).redirect('/');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Error deleting the product.' });
  }
});



// edit product using call back

router.get('/edit-product/:id', async function (req, res) {
  let id = req.params.id
  let product = await dbServices.viewProduct(id)
  res.render('admin/edit-product', { admin: true, product })
},)

router.post('/update-product/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    await dbServices.updateProduct(id, data);
    res.status(200)
    res.redirect('/admin/')
    if (req.files && req.files.imgFile) {
      const image = req.files.imgFile;
      image.mv(`./public/images/bookImg/${id}.jpeg`, (err) => {
        if (err) {
          console.error('Error moving image:', err);
        }
      })
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/out-stocks', function (req, res) {
  res.render('admin/out-stocks', { admin: true })
},)


module.exports = router;
