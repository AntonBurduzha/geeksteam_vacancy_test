const VALIDATE_LOGIN = 'VALIDATE_LOGIN';

export default function checkLogin(response) {
  return {
    type: VALIDATE_LOGIN,
    payload: response
  };
}