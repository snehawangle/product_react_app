import { useState, useEffect} from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { BsFillPencilFill, BsFillTrash2Fill, BsEyeFill } from "react-icons/bs";
import multiColumnSort from 'multi-column-sort'
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useSortBy  } from 'react-table'
import { $CombinedState } from "redux";

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <div className="container-fluid"><div className="row">
            <div className="col-9"></div><div className="col-3">
            <input
                className="form-control mr-sm-2"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search`}
            />
            </div>
            </div> </div>
            
        </span>
    )
}

function DefaultColumnFilter({
    
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search...`}
        />
    )
}

function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        defaultSortFieldId="id",
        pagination,
        striped,
        
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        useSortBy,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 2, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td data-id={cell} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                
            </table>
            <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                <a className="page-link">
                        Page{'  '}
                        <strong>
                            {pageOptions.length}
                        </strong>{'  '}
                    </a>
                </li>
                {/* 
                // pagination code commented for now
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{'  '} */}
                {/* <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select> */}
            </ul>
        
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL"
  };

function FilterTableComponent() {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleClose = () => setShow(false);
    const handleEditClose = () => setEdit(false);
    const handleDelete = (e) => {
         
        const id = e.currentTarget.value;
        axios
        .delete("/api/version1/products/" + id)  
        .then(res => {  
            console.log(res);  
            window.location.reload(false);
            alert("Product deleted successfully")    
        })        
    }
    const handleShow = (e) => {
        setShow(true);
               const id = e.currentTarget.value;
               axios
               .get("/api/version1/products/" + id)  
               .then(res => { 
                const product = res.data;
                 console.log(res);
                 document.getElementById("productname").innerHTML = product.name; 
                 document.getElementById("productdescription").innerHTML = product.description; 
                 document.getElementById("productsku").innerHTML = product.sku; 
                 document.getElementById("productsuppliername").innerHTML = product.supplier_name; 
                 document.getElementById("productcolor").innerHTML = product.color; 
                 document.getElementById("productsize").innerHTML = product.size; 
                 document.getElementById("productunit").innerHTML = product.unit; 
                })
                
       
     }
    
     const handleEdit = (e) => {
        setEdit(true);
        const id = e.currentTarget.value;
        axios
        .get("/api/version1/products/" + id)  
        .then(res => { 
        const product = res.data;
        $("#id").val(product.id);
            $("#name").val(product.name);
            $("#description").val(product.description);
            $("#sku").val(product.sku);
            $("#supplier_name").val(product.supplier_name);
            $("#color").val(product.color);
            $("#size").val(product.size);
            $("#unit").val(product.unit);
        
        })
    }
    const [nameErrorMessage, setNameErrorMessage] = React.useState("");
    const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState("");
    const [skuErrorMessage, setSkuErrorMessage] = React.useState("");
    const [supplierNameErrorMessage, setSupplierNameErrorMessage] = React.useState("");
    const [colorErrorMessage, setColorErrorMessage] = React.useState("");
    const [sizeErrorMessage, setSizeErrorMessage] = React.useState("");
    const [unitErrorMessage, setUnitErrorMessage] = React.useState("");

    const handleEditSubmit = (event) => {
        event.preventDefault();
        var product = {};
        $.each($('#editForm').serializeArray(), function(i, field) {
            product[field.name] = field.value;
        });
        if($("#name").value === ""){
          setNameErrorMessage("This field is required!")
        }else {setNameErrorMessage("")}
        if($("#description").value === ""){
          setDescriptionErrorMessage("This field is required!")
        }else {setDescriptionErrorMessage("")}
        if($("#sku").value === ""){
          setSkuErrorMessage("This field is required!")
        }else {setSkuErrorMessage("")}
        if($("#supplier_name").value === ""){
          setSupplierNameErrorMessage("This field is required!")
        }else {setSupplierNameErrorMessage("")}
        if($("#color").value === ""){
          setColorErrorMessage("This field is required!")
        }else {setColorErrorMessage("")}
        if($("#size").value === ""){
          setSizeErrorMessage("This field is required!")
        }else {setSizeErrorMessage("")}
        if($("#unit").value === ""){
          setUnitErrorMessage("This field is required!")
        }else {setUnitErrorMessage("")}
    
        if ($("#name").value != "" && $("#description").value != "" && $("#sku").value != "" && $("#supplier_name").value != "" && $("#color").value != "" && $("#size").value != "" && $("#color").value != ""){
        setNameErrorMessage("")
        setDescriptionErrorMessage("")
        setSkuErrorMessage("")
        setSupplierNameErrorMessage("")
        setColorErrorMessage("")
        setSizeErrorMessage("")
        setUnitErrorMessage("");
        axios
        .put("/api/version1/products/" + product['id'], product)
        .then((res) => {
            window.location.reload(false);
          })
          .catch(err => console.log(err));
        }else{
          
        }  
    }
    
    const [details, setDetails] = useState([])

    const [getArray, setArray] = useState([]);
    
    useEffect(() => {
        axios({
          method: "GET",
          baseURL: "/api/version1/products"
        }).then((res) => {
          setArray(res.data);
        });
      }, []);
    
      const products = getArray;
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Product List',
                columns: [
                    {
                        id: 1,
                        name: "Title",
                        selector: (row) => row.title,
                        sortable: true,
                        reorder: true,
                      },
                    {
                        Header: 'Name',
                        accessor: 'name',
                        sortable: true,
                    },
                     
                    {
                        Header: 'Description',
                        accessor: 'description',
                        sortable: true,
                    },
                    {
                        Header: 'SKU',
                        accessor: 'sku',
                        sortable: true,
                    },
                    {
                        Header: 'Supplier Name',
                        accessor: 'supplier_name',
                        sortable: true,
                    },
                    {
                        Header: 'Color',
                        accessor: 'color',
                        sortable: true,
                    },
                    {
                        Header: 'SIze',
                        accessor: 'size',
                        sortable: true,
                    },
                    {
                        Header: 'Unit',
                        accessor: 'unit',
                        sortable: true,
                    },
                    
                    {
                        Header: 'Action',
                        id: 'id',
                        // className: "col-sm-3",
                        width: "100%", 
                        targets: 0,
                        accessor: (row) => {
                            return (
                                <>
                                <Button variant="info" value={row['id']} onClick={(e) => handleShow(e)}>
                                    <BsEyeFill/>
                                </Button>{" "}
                                <Button variant="primary" value={row['id']} onClick={(e) => handleEdit(e)}>
                                <BsFillPencilFill/>
                                </Button>{" "}
                                <Button variant="danger" value={row['id']} onClick={(e) => handleDelete(e)}>
                                <BsFillTrash2Fill/>
                                </Button>
                                </>
                            )
                        }
                    }
                    
                ],
            },
        ],
        []
    )
    
    const data = products;
    
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let products = details.slice()
        if (position !== -1) {
          products.splice(position, 1)
        } else {
          products = [...details, index]
        }
        setDetails(products)
    }

    return (
        <div class="container">
        <div class="row">
        <Table columns={columns} data={data} pagination defaultSortFieldId={1}        
        ComponentOptions={paginationComponentOptions}
        selectableRows />
            

    <Modal show={edit}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
        // onExit={}
        >
        <Modal.Header closeButton>
          <Modal.Title>Product Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <Form className="" id="editForm">
        <div className="form-group">
        <input
            type="text"
            name="id"
            id="id"
            hidden
          />
          <label>Name: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="name"
            id="name"
            required
          />{nameErrorMessage && <div className="error" style={{ color: "red" }}> {nameErrorMessage} </div>}<p></p>
          <label>Description: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="description"
            id="description"
            required
          />{descriptionErrorMessage && <div className="error" style={{ color: "red" }}> {descriptionErrorMessage} </div>}
          <p></p>
          <label>SKU: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="sku"
            id="sku"
            required
          />
          {skuErrorMessage && <div className="error" style={{ color: "red" }}> {skuErrorMessage} </div>}
          <p></p>
          <label>Supplier Name: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="supplier_name"
            id="supplier_name"
            required
          />
          {supplierNameErrorMessage && <div className="error" style={{ color: "red" }}> {supplierNameErrorMessage} </div>}
          <p></p>
          <label>Color: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="color"
            id="color"
            required
          />
          {colorErrorMessage && <div className="error" style={{ color: "red" }}> {colorErrorMessage} </div>}
          <p></p>
          <label>Size: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="text"
            name="size"
            id="size"
            required
          />
          {sizeErrorMessage && <div className="error" style={{ color: "red" }}> {sizeErrorMessage} </div>}
          <p></p>
          <label>Unit: </label><br/>
          <input
            className="name-input m-b-xs form-control"
            type="number"
            name="unit"
            id="unit"
            required
          />
          {unitErrorMessage && <div className="error" style={{ color: "red" }}> {unitErrorMessage} </div>}
          <p></p>
        </div>       
      </Form>  
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose} >
            Close
          </Button>
          <Button type="submit" varient="light"  onClick={handleEditSubmit}>Save</Button>
        </Modal.Footer>
    </Modal>

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        // onExit={}
        >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <div className="container-fluid">
            <div className="row">
                <div className="label col-sm-2">Name:   </div>
             
                <div className="col-sm-10" id="productname"></div>
            </div><br/>
            <div className="row">
                <div className="label col-sm-2">Description:</div>{" "}
             
                <div className="col-sm-10" id="productdescription"></div>
            </div><br/>
            <div className="row">
                <div className="label col-sm-2">SKU:   </div>
             
                <div className="col-sm-10" id="productsku"></div>
            </div><br/>
            <div className="row">
                <div className="label col-sm-2">Supplier Name:   </div>
             
                <div className="col-sm-10" id="productsuppliername"></div>
            </div><br/>
            <div className="row">
                <div className="label col-sm-2">Color:   </div>
             
                <div className="col-sm-10" id="productcolor"></div>
            </div><br/>
            <div className="row">
                <div className="label col-sm-2">Size:   </div>
             
                <div className="col-sm-10" id="productsize"></div>
            </div><br/>
            <div className="row">
                <div className="label col-sm-2">Unit:   </div>
             
                <div className="col-sm-10" id="productunit"></div>
            </div><br/>
          
          </div>  
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

        </div>
        </div>
    )

}

function loadTdlists(){ 
    const products = [];
    axios
      .get("/api/version1/products")
      .then((res) => {
        return products = res.data
      })
      .catch((error) => console.log(error));
}

export default FilterTableComponent;



 
