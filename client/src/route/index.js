import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar";
import PrivateRoute from "../components/HOC";
import Home from "../containers/Home";
import Signin from "../containers/Signin";
import Signup from "../containers/Signup";
import error404 from "../containers/404";
import ScrollToTop from "../utils/scrollToTop";

const Routes = () => {
    return (
        <Router>
            <Switch>

                <Route exact path='/' component={Home} />

                <Route path='/Signin' component={Signin} />
                <Route path='/Signup' component={Signup} />

            </Switch>
        </Router>
    );
};

export default Routes;