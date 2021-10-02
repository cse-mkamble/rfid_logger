import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./redux/store";

import AlertsView from "./components/AlertsView";
import error404 from "./screens/404";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Test from "./screens/Test";
import './index.css';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      successMessages: [],
      errorMessages: []
    }
  }

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
        <div>
          <div>
            <AlertsView
              successMessages={this.state.successMessages}
              errorMessages={this.state.errorMessages}
              handleDismissSuccessMessage={this.handleDismissSuccessMessage}
              handleDismissErrorMessage={this.handleDismissErrorMessage}
            />
          </div>
          <div>
            <Router>
              <Switch>
                <Route exact path="/signin">
                  <Login
                    handleAddErrorMessages={this.handleAddErrorMessages}
                    handleAddSuccessMessage={this.handleAddSuccessMessage}
                  />
                </Route>
                <Route path="/signup">
                  <Register
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
                  <Login
                    handleAddErrorMessages={this.handleAddErrorMessages}
                    handleAddSuccessMessage={this.handleAddSuccessMessage}
                  />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('main')
);