import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlertsView from "../components/AlertsView";
import NavBar from "../components/NavBar";
import PrivateRoute from "../components/HOC";
import Home from "../containers/Home";
import Signin from "../containers/Signin";
import Signup from "../containers/Signup";
import Test from "../containers/Test";
import error404 from "../containers/404";
import ScrollToTop from "../utils/scrollToTop";

class Routes extends React.Component {
    state = {
        successMessages: [],
        errorMessages: []
    };

    handleAddErrorMessages = errors => {
        this.setState({ errorMessages: [...this.state.errorMessages, ...errors] });
    };

    handleAddSuccessMessage = successMessage => {
        this.setState({
            successMessages: [...this.state.successMessages, { msg: successMessage }]
        });
    };

    handleDismissErrorMessage = index => {
        const errorMessages = [...this.state.errorMessages];
        errorMessages.splice(index, 1);
        this.setState({ errorMessages: [...errorMessages] });
    };

    handleDismissSuccessMessage = index => {
        const successMessages = [...this.state.successMessages];
        successMessages.splice(index, 1);
        this.setState({ successMessages: [...successMessages] });
    };

    render() {
        return (
            <div>
                <AlertsView
                    successMessages={this.state.successMessages}
                    errorMessages={this.state.errorMessages}
                    handleDismissSuccessMessage={this.handleDismissSuccessMessage}
                    handleDismissErrorMessage={this.handleDismissErrorMessage}
                />
                <Router>
                    <Switch>
                        <Route exact path="/signin">
                            <Signin
                                handleAddErrorMessages={this.handleAddErrorMessages}
                                handleAddSuccessMessage={this.handleAddSuccessMessage}
                            />
                        </Route>
                        <Route exact path="/signup">
                            <Signup
                                handleAddErrorMessages={this.handleAddErrorMessages}
                                handleAddSuccessMessage={this.handleAddSuccessMessage}
                            />
                        </Route>
                        <Route exact path="/">
                            <Home
                                handleAddErrorMessages={this.handleAddErrorMessages}
                                handleAddSuccessMessage={this.handleAddSuccessMessage}
                            />
                        </Route>
                        <Route exact path="/test">
                            <Test
                                handleAddErrorMessages={this.handleAddErrorMessages}
                                handleAddSuccessMessage={this.handleAddSuccessMessage}
                            />
                        </Route>
                        <Route path="*">
                            <Signin
                                handleAddErrorMessages={this.handleAddErrorMessages}
                                handleAddSuccessMessage={this.handleAddSuccessMessage}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

// export default App;



// const Routes = () => {
//     return (
//         <Router>
//             <Switch>

//                 <Route exact path='/' component={Home} />

//                 <Route path='/Signin' component={Signin} />
//                 <Route path='/Signup' component={Signup} />

//             </Switch>
//         </Router>
//     );
// };

export default Routes;