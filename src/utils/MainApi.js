import {
  BASE_URL,
  RESOURCE_CREATED,
  CONFLICT,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  REQUEST_SUCCEDED,
  UNAUTHORIZED,
} from './constants'

const checkResponse = (res) => {
  if (res.ok) {
    console.log(
      `URL: ${res.url}
Status: ${res.statusText}
Status code: ${res.status}`,
    )
    return res.json()
  } else {
    return Promise.reject(`Error: ${res.status}`)
  }
}

export const getProfileInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then(checkResponse)
}

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.status === RESOURCE_CREATED) {
      return res.json()
    }
    if (res.status === CONFLICT) {
      throw new Error('This email is not available')
    }
    if (res.status === BAD_REQUEST) {
      throw new Error('Some of the fields are invalid')
    }
    if (res.status === INTERNAL_SERVER_ERROR) {
      throw new Error('Sorry, something went wrong during the request')
    }
  })
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.status === REQUEST_SUCCEDED) {
        return res.json()
      }
      if (res.status === UNAUTHORIZED) {
        throw new Error('Email or password are incorrect')
      }
      if (res.status === BAD_REQUEST) {
        throw new Error('Some of the fields are invalid')
      }
      if (res.status === INTERNAL_SERVER_ERROR) {
        throw new Error('Sorry, something went wrong during the request')
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('email', email)
        return data
      } else {
        return
      }
    })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data)
}

export const getArticles = () => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse)
}

export const saveArticles = ({
  keyword,
  title,
  text,
  date,
  source,
  link,
  image,
}) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    }),
  }).then(checkResponse)
}

export const deleteArticles = ({ articleId }) => {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse)
}
