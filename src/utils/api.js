export const BASE_URL = 'https://register.nomoreparties.co'

export const register = (password, email) => {
  return _request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res
  })
}
