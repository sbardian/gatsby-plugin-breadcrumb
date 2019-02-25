import { REMOVE_CRUMB } from '../actionTypes';

const initialState = {
  crumbs: [{ pathname: '/somepath/' }],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CRUMB: {
      const { payload } = action;
      return {
        ...state,
        crumb: [...state.filter(crumb => crumb.pathname !== payload.pathname)],
      };
    }
    default:
      return state;
  }
}
