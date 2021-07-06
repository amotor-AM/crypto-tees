import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from "./logo_white.png";
function App() {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              <img className="logo-white" src={logo}/>
            </Link>
          </div>
          <div className="cart-login">
            <Link to="/cart">
              <span className="cart-info-badge">
                <span className="cart-badge">
                  <i class="fa fa-shopping-cart" aria-hidden="true" style={{color: "white", fontSize: "2.5rem"}}/>
                  {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                  )}
                </span>
                <span className="cart-badge-text">
                  <p>Cart</p>
                </span>
              </span>
            </Link>
            <Link to="/signin">
              <span className="signin-badge">
                <i class="fa fa-user" aria-hidden="true" style={{color: "white", fontSize: "2.5rem"}}/>
                <p>Sign In</p>
              </span>
            </Link>
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/" component={HomeScreen} exact/>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
