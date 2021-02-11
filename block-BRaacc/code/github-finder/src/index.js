import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './styles/main.css';

// import Header from "./components/Header"
import App from './components/App';
import User from "./components/User";

ReactDOM.render(
  // <Header />
  <BrowserRouter>
  {/* <Header /> */}
    <Route path="/users/:username" component={User}/>
    <Route path="/" exact>
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById('root')
);

