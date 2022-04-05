var promise = require('promise');
const fs = require('fs');
const path = require('path');
const req = require('express/lib/request');
const { body, validationResult } = require('express-validator');
const { resolve } = require('path');
const productsFile = path.join(process.cwd() + '/files/productdata.json');
//date array
const mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//obejct
var accessData = {
    //get specific product
    getData: function (productId) {
        return new promise((resolve, reject) => {
            if (fs.existsSync(productsFile)) {
                fs.readFile(productsFile, 'utf8', (err, data) => {
                    if (err) reject(err);
                    if (data) {
                        const productDatas = JSON.parse(data);
                        const productData = productDatas.find((element) => element.productId == productId);
                        if (productData == undefined) {
                            reject("There is no record")
                        } else {
                            resolve(productData);
                        }
                    }
                })
            } else {
                reject("file not found");
            }
        })
    },
    //get all products
    fetchData: function () {
        return new promise((resolve, reject) => {
            if (fs.existsSync(productsFile)) {
                fs.readFile(productsFile, 'utf8', (err, data) => {
                    if (err) reject(err);
                    if (data) {
                        const productData = JSON.parse(data);
                        (productData.length == 0) ? reject("There is no record") : resolve(productData);
                    }
                })
            } else {
                reject("file not found");
            }
        })
    },
    //add product data
    addData: function (req) {

        return new promise((resolve, reject) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return reject(errors)
            } else {
                var dt = new Date(req.body.releaseDate);
                year = dt.getFullYear();
                month = mon[dt.getMonth()];
                day = dt.getDate().toString();
                const releaseDate = month + ' ' + day + ',' + year;
                var productInfo = {
                    productId: req.body.productId,
                    productName: req.body.productName,
                    productCode: req.body.productCode,
                    releaseDate: releaseDate,
                    description: req.body.description,
                    price: req.body.price,
                    starRating: req.body.starRating,
                    imageUrl: req.body.imageUrl
                }
                if (productInfo.productId != undefined) {
                    this.fetchData().then((productData) => {
                        const isProductIdExist = productData.find((element) => element.productId == productInfo.productId);
                        if (isProductIdExist == undefined) {
                            productData.push(productInfo);
                            productData.sort((a,b) => parseFloat(a.productId) - parseFloat(b.productId));
                            fs.writeFile(productsFile, JSON.stringify(productData), 'utf8', (err, data) => {
                                (err) ? reject(err) : resolve(productData);
                            });
                        } else {
                            reject("Same product alredy exists");
                        }
                    }).catch(err => reject(err))

                } else {
                    reject("Input Data mismatch");
                }
            }
        });
    },
    //update product data
    updateData: function (req) {
        const productId = req.params.id;
        return new promise((resolve, reject) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return reject(errors)
            } else {
                var dt = new Date(req.body.releaseDate);
                year = dt.getFullYear();
                month = mon[dt.getMonth()];
                day = dt.getDate().toString();
                const releaseDate = month + ' ' + day + ',' + year;
                var productInfo = {
                    productName: req.body.productName,
                    productCode: req.body.productCode,
                    releaseDate: releaseDate,
                    description: req.body.description,
                    price: req.body.price,
                    starRating: req.body.starRating,
                    imageUrl: req.body.imageUrl
                }
                if (productInfo.productId != undefined) {
                    this.fetchData().then((productData) => {
                        const isProductExist = productData.find((element) => element.productId == productId);
                        if (isProductExist != undefined) {
                            const productIdIndex = productData.findIndex((element) => element.productId == productId);
                            productData.splice(productIdIndex, 1);
                            productData.push(productInfo);
                            fs.writeFile(productsFile, JSON.stringify(productData), 'utf8', (err, data) => {
                                (err) ? reject(err) : resolve(productInfo);
                            });
                        } else {
                            reject("The product doesn't exist");
                        }
                    }).catch(err => reject(err))
                } else {
                    reject("Input Data mismatch");
                }
            }
        });
    },

    //delete product data
    deleteData: function (productId) {
        return new promise((resolve, reject) => {
            if (productId != undefined) {
                this.fetchData().then((productData) => {
                    const isProductExist = productData.find((element) => element.productId == productId);
                    if (isProductExist != undefined) {
                        const productIndex = productData.findIndex((element) => element.productId == productId);
                        productData.splice(productIndex, 1);
                        fs.writeFile(productsFile, JSON.stringify(productData), 'utf8', (err, data) => {
                            (err) ? reject(err) : resolve(productData);
                        });
                    } else {
                        reject("The product doesn't exist");
                    }
                }).catch(err => reject(err))
            } else {
                reject("Input Data mismatch");
            }
        });
    }
}

module.exports = accessData;