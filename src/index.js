import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

//const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStore(reducers);

ReactDOM.render(
<Provider store={store}><AppComponent /></Provider>
, document.getElementById('root'));

serviceWorker.unregister();
