import 'semantic-ui-css/semantic.min.css'
import React, { Component } from "react";
import "./App.css";
import Create from './components/Create';
import './components/Products/list'
import List from "./components/Products/list";
import ProductList from "./components/Products/ProductList"

class App extends Component {
  render() {
    return (
      <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="/">Products</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>

          <Create />
        </ul>
        {/* <span className="navbar-text">
          Products
        </span> */}
      </nav>
      <ProductList />
    </>
    );
  }
}


export default App;

