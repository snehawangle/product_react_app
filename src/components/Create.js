import axios from "axios";
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

function Create() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState("");
  const [skuErrorMessage, setSkuErrorMessage] = React.useState("");
  const [supplierNameErrorMessage, setSupplierNameErrorMessage] = React.useState("");
  const [colorErrorMessage, setColorErrorMessage] = React.useState("");
  const [sizeErrorMessage, setSizeErrorMessage] = React.useState("");
  const [unitErrorMessage, setUnitErrorMessage] = React.useState("");
  
  const reload=()=>window.location.reload();


  const [state, setState] = useState({
    name: "",
    description: "",
    sku: "",
    supplier_name: "",
    color: "",
    size: "",
    unit: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    })); 
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
    const product = state;

    if(state["name"] === ""){
      setNameErrorMessage("This field is required!")
    }else {setNameErrorMessage("")}
    if(state["description"] === ""){
      setDescriptionErrorMessage("This field is required!")
    }else {setDescriptionErrorMessage("")}
    if(state["sku"] === ""){
      setSkuErrorMessage("This field is required!")
    }else {setSkuErrorMessage("")}
    if(state["supplier_name"] === ""){
      setSupplierNameErrorMessage("This field is required!")
    }else {setSupplierNameErrorMessage("")}
    if(state["color"] === ""){
      setColorErrorMessage("This field is required!")
    }else {setColorErrorMessage("")}
    if(state["size"] === ""){
      setSizeErrorMessage("This field is required!")
    }else {setSizeErrorMessage("")}
    if(state["unit"] === ""){
      setUnitErrorMessage("This field is required!")
    }else {setUnitErrorMessage("")}

    
    if (state["name"] != "" && state["description"] != "" && state["sku"] != "" && state["supplier_name"] != "" && state["color"] != "" && state["size"] != "" && state["unit"] != ""){
        setNameErrorMessage("")
        setDescriptionErrorMessage("")
        setSkuErrorMessage("")
        setSupplierNameErrorMessage("")
        setColorErrorMessage("")
        setSizeErrorMessage("")
        setUnitErrorMessage("")

        axios
        .post("/api/version1/products", product)
        .then((res) => {
            debugger; 
            alert("Created: " +  res.status)
            window.location.reload(false)
        })
        .catch(err => console.log(err));
        }else{
        //setErrorMessage("This field is required!")
        
        }
   
}


return (
    <>
    
      {/* <Button variant="primary" onClick={handleShow}>
        New
      </Button> */}
      <li class="nav-item">
      <a class="nav-link active" title="New Product" onClick={handleShow}>Add Product</a>
    </li>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        onExit={reload}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form className="" >
        <div className="form-group">
          <label>Name: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            required
          />{nameErrorMessage && <div className="error" style={{ color: "red" }}> {nameErrorMessage} </div>}<p></p>
          <label>Description: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="description"
            value={state.description}
            onChange={handleInputChange}
            required
          />{descriptionErrorMessage && <div className="error" style={{ color: "red" }}> {descriptionErrorMessage} </div>}
          <p></p>
          <label>SKU: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="sku"
            value={state.sku}
            onChange={handleInputChange}
            required
          />
          {skuErrorMessage && <div className="error" style={{ color: "red" }}> {skuErrorMessage} </div>}
          <p></p>
          <label>Supplier Name: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="supplier_name"
            value={state.supplier_name}
            onChange={handleInputChange}
            required
          />
          {supplierNameErrorMessage && <div className="error" style={{ color: "red" }}> {supplierNameErrorMessage} </div>}
          <p></p>
          <label>Color: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="color"
            value={state.color}
            onChange={handleInputChange}
            required
          />
          {colorErrorMessage && <div className="error" style={{ color: "red" }}> {colorErrorMessage} </div>}
          <p></p>
          <label>Size: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="size"
            value={state.size}
            onChange={handleInputChange}
            required
          />
          {sizeErrorMessage && <div className="error" style={{ color: "red" }}> {sizeErrorMessage} </div>}
          <p></p>
          <label>Unit: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="number"
            name="unit"
            value={state.unit}
            onChange={handleInputChange}
            required
          />
          {unitErrorMessage && <div className="error" style={{ color: "red" }}> {unitErrorMessage} </div>}
          <p></p>
          
        </div>
        
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button type="submit" varient="light"  onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Create;