import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
        products: [],
        showPopup: false,
        };
    }

    togglePopup() {
        this.setState({
        showPopup: !this.state.showPopup
        });
    }

    handleDelete = (e) => {
    var check = alert("Are you sure you want to leave?");
            axios
            .delete("/api/version1/products/" + e)  
            .then(res => {  
                console.log(res);  
                alert("Product deleted successfully") 
            })
    }

    handleshow = (e) => {
    debugger;
    axios
    .get("/api/version1/products/" + e.id)  
    .then(res => {  
        console.log(res);  
    })
    }

    handleedit = (e) => {
    }


    loadTdlists() {
        axios
        .get("/api/version1/products")
        .then((res) => {
            this.setState({ products: res.data });
        })
        .catch((error) => console.log(error));
        }

    componentDidMount() {
        this.loadTdlists();
    }
    render() { 

        return (
        <>
        <div className="container">
            <div className="row mt-2">
                <div className="col-9"></div>
                <div className="col-3 ">
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                <p/>
                
                <table className="table" id="productTable">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">SKU</th>
                        <th scope="col">Supplier Name</th>
                        <th scope="col">Color</th>
                        <th scope="col">Size</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                {this.state.products.map((product) =>
                <tr>
                
                    <td scope="row">{product.name}</td>
                    <td scope="row">{product.description}</td>
                    <td scope="row">{product.sku}</td>
                    <td scope="row">{product.supplier_name}</td>
                    <td scope="row">{product.color}</td>
                    <td scope="row">{product.size}</td>
                    <td scope="row">{product.unit}</td>
                    <td scope="row" className="m-r-2" key={product.id}>
                    <a onClick={() => this.handleshow(product)} style={{cursor: 'pointer'}}>Show</a> {'  '}    
                    <a onClick={this.handleedit(product)} style={{cursor: 'pointer'}}>Edit</a> {'  '}  
                    <a  onClick={() => this.handleDelete(product.id)} style={{cursor: 'pointer'}}>Delete</a> {'  '}  
                    
                    </td>
                </tr>
                )}
                </tbody>
                </table>
            </div>
        </div> 
    <div id="showdata"></div>
    </>
)}}

export default List; 