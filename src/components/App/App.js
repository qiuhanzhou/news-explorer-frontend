import './App.css'

import {
  Route,
  Routes,
  Navigate,
  useHistory,
  withRouter,
  Link,
  useLocation,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import SavedNews from '../SavedNews'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Navigation from '../Navigation/Navigation'
import ProtectedRoute from '../ProtectedRoute'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import InfoTooltip from '../InfoToolTip/InfoToolTip'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import About from '../About/About'
import Footer from '../Footer/Footer'
import api from '../../utils/newsApi'

export default function App() {
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [brightTheme, setBrightTheme] = useState(null)
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function serachNews(searchTerm) {
    setIsLoading(true)
    api
      .getNews(searchTerm)
      .then((data) => {
        console.log(data)
        setCards(data.articles)
      })
      .catch((err) => {
        console.log(`can't get news: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (location.pathname === '/saved-news') {
      setBrightTheme(true)
    } else {
      setBrightTheme(false)
    }
  }, [location.pathname])

  function handleCloseAllPopups(e) {
    if (
      (e.type === 'click' &&
        (e.target.classList.contains('modal__close-button') ||
          e.target.classList.contains('modal_open'))) ||
      (e.type === 'keydown' && e.key === 'Escape')
    ) {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    setIsAuthFormOpen(false)
    setIsInfoTooltipOpen(false)
  }

  function onSignIn() {
    setIsAuthFormOpen(true)
  }

  function handleRegisterSubmit(password, email) {
    // auth
    //   .register(password, email)
    //   .then((res) => {
    //     console.log(res)
    //     if (res.data) {
    //       //show modal with success message
    //       setIsInfoTooltipOpen(true)
    //       setMessage('Registration successfully completed!')
    //       // history.push('/login')
    //     } else {
    //       setMessage('This email is not available')
    //setHasServerError(true)
    //     }
    //   })
    //   .catch((err) => {
    //     setMessage('This email is not available')
    //     if (err.statusCode === 400) {
    //       console.log('one of the fields was filled in incorrectly')
    //     } else {
    //       console.log(err)
    //     }
    //   })
  }
  function handleSigninSubmit(email, password) {
    // auth
    //   .authorize(email, password)
    //   .then((data) => {
    //     console.log(data)
    //     if (data.token) {
    //       setValues({ email: '', password: '' })
    //       handleLogin(email)
    //       //wait 3s and then redirect
    //       setTimeout(() => {
    //         history.push('/')
    //       }, 3000)
    //     } else {
    //       setError(true)
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.statusCode === 400) {
    //       console.log('one or more of the fields were not provided')
    //     }
    //     if (err.statusCode === 401) {
    //       console.log('401 - the user with the specified email not found')
    //     }
    //     console.log('cannot log in')
    //     setError(true)
    //   })
  }
  function onSignIn() {
    setIsAuthFormOpen(true)
  }

  return (
    <div className={`App `}>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <Navigation
                currentPath={location.pathname}
                brightTheme={brightTheme}
                loggedIn={isLoggedIn}
                onSignIn={onSignIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Header brightTheme={brightTheme} />
              <Main
                cards={cards}
                isSignedIn={isLoggedIn}
                setIsAuthModalOpen={setIsAuthFormOpen}
              />
              <About />

              <ModalWithForm
                isOpen={isAuthFormOpen}
                onClose={handleCloseAllPopups}
                message={message}
                handleOnRegisterSubmit={handleRegisterSubmit}
                handleOnSigninSubmit={handleSigninSubmit}
                isSuccess={isSuccess}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsAuthFormOpen={setIsAuthFormOpen}
              />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                setIsOpen={setIsInfoTooltipOpen}
                onClose={handleCloseAllPopups}
                message={message}
                setIsSignInOpen={setIsAuthFormOpen}
                isSuccess={isSuccess}
              />
              <Footer />
            </>
          }
        />

        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route
            path='saved-news'
            element={
              <>
                <Navigation
                  currentPath={location.pathname}
                  brightTheme={brightTheme}
                  loggedIn={isLoggedIn}
                  onSignIn={onSignIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <SavedNewsHeader />
                <SavedNews />
                <Footer />
              </>
            }
          />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}
