import React, {useEffect, useState} from 'react';
import Rating from "../Rating";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoadingHex from "../LoadingHex";
import MessageBox from "../MessageBox";
import {productInfo} from "../../actions/productActions";
import {addToCart} from "../../actions/cartActions";


function ProductScreen(props) {
    const productDetails = useSelector((state) => state.productDetails)
    const {loading, error, product} = productDetails
    console.log(product)
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const [amountInStock, setAmountInStock] = useState(0)
    const [size, setSize] = useState("")
    const [gender, setGender] = useState("male")
    const [stock, setStock] = useState(0)
    const [warning, setWarning] = useState(false)
    const [qty, setQty] = useState(1)
    const [sizeSelected, setSizeSelected] = useState(false)
    console.log(product)

    useEffect(() => {
        dispatch(productInfo(productId))
        setAmountInStock(product.small + product.medium + product.large + product.Xlarge)  
    }, [dispatch, productId, setAmountInStock])
    const addToCartHandler = () => {
        const {_id} = product
        const countForSize = product.size
        dispatch(addToCart({_id, product, qty, size, gender, stock}))
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
                    <img className="large" src={product.main_image} alt={product.name}/>
                    <div className="alt-photos">
                        <span className="alt">
                            <img className="alt-image" src={product.main_image} alt={product.name}/>
                        </span>
                        <span className="alt">
                            <img className="alt-image" src={product.main_image} alt={product.name}/>
                        </span>
                        <span className="alt">
                            <img className="alt-image" src={product.main_image} alt={product.name}/>
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
                        amountInStock > 0 
                        ? <span className="success">In Stock</span>
                        : <span className="error">Sold Out</span>
                        }
                    </div>
                    {
                        amountInStock > 0 ? (
                            <>
                                <div className="product-size">
                                    <button className={`product-size-button large ${product.small === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("small"); setStock(product.small); setSizeSelected(true)}}>S</button>
                                    <button className={`product-size-button large ${product.medium === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("medium"); setStock(product.medium); setSizeSelected(true)}}>M</button>
                                    <button className={`product-size-button large ${product.large === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("large"); setStock(product.large); setSizeSelected(true)}}>L</button>
                                    <button className={`product-size-button large ${product.Xlarge === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("Xlarge"); setStock(product.Xlarge); setSizeSelected(true)}}>XL</button>
                                </div>
                                <div className="size-text">
                                    {sizeSelected
                                    ? <p className={`size-${stock < 10 ? "red" : "normal"}`}>{`${stock} left in stock`}</p>
                                    : <p className={`size-${warning ? "red": "normal"}`}>Please select a size</p>
                                    }
                                </div>
                                <div className="product-button">
                                    {size.length > 0    
                                    ? <button onClick={addToCartHandler} className="add-to-cart">Add To Cart</button>
                                    : <button className ="inactive">Select A Size</button>
                                    }
                                    <span className="product-dropdown-menu">
                                        <h3>QTY</h3>
                                        <select className="product-dropdown" value={qty} onChange={e => setQty(e.target.value)}>
                                            {[...Array(amountInStock).keys()].map(x => (
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
