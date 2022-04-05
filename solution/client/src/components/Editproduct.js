import React, { Component } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const BaseapiUrl = 'http://localhost:8081/productservice';
class Editproduct extends Component {
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
        console.log(event.target);
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    componentDidMount(props) {
        var productId = this.props.match.params.id;
        this.GetProductById(productId);
    }
    GetProductById(productId) {
        const apiUrl = BaseapiUrl + "/edit/" + productId;
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        this.setState({
                            productId: result.data.productId,
                            productName: result.data.productName,
                            productCode: result.data.productCode,
                            releaseDate: result.data.releaseDate,
                            description: result.data.description,
                            price: result.data.price,
                            starRating: result.data.starRating,
                            imageUrl: result.data.imageUrl
                        });
                    } else {
                        alert("Product record not found!")
                    }
                },
                (error) => {
                    this.setState({ IsApiError: true });
                }
            )
    }

    UpdateProduct() {
        console.log(this.state);
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
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        };

        let baseurl = BaseapiUrl + "/update/:id"
        fetch(baseurl, requestOptions)
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                if (results) {
                    alert("Updated successfully!");
                }
            })
            .catch((e) => {
                alert(e);
            });
    }

    render() {
        return (
            <div>
                <h1>Edit Product</h1>
                <Link variant="primary" to="/">Product List</Link>
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
                                <Button variant="success" onClick={() => this.UpdateProduct()}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Editproduct;