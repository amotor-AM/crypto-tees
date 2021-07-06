import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import App from './components/App';
import store from "./store";

// React 18 - had to rollback due to conflicts with redux
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Provider store={store}><App /></Provider>);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
)
