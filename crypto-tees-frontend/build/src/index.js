import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import App from './components/App';
import store from "./store";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import dotenv from "dotenv";

dotenv.config()

// React 18 - had to rollback due to conflicts with redux
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Provider store={store}><App /></Provider>);

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY)


ReactDOM.render(
    <Provider store={store}>
        <Elements stripe={stripePromise}>
            <App/>
        </Elements>
    </Provider>,
    document.getElementById("root")
)
