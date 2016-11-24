import AppActionTypes from './action.types'

export default function actionCheckUserData(response) {
  return {
    type: AppActionTypes.VERIFY_LOGIN,
    payload: response
  };
}