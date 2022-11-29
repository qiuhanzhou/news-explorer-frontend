import './constants'
import { apiKey, BASE_URL } from './constants'

const currentDate = new Date()
  .toLocaleString()
  .split(',')[0]
  .replaceAll('/', '-')

const fromDate = new Date(new Date().getTime() - 24 * 60 * 60 * 7 * 1000)
  .toLocaleDateString()
  .split(',')[0]
  .replaceAll('/', '-')

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options)
      .then((res) => this._handleServerResponse(res))
      .catch(() => {
        console.log('failed fetch')
      })
  }

  getNews(searchTerm) {
    return this._request(
      `${BASE_URL}?q=${searchTerm}&from=${fromDate}&to=${currentDate}&apiKey=${apiKey}`,
    )
  }
}
const api = new Api({
  baseUrl: BASE_URL,
})

export default api
