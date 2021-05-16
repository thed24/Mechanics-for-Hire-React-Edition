import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(
    <Router />
    , document.getElementById('root'));