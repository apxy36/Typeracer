import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Incorrectcontextprovider } from './store/incorrectcontext';

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
    <Incorrectcontextprovider>
<App /> 
</Incorrectcontextprovider>,
document.getElementById('root'));


