import { GET_CRUMBS, ADD_CRUMB, REMOVE_CRUMB } from './actionTypes';

export const getCrumbs = () => ({
  type: GET_CRUMBS,
});

export const addCrumb = payload => ({
  type: ADD_CRUMB,
  payload,
});

export const removeCrumb = payload => ({
  type: REMOVE_CRUMB,
  payload,
});
