import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SingleSearchPage from "./components/single-page-search/single-page";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <SingleSearchPage/>
  </React.StrictMode>,
  document.getElementById('root')
);
