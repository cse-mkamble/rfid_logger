import React, { Component } from "react";

export default class error404 extends Component {
    render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ position: "absolute", top: "26%", left: "45%" }}>
                        OOPS! PAGE NOT FOUND
                    </p>
                    <h1 style={{ fontSize: 180 }}>404</h1>
                    <p style={{ position: "absolute", top: "54%", left: "40%" }}>
                        THE PAGE YOU REQUESTED FOR IS NOT FOUND
                    </p>
                </div>
            </div>
        )
    }
}
