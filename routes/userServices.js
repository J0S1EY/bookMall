const { resolve, reject } = require("promise");
const { connectToCluster } = require("../config/dbConnect");
require("dotenv").config({ path: '../config/.env' });
const bcript = require("bcrypt");
const { ObjectId, Timestamp } = require("mongodb");
const { response } = require("express");

const userCollection = process.env.USER_COLLECTION;
const userCart = process.env.USER_CART;
const bookCollection = process.env.COLLECTION_1;
const order = process.env.ORDER_COLLECTIONS;

async function signUp(userData) {
    try {
        const db = await connectToCluster();
        userData.password = await bcript.hash(userData.password, 10)
        result = await db.collection(userCollection).insertOne(userData)
        return {
            status: true,
            message: 'register success',
            statusCode: 200,
            result
        }
    } catch (error) {
        return {
            status: false,
            message: "Account Exist",
            statusCode: 404,
            error
        }
    }
}

async function login(userData) {
    const db = await connectToCluster();
    try {
        let user = await db.collection(userCollection).findOne({ email: userData.userName });
        if (user) {
            let result = await bcript.compare(userData.password, user.password);
            if (result) {
                return {
                    status: true,
                    message: 'login success',
                    statusCode: 200,
                    user: user.userName,
                    userId: user._id
                };
            } else {
                return {
                    status: false,
                    message: "password error",
                    statusCode: 404,
                };
            }
        } else {
            return {
                status: false,
                message: "User Name not exist",
                statusCode: 404,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "login error",
            statusCode: 404,
            error
        };
    }
}

async function addToCart(proId, userId) {
    const cartProduct = {
        item: new ObjectId(proId),
        quantity: 1
    };

    const db = await connectToCluster();

    return new Promise(async (resolve, reject) => {
        try {
            let cartData = await db.collection(userCart).findOne({ user: new ObjectId(userId) });
            if (cartData) {
                const proExistIndex = cartData.myCart.findIndex(product => product.item == proId);

                if (proExistIndex !== -1) {
                    await db.collection(userCart).updateOne(
                        { user: new ObjectId(userId), 'myCart.item': new ObjectId(proId) },
                        {
                            $inc: { 'myCart.$.quantity': 1 }
                        }
                    );
                    resolve("Quantity updated successfully.");
                } else {
                    await db.collection(userCart).updateOne(
                        { user: new ObjectId(userId) },
                        {
                            $push: {
                                myCart: cartProduct
                            }
                        }
                    );

                    resolve("Product added to cart successfully.");
                }
            } else {
                const cartItem = {
                    user: new ObjectId(userId),
                    myCart: [cartProduct]
                };

                await db.collection(userCart).insertOne(cartItem);

                resolve("New cart created with the product.");
            }
        } catch (error) {
            reject(error);
        }
    });
}


//** try catch method */
// async function addToCart(proId, userId) {
//     try {
//         const db = await connectToCluster();

//         const cartData = await db.collection(userCart).findOneAndUpdate(
//             { user: new ObjectId(userId) },
//             {
//                 $push: {
//                     myCart: new ObjectId(proId)
//                 }
//             }, 
//         );

//         return cartData.value;
//     } catch (error) {
//         // Handle errors here
//         console.error('Error in addToCart:', error);
//         throw error;
//     }
// }

// async function getCart(userId) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const db = await connectToCluster();
//             let cartItems = await db.collection(userCart).aggregate([
//                 {
//                     $match: { user: new ObjectId(userId) },
//                 },
//                 {
//                     $lookup: {
//                         from: bookCollection,
//                         let: { itemList: "$myCart" },
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $in: ["$_id", "$$itemList"]
//                                 }
//                             }
//                         }],
//                         as: "cartProducts"
//                     }
//                 }
//             ]).toArray();

//             // Resolve with an empty array if no cart items are found
//             resolve(cartItems.length > 0 ? cartItems[0].cartProducts : []);
//             // resolve(cartItems[0].cartProducts)

//             // Uncomment the following line if you want to log cartItems for debugging
//             // console.log("cart", cartItems);
//         } catch (error) {
//             reject(error);
//             console.log(error);
//         }
//     });
// }


async function getCart(userId) {
    try {
        const db = await connectToCluster();

        const cartItems = await db.collection(userCart).aggregate([
            {
                $match: { user: new ObjectId(userId) },
            },
            {
                $unwind: "$myCart"
            },
            {
                $project: {
                    item: "$myCart.item",
                    quantity: "$myCart.quantity"

                }
            },
            {
                $lookup: {
                    from: bookCollection,
                    localField: "item",
                    foreignField: "_id",
                    as: "product"

                }
            },
            {
                // $project: {
                //     item: 1,
                //     quantity: 1,
                //     product: {
                //         $arrayElemAt: ["$product", 0]
                //     }
                // }

                /* order sum */

                $project: {
                    item: 1,
                    quantity: 1,
                    product: {
                        $arrayElemAt: [{ $ifNull: ['$product', [null]] }, 0]
                    },
                    total: {
                        $sum: {
                            $multiply: [
                                {
                                    $toDouble: {
                                        $cond: { if: { $isArray: ['$product.price'] }, then: { $arrayElemAt: ['$product.price', 0] }, else: '$product.price' }
                                    }
                                },
                                {
                                    $toDouble: {
                                        $cond: { if: { $isArray: ['$quantity'] }, then: { $arrayElemAt: ['$quantity', 0] }, else: '$quantity' }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            // {
            //     $lookup: {
            //         from: bookCollection,
            //         let: { itemList: "$myCart" },
            //         pipeline: [{
            //             $match: {
            //                 $expr: {
            //                     $in: ["$_id", "$$itemList"]
            //                 }
            //             }
            //         }],
            //         as: "cartProducts"
            //     }
            // }
        ]).toArray();
        // console.log("cart:",cartItems);
        // Resolve with an empty array if no cart items are found
        return cartItems.length === 0 ? [] : cartItems;

    } catch (error) {
        // console.log(error);
        return error
    }
}

async function cartCount(userId) {
    const db = await connectToCluster();
    let count = 0
    return new Promise(async (resolve, reject) => {
        let cart = await db.collection(userCart).findOne({ user: new ObjectId(userId) })
        if (cart) {
            count = cart.myCart.length
        }
        resolve(count)
    }).catch((error) => {
        reject(error)
    })
}

async function changeCartCount(cartId, proId, count, quantity) {
    const db = await connectToCluster()
    let itemCount = parseInt(count)
    let itemQuantity = parseInt(quantity)
    return new Promise((resolve, reject) => {
        if (count == -1 && itemQuantity == 1) {
            db.collection(userCart).updateOne({ _id: new ObjectId(cartId) },
                { $pull: { myCart: { item: new ObjectId(proId) } } },

            ).then((response) => {
                // console.log(response)
                resolve({ removeProduct: true })
            })

        } else {
            db.collection(userCart).updateOne(
                { _id: new ObjectId(cartId), 'myCart.item': new ObjectId(proId) },
                {
                    $inc: { 'myCart.$.quantity': itemCount }
                },

            ).then((response) => {
                // console.log(response)
                let result = {
                    status: response.acknowledged,
                    statusCode: 200,
                    message: "product count updated "
                }
                // console.log(result)
                resolve(result)
            })

        }

    }).catch((error) => {
        reject(error)
    })

}

async function getOrderAmount(userId) {
    try {
        const db = await connectToCluster();
        const OrderTotal = await db.collection(userCart).aggregate([
            {
                $match: { user: new ObjectId(userId) },
            },
            {
                $unwind: "$myCart"
            },
            {
                $project: {
                    item: "$myCart.item",
                    quantity: "$myCart.quantity"

                }
            },
            {
                $lookup: {
                    from: bookCollection,
                    localField: "item",
                    foreignField: "_id",
                    as: "product"

                }
            },
            {
                $project: {
                    item: 1,
                    quantity: 1,
                    product: {
                        $arrayElemAt: ["$product", 0]
                    },
                }
            },
            {
                $group: {
                    _id: null,
                    cartTotal: {
                        $sum: { $multiply: ["$quantity", "$product.price"] }

                    }
                }
            }

        ]).toArray();
        // console.log("cart:", OrderTotal[0].cartTotal);
        console.log(OrderTotal)

        return OrderTotal.length === 0 ? [] : OrderTotal[0].cartTotal;

    } catch (error) {
        // console.log(error);
        return error
    }

}

function placeOrder(orderData, cartProducts, cartTotal) {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(orderData);
            const db = await connectToCluster();
            let status = orderData.paymentMode === 'COD' ? 'placed' : 'pending';
            let currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            let orderDetail = {
                userId: new ObjectId(orderData.userId),
                date: formattedDate,
                orderStatus: status,
                paymentMode: orderData.paymentMode,
                products: cartProducts,
                orderAmount: cartTotal,
                deliveryDetails: {
                    firstName: orderData.firstName,
                    lastName: orderData.lastName,
                    company: orderData.company,
                    country: orderData.country,
                    streetName: orderData.streetName,
                    apartment: orderData.apartment,
                    city: orderData.city,
                    state: orderData.state,
                    zip: orderData.zip,
                    tel: orderData.tel,
                    email: orderData.email,
                }
            };

            db.collection(order).insertOne(orderDetail).then((result) => {
                db.collection(userCart).deleteOne({ user: new ObjectId(orderData.userId) })
                resolve({ status: true, statusCode: 200, message: "Order placed successfully" });
            })

        } catch (error) {
            console.error("Error placing order:", error);
            reject({ status: false, statusCode: 500, message: "Failed to place order", error });
        }
    });
}



function getOrderList(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectToCluster();
            const cart = await db.collection(userCart).findOne({ user: new ObjectId(userId) });

            if (cart && cart.myCart) {
                resolve({ statusCode: 200, message: "Cart found", cartItems: cart.myCart });
            } else {
                resolve({ statusCode: 404, message: "Cart not found or empty", cartItems: [] });
            }
        } catch (error) {
            reject({ statusCode: 500, message: "Failed to retrieve cart", error: error });
        }
    });
}

function orderHistory(userId) {
    return new Promise((resolve, reject) => {
        connectToCluster()
            .then(db => {
                return db.collection(order).aggregate([
                    { $match: { userId: new ObjectId(userId) } },
                    // { $unwind: "$products" },
                    {
                        $lookup: {
                            from: bookCollection,
                            localField: "products.item",
                            foreignField: "_id",
                            as: "product"
                        }
                    },
                    {
                        $project: {
                            userId: "$userId",
                            orderStatus: "$orderStatus",
                            paymentMode: "$paymentMode",
                            orderAmount: "$orderAmount",
                            date: "$date",
                            deliveryDetails: "$deliveryDetails",
                            product: "$product"

                        }
                    },

                ]).toArray();
            })
            .then(OrderData => {
                const response = {
                    statusCode: 200,
                    message: "Order history retrieved successfully",
                    orderData: OrderData
                };
                // console.log(OrderData);
                resolve(response);
            })
            .catch(error => {
                console.error("Failed to retrieve Order History:", error);
                reject({ statusCode: 500, message: "Failed to retrieve Order History", error });
            });
    });
}




module.exports = {
    signUp,
    login,
    addToCart,
    getCart,
    cartCount,
    changeCartCount,
    getOrderAmount,
    placeOrder,
    getOrderList,
    orderHistory
}

