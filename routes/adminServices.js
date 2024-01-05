const { reject } = require("promise");
const { connectToCluster } = require("../config/dbConnect");
require("dotenv").config({ path: '../config/.env' });
const { ObjectId } = require('mongodb');

const userCollection = process.env.USER_COLLECTION
const bookCollection = process.env.COLLECTION_1

// admin add book  
async function addProduct(data) {
    let product = {
        bookName: data.bookName,
        author: data.author,
        category: data.category,
        language: data.language,
        isbn: data.isbn,
        price: parseInt(data.price),
        units: parseInt(data.units),
        bookSummary: data.bookSummary
    }
    try {
        const db = await connectToCluster();
        const collection = db.collection(bookCollection);
        const result = await collection.insertOne(product);
        return result;
    } catch (error) {
        console.error('Error inserting data:', error);

    }
}
// admin all book view using try catch
async function getAllBooks() {
    try {
        let books
        const db = await connectToCluster();
        const collection = db.collection(bookCollection);
        books = await collection.find().toArray()
        return books
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

// admin delete item using promise

async function deleteBook(bookId) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await connectToCluster();
            const result = await client.collection(bookCollection).deleteOne({ _id: new ObjectId(bookId) });
            if (result.deletedCount === 1) {
                resolve({
                    success: true,
                    message: 'Book deleted successfully',
                    statusCode: 200
                });
            } else {
                resolve({
                    success: false,
                    message: 'Book not found',
                    statusCode: 404
                });
            }
        } catch (error) {
            reject({
                success: false,
                error: 'Internal server error',
                statusCode: 500,
                error
            });
        }
    });
}

// view product

async function viewProduct(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let db = await connectToCluster();
            let product = await db.collection(bookCollection).findOne({ _id: new ObjectId(id) });
            resolve(product);
        } catch (error) {
            reject(error);
        }
    });
}

function updateProduct(id, data) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectToCluster();
            const result = await db.collection(bookCollection).updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        bookName: data.bookName,
                        author: data.author,
                        category: data.category,
                        language: data.language,
                        isbn: data.isbn,
                        price: parseInt(data.price),
                        units: parseInt(data.units),
                        bookSummary: data.bookSummary,
                    },
                }
            );
            // Close the connection 
            // db.close();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    addProduct,
    getAllBooks,
    deleteBook,
    viewProduct,
    updateProduct
};

