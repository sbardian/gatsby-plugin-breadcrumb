import { GET_CRUMBS, ADD_CRUMB, REMOVE_CRUMB } from '../actionTypes';

const initialState = {
  crumbs: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CRUMBS: {
      return state;
    }
    case ADD_CRUMB: {
      const { payload } = action;
      const { crumbs } = state;
      return {
        crumbs: [...crumbs, payload],
      };
    }
    case REMOVE_CRUMB: {
      const { payload } = action;
      const { crumbs } = payload;
      return {
        ...state,
        crumb: [...crumbs.filter(crumb => crumb.pathname !== payload.pathname)],
      };
    }
    default:
      return state;
  }
}
