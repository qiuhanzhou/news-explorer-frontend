export const apiKey = '695064ce7e354fa982d3bae257a13646'

export const NEWS_BASE_URL = 'https://nomoreparties.co/news/v2/everything'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.news.karenzhou.me'
    : 'http://localhost:3001'

export const pageSize = 100

export const newsPerPage = 3

export const startpoint = 0

export const BAD_REQUEST = 400

export const UNAUTHORIZED = 401

export const CONFLICT = 409

export const RESOURCE_CREATED = 201

export const INTERNAL_SERVER_ERROR = 500

export const REQUEST_SUCCEDED = 200
