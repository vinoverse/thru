import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/animated.css";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './assets/style.scss?v=1634201665583';
import './assets/custom.scss?v=1634201665583';
import App from './components/App';
import {configureStore} from "@reduxjs/toolkit" 
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import walletaccount from './Store';


const store = configureStore({
	reducer: walletaccount,
});

ReactDOM.render(
	<Provider store={store}>
	<App />
	</Provider>,
	document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();