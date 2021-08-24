import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {Route} from 'react-router-dom'

const App = () =>{
  return <div>
    <Navbar />
    <Route exact path="/">
    <Home />
    </Route>
    <Route path="/signup">
    <Signup />
    </Route>
    <Route path="/login">
    <Login />
    </Route>
  </div>
}

export default App;
