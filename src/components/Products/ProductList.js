
import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from "./Table";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showPopup: false,
      show: false,
      setShow: false,
    };
  }
  
    togglePopup = (e) => {
    this.setState({
        setShow: !this.state.setShow
    });
    }

    handleDelete = (e) => {
    axios
    .delete("/api/version1/products/" + e)  
    .then(res => {  
        console.log(res);  
        alert("Product deleted successfully")

        const products = this.state.products.filter(item => item.id !== e);  
        this.setState({ products });  
    })
    }

    handleshow = (e) => {
    this.state.setShow(true);
    axios
    .get("/api/version1/products/" + e.id)  
    .then(res => {  
        console.log(res);  
        debugger;

        //alert("Product deleted successfully")
        
        // const products = this.state.products.filter(item => item.id !== e.id);  
        // this.setState({ products });  
        // debugger;
        const data = document.getElementById("showdata")

        data.append(e.name + " " + e.description + " " + " " + e.sku)
        // alert(e.name);
        //const table = document.getElementById("productTable")
        // table.hide()   
        // "<p >{e.description}</p>" +
        // "<p >{e.sku}</p>" +
        // "<p >{e.supplier_name}</p>" +
        // "<p >{e.color}</p>" +
        // "<p >{e.size}</p>" +
        // "<p >{e.unit}</p>" +
        // "<p >{e.in_stock}</p>" 
        
        
    


    })
    }

    handleedit = (e) => {
    }

    loadTdlists() {
        axios
        .get("/api/version1/products")
        .then((res) => {
            //debugger;
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
        <div class="container">
            <div class="row mt-2">
            <Table />
            
            </div>
            </div>
        </>        
        )     
    }
}

export default ProductList; 