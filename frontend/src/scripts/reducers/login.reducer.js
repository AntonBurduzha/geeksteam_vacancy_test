export default(state = {}, action) => {
  if(action.type === 'VERIFY_LOGIN'){
    return Object.assign({}, state, action.payload);
  }
  return state;
}