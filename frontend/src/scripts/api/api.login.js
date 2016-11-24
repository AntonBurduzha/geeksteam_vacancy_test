export default function postUserData(login, pass){
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'Username': login,
      'Password': pass,
    })
  }).then(response => response.json())
}