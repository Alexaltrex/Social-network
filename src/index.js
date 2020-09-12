import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppGlobal from "./AppContainer";

ReactDOM.render(
    <AppGlobal/>,
    document.getElementById('root'));

serviceWorker.unregister();

