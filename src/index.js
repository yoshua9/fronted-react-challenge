import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { store } from "./createStore";
import { Route, Router } from "react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const wrapper = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/phones" component={App} />
        </Router>
    </Provider>
)

ReactDOM.render(wrapper, document.getElementById('root'));
registerServiceWorker();
 