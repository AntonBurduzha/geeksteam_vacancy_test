const reducers = {};

reducers.validateLogin = validateLogin;

function validateLogin(state = {}, action) {
  if(action.type === 'VALIDATE_LOGIN'){
    return Object.assign({}, state, action.payload);
  }
  return state;
}

export default reducers;