import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { addCrumb } from './redux/actions';

const unsubscribe = store.subscribe(() =>
  console.log('subscribe: ', store.getState()),
);

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log('new pathname', location.pathname);
  console.log('old pathname', prevLocation ? prevLocation.pathname : null);

  store.dispatch(addCrumb(location));

  console.log('After dispatch', store.getState());
};
