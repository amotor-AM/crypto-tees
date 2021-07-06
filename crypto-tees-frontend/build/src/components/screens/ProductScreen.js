import React, {useEffect, useState} from 'react';
import Rating from "../Rating";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoadingHex from "../LoadingHex";
import MessageBox from "../MessageBox";
import {productInfo} from '../../actions/productActions';


function ProductScreen(props) {
    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails
    const dispatch = useDispatch()
    const productId = props.match.params.id

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    useEffect(() => {
        dispatch(productInfo(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            {loading 
            ? <LoadingHex/>
            : error ? <MessageBox variant="danger">{error}</MessageBox>
            : <div>
            <div className="back-button">
                <Link to="/">
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> 
                    <span>Back</span>
                </Link>
            </div>
           <div className="row top">
              <div className="col-1">
                  <div className="product-images-container">
                    <img className="large" src={product.image} alt={product.name}/>
                    <div className="alt-photos">
                        <span className="alt">
                            <img className="alt-image" src={product.image} alt={product.name}/>
                        </span>
                        <span className="alt">
                            <img className="alt-image" src={product.image} alt={product.name}/>
                        </span>
                        <span className="alt">
                            <img className="alt-image" src={product.image} alt={product.name}/>
                        </span>
                    </div>
                </div>
              </div>
              <div className="col-1">
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <div className="product-price">
                        <h2>${product.price}</h2>
                        <Rating rating={product.rating} numReviews={product.numReviews}/>
                    </div>
                    <div className="product-description">
                        {product.description}
                    </div>
                    <div className= "product-in-stock">
                        {
                        product.countInStock > 0 
                        ? <span className="success">In Stock</span>
                        : <span className="error">Sold Out</span>
                        }
                    </div>
                    {
                        product.countInStock > 0 ? (
                            <>
                                <div className="product-size">
                                    <button className="product-size-button large" onClick={e => setSize("small")}>S</button>
                                    <button className="product-size-button large" onClick={e => setSize("medium")}>M</button>
                                    <button className="product-size-button large" onClick={e => setSize("large")}>L</button>
                                    <button className="product-size-button large" onClick={e => setSize("Xlarge")}>XL</button>
                                </div>
                                <div className="product-button">
                                    {size.length > 0    
                                    ? <button onClick={addToCartHandler} className="add-to-cart">Add To Cart</button>
                                    : <button className ="inactive">Select A Size</button>
                                    }
                                    <span className="product-dropdown-menu">
                                        <h3>QTY</h3>
                                        <select className="product-dropdown" value={qty} onChange={e => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                        </select>   
                                    </span>
                                </div> 
                            </>     
                        ) : (
                                <div className="product-button Onesp-top">   
                                    <button className="soldOut">Sold Out</button>
                                </div> 
                        )}
                    
                </div>
              </div>
           </div>
        </div>} 
        </div>
    )
}

export default ProductScreen
