import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { addCrumb, removeCrumb } from './redux/actions';

const unsubscribe = store.subscribe(() => {});

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>{element}</Provider>
);

export const onRouteUpdate = ({ location, prevLocation }) => {
  const {
    getCrumbs: { crumbs },
  } = store.getState();
  if (
    (location.state && location.state.crumbClicked) ||
    crumbs.find(
      crumb => crumb.pathname === location.pathname && crumbs.length > 0,
    )
  ) {
    store.dispatch(removeCrumb(location));
  } else {
    store.dispatch(addCrumb(location));
  }
};
