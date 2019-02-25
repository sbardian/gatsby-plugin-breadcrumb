import { ADD_CRUMB } from '../actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CRUMB: {
      const { payload } = action;
      return {
        crumbs: [...state, payload],
      };
    }
    default:
      return state;
  }
}
