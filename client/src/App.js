import React, { Component } from 'react';
import PropTypes from 'prop-types';
import car from "./car.jpg";

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div style={{ position: 'fixed' }}>
          <img style={{ width: '100%', height: "768px" }} src={car} />
        </div>
        <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#9e9e9e5e' }}>
          hello
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;