import React, { Component } from "react";
import { Route, Switch } from "react-router";

import Signup from "./Signup";
import VerifySendMail from "./VerifySendMail";
import VerifyOTP from "./VerifyOTP";

export default class Register extends Component {
    render() {
        return (
            <div>
                <div>
                    <div style={{ width: '100%', marginTop: '40px', padding: '20px', display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <div className='bg-white rounded' style={{ width: '800px', border: '1px solid #dadce0' }}>
                                <div>
                                    <Switch>
                                        <Route exact path="/signup">
                                            <Signup
                                                handleAddErrorMessages={this.props.handleAddErrorMessages}
                                                handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                                        </Route>
                                        <Route exact path="/signup/verifySendMail">
                                            <VerifySendMail
                                                handleAddErrorMessages={this.props.handleAddErrorMessages}
                                                handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                                        </Route>
                                        <Route exact path="/signup/verifyOTP">
                                            <VerifyOTP
                                                handleAddErrorMessages={this.props.handleAddErrorMessages}
                                                handleAddSuccessMessage={this.props.handleAddSuccessMessage} />
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}