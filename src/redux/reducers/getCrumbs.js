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
      const { crumbs } = state;
      const removeAfter = crumbs.findIndex(
        crumb => crumb.pathname === payload.pathname,
      );
      crumbs.splice(removeAfter + 1);

      return {
        crumbs: [...crumbs],
      };
    }
    default:
      return state;
  }
}
