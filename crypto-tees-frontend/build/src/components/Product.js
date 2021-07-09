import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Rating from "./Rating";

function Product(props) {
    const {product} = props
    const [size, setSize] = useState("")
    const [qty, setQty] = useState(0)
    const [sizeSelected, setSizeSelected] = useState(false)
    const [warning, setWarning] = useState(false)
    const numOfProductInStock = product.small + product.medium + product.large + product.Xlarge

    const addToCartHandler = () => {
        // props.history.push(`/cart/${productId}?qty=1`)
        if(!size) {
            setWarning(true)
        }
    }
    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.main_image} alt={product.name} />
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
                    <button className={`product-size-button small ${product.small === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("small"); setQty(product.small); setSizeSelected(true)}}>S</button>
                    <button className={`product-size-button small ${product.medium === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("medium"); setQty(product.medium); setSizeSelected(true)}}>M</button>
                    <button className={`product-size-button small ${product.large === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("large"); setQty(product.large); setSizeSelected(true)}}>L</button>
                    <button className={`product-size-button small ${product.Xlarge === 0 || null ? "forbidden" : ""}`} onClick={e => {setSize("Xlarge"); setQty(product.Xlarge); setSizeSelected(true)}}>XL</button>
                </div>
                <div className="size-text">
                  {sizeSelected
                  ? <p className={`size-${qty < 10 ? "red" : "normal"}`}>{`${qty} left in stock`}</p>
                  : <p className={`size-${warning ? "red": "normal"}`}>Please select a size</p>
                  }
                </div>
                {
                        numOfProductInStock > 0 ? (
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
