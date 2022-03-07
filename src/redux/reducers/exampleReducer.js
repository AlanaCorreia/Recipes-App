import { ACTION_EXAMPLE } from '../actions';

const INITIAL_STATE = {
  example: '',
};

function exampleReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTION_EXAMPLE:
    return {
      ...state,
      example: action.payload,
    };
  default:
    return state;
  }
}

export default exampleReducer;
