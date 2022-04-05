import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const BaseapiUrl = 'http://localhost:8081/productservice';
class Productlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            IsApiError: false
        }
    }

    componentDidMount() {
        fetch(BaseapiUrl + "/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    });
                },
                (error) => {
                    this.setState({ IsApiError: true });
                }
            )
    }
    //delete product
    deleteProduct(productId) {
        const { products } = this.state;
        const apiUrl = BaseapiUrl + "/delete/" + productId;
        fetch(apiUrl, { method: 'DELETE' })
            .then(async response => {
                const jsonData = await response.json();
                const data = jsonData;
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                // this.setState({
                //     employees: employees.filter(employee => employee._id !== EmpId)
                // });
                alert('product Deleted successfully.');
                window.location.reload();
            })
            .catch(error => {
                alert('There was an error!');
                console.error('There was an error!', error);
            });
    }

    render() {
        var productslist = this.state.products.data;
        if (productslist && productslist.length > 0) {
            return (<div>
                <h2>Product List</h2>
                <Link variant="primary" to="/addProduct">Add Product</Link>
                <Table className="table" >
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Code</th>
                            <th>Release Date</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>starRating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productslist.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.productCode}</td>
                                <td>{product.releaseDate}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.starRating}</td>
                                <td>
                                    <Link variant="info" to={"/editproduct/" + product.productId}>Edit</Link>
                                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.productId)}>
                                        Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>)
        } else {
            return (<div>No Record Found</div>)
        }
    }
}
export default Productlist;