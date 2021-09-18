import React from 'react';
import { Provider } from 'react-redux';

import Routes from "./route";
import store from "./redux/store";

window.store = store;

const Window = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Window;