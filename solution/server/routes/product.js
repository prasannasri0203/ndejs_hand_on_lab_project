const express = require('express');
const router = express.Router();
const productDetails = require('../controller/data_controller.js');
const { body, validationResult } = require('express-validator');

//Product validation
const productServiceValidation = [
    body('productId', 'productId is Required').not().isEmpty(),
    body('productName', 'productName is Required').not().isEmpty(),
    body('productCode', 'productCode is Required').not().isEmpty(),
    body('releaseDate', 'releaseDate is Required').not().isEmpty(),
    body('description', 'description is Required').not().isEmpty(),
    body('price', 'price is Required').not().isEmpty(),
    body('starRating', 'starRating is Required').not().isEmpty(),
    body('imageUrl', 'imageUrl is Required').not().isEmpty()
];
//get all product data
router.get('/', (req, res) => {
    try {
        productDetails.fetchData().then((response) => {
            return res.status(200).json({
                status: "Success",
                message: "All product data.",
                data: response
            });
        }).catch((err) => {
            console.log("catch");
            return res.status(400).json({
                status: "Failure",
                message: err,
                data: []
            });
        });
    } catch (error) {
        console.log('err:', error);
        return res.status(500).json({
            status: "Failure",
            message: "There is some issue at server side.please check the log.",
            data: []
        });
    }
});
//get specific product data
router.get('/edit/:id', (req, res) => {
    try {
        productDetails.getData(req.params.id).then((response) => {
            return res.status(200).json({
                status: "Success",
                message: "Product data found.",
                data: response
            });
        }).catch((err) => {
            console.log("catch");
            return res.status(400).json({
                status: "Failure",
                message: err,
                data: []
            });
        });
    } catch (error) {
        console.log('err:', error);
        return res.status(500).json({
            status: "Failure",
            message: "There is some issue at server side.please check the log.",
            data: []
        });
    }
});

//add productServicedata
router.post('/add', productServiceValidation, (req, res) => {
    try {
        productDetails.addData(req).then((response) => {
            return res.status(200).json({
                status: "Success",
                message: "Product data added successfully.",
                data: [response]
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "Failure",
                message: err,
                data: []
            });
        });

    } catch (error) {
        console.log('err:', error);
        return res.status(500).json({
            status: "Failure",
            message: "There is some issue at server side.please check the log.",
            data: []
        });
    }
});
//update product
router.put('/update/:id', productServiceValidation, (req, res) => {
    try {
        productDetails.updateData(req).then((response) => {
            return res.status(200).json({
                status: "Success",
                message: "Product data updated successfully.",
                data: [response]
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "Failure",
                message: err,
                data: []
            });
        });
    } catch (error) {
        console.log('err:', error);
        return res.status(500).json({
            status: "Failure",
            message: "There is some issue at server side.please check the log.",
            data: []
        });
    }
});

//delete product service data
router.delete('/delete/:id', (req, res) => {
    try {
        productDetails.deleteData(req.params.id).then((response) => {
            console.log("response", response);
            return res.status(200).json({
                status: "Success",
                message: "Product data removed successfully.",
                data: [response]
            });
        }).catch((err) => {
            return res.status(400).json({
                status: "Failure",
                message: err,
                data: []
            });
        });
    } catch (error) {
        console.log('err:', error);
        return res.status(500).json({
            status: "Failure",
            message: "There is some issue at server side.please check the log.",
            data: []
        });
    }
});

module.exports = router;



