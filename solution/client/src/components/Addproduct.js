import React, { Component } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const BaseapiUrl = 'http://localhost:8081/productservice';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: '',
            productName: '',
            productCode: '',
            releaseDate: '',
            description: '',
            price: '',
            starRating: '',
            imageUrl: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    AddProduct() {
        if (this.state.productId == "" || this.state.productId == undefined) {
            alert("Product Id is required");
            return false;
        } else if (this.state.productName == "" || this.state.productName == undefined) {
            alert("product Name is required");
            return false;
        } else if (this.state.productCode == "" || this.state.productCode == undefined) {
            alert("Product Code  is required");
            return false;
        } else if (this.state.releaseDate == "" || this.state.releaseDate == undefined) {
            alert("Release Date  is required");
            return false;
        }
        else if (this.state.description == "" || this.state.description == undefined) {
            alert("Description  is required");
            return false;
        }
        else if (this.state.price == "" || this.state.price == undefined) {
            alert("Price is required");
            return false;
        }
        else if (this.state.starRating == "" || this.state.starRating == undefined) {
            alert("Star Rating  is required");
            return false;
        }
        else if (this.state.imageUrl == "" || this.state.imageUrl == undefined) {
            alert("Image url is required");
            return false;
        }

        let MeetingToken = Math.floor(Math.random() * 100000000 + 1);
        let body = {
            productId: this.state.productId,
            productName: this.state.productName,
            productCode: this.state.productCode,
            releaseDate: this.state.releaseDate,
            description: this.state.description,
            price: this.state.price,
            starRating: this.state.starRating,
            imageUrl: this.state.imageUrl
        };
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        };
        let baseurl = BaseapiUrl + "/add";
        fetch(baseurl, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                if (results) {
                    alert("Added successfully!");
                    this.setState({
                        productId: '',
                        productName: '',
                        productCode: '',
                        releaseDate: '',
                        description: '',
                        price: '',
                        starRating: '',
                        imageUrl: ''
                    })
                }
            })
            .catch((e) => {
                alert(e);
            });
    }

    render() {
        return (
            <div>
                <h1>Add Product</h1>
                <Link variant="primary" to="/">View Product list</Link>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="productId">
                                <Form.Label>Product Id </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="productId"
                                    value={this.state.productId}
                                    onChange={this.handleChange}
                                    placeholder="Product Id" />
                            </Form.Group>
                            <Form.Group controlId="productName">
                                <Form.Label>productName</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productName"
                                    value={this.state.productName}
                                    onChange={this.handleChange}
                                    placeholder="Product Name" />
                            </Form.Group>
                            <Form.Group controlId="productCode">
                                <Form.Label>Product Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="productCode"
                                    value={this.state.productCode}
                                    onChange={this.handleChange}
                                    placeholder="Product Code" />
                            </Form.Group>
                            <Form.Group controlId="releaseDate">
                                <Form.Label>Release Date</Form.Label>
                                <Form.Control
                                    type="Date"
                                    name="releaseDate"
                                    value={this.state.releaseDate}
                                    onChange={this.handleChange}
                                    placeholder="releaseDate" />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    placeholder="description" />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    placeholder="price" />
                            </Form.Group>
                            <Form.Group controlId="starRating">
                                <Form.Label>Star Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="starRating"
                                    min="1" max="5"
                                    value={this.state.starRating}
                                    onChange={this.handleChange}
                                    placeholder="starRating" />
                            </Form.Group>
                            <Form.Group controlId="imageUrl">
                                <Form.Label>Image url</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="imageUrl"
                                    value={this.state.imageUrl}
                                    onChange={this.handleChange}
                                    placeholder="imageUrl" />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="success" onClick={() => this.AddProduct()}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default AddProduct;