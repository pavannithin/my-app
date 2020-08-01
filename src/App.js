import React, {useEffect, Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Products from "./Products";
import Cart from "./cart";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={"/"} exact component={Products}/>
                    <Route path={"/cart"} component={Cart}/>
                </Switch>
            </Router>
        </div>
    );
}

export default (App);
