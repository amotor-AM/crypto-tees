import React, {useEffect} from 'react';
import Product from "../Product";
import LoadingHex from "../LoadingHex";
import MessageBox from "../MessageBox";
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/productActions';

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList
    console.log(products)

    useEffect(() => {
        dispatch(action.listProducts())
    }, [dispatch])

    return (
        <div>
            {loading 
            ? <LoadingHex/>
            : error ? <MessageBox variant="danger">{error}</MessageBox>
            : <div className="row center">{products.map(product => <Product key={product._id} product={product}/>)}</div>} 
        </div>
    )
}

export default HomeScreen
