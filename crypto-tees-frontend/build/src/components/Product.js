import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Rating from "./Rating";

function Product(props) {
    const {product} = props
    const productId = product._id
    const [size, setSize] = useState("")

    const addToCartHandler = () => {
        // props.history.push(`/cart/${productId}?qty=1`)
        if(size.length == 0) {
            window.alert("Please select a size")
        }
    }
    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>   
                    <h2>{product.name}</h2>
                </Link>
                <div className="card-details">
                    <Rating
                    rating = {product.rating}
                    numReviews = {product.numReviews}
                    />
                    <div className="price">${product.price}</div>
                </div>
                <div className="product-size">
                    <button className="product-size-button small" onClick={e => setSize("small")}>S</button>
                    <button className="product-size-button small" onClick={e => setSize("medium")}>M</button>
                    <button className="product-size-button small" onClick={e => setSize("large")}>L</button>
                    <button className="product-size-button small" onClick={e => setSize("Xlarge")}>XL</button>
                </div>
                {
                        product.countInStock > 0 ? (
                            <div className="product-button Onesp-top">   
                                <button onClick={addToCartHandler} className="add-to-cart thin block">Add To Cart</button>
                            </div>      
                        ) : (
                            <div className="product-button Onesp-top">   
                                <button className="soldOut thin block">Sold Out</button>
                            </div> 
                        )}
            </div>
        </div>
    )
}

export default Product
