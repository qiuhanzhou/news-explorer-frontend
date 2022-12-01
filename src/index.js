import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { SavedCardsProvider } from './context/SavedCardsContext'
import { CurrentUserProvider } from './context/CurrentUserContext'
import { SearchTermProvider } from './context/SearchTermContext'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <CurrentUserProvider>
      <SavedCardsProvider>
        <SearchTermProvider>
          <App />
        </SearchTermProvider>
      </SavedCardsProvider>
    </CurrentUserProvider>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
