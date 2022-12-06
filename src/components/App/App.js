import './App.css'

import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import SavedNews from '../SavedNews/SavedNews'
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
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { SavedCardsContext } from '../../context/SavedCardsContext'

export default function App() {
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [brightTheme, setBrightTheme] = useState(null)
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchBegan, setIsSearchBegan] = useState(false)
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(false)
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false)
  const [isSignin, setIsSignin] = useState(true)

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const { savedCards, setSavedCards } = useContext(SavedCardsContext)

  console.log(currentUser, savedCards)

  useEffect(() => {
    if (isSignUpSuccess) setIsInfoTooltipOpen(true)
  }, [isSignUpSuccess, setIsInfoTooltipOpen])

  useEffect(() => {
    const parsed = JSON.parse(localStorage.getItem('saved-cards'))
    if (parsed !== null) {
      setSavedCards(parsed)
    }
  }, [setSavedCards])

  useEffect(() => {
    localStorage.setItem('saved-cards', JSON.stringify(savedCards))
  }, [savedCards])

  useEffect(() => {
    if (location.pathname === '/saved-news') {
      setBrightTheme(true)
    } else {
      setBrightTheme(false)
    }
  }, [location.pathname])

  // mimic calling api to get current user info upon App mounting
  useEffect(() => {
    // api
    //   .getUserInfo()
    //   .then((currentUser) => {
    //     console.log(currentUser)
    //     setCurrentUser(currentUser)
    //   })
    //   .catch((err) => {
    //     console.log(`can't get inital user info: ${err}`)
    //   })

    setCurrentUser({ name: 'example' })
  }, [setCurrentUser])

  function handleSearchNews(searchTerm) {
    setIsLoading(true)
    setIsSearchBegan(true)
    api
      .getNews(searchTerm)
      .then((data) => {
        console.log(data.articles)
        setCards(data.articles)
        if (data.articles.length) {
          setIsSearchSuccessful(true)
        } else {
          setIsSearchSuccessful(false)
        }
      })
      .catch((err) => {
        console.log(`can't get news: ${err}`)
        setIsSearchSuccessful(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

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
              <Header
                brightTheme={brightTheme}
                handleOnSearch={handleSearchNews}
              />
              <Main
                cards={cards}
                isSignedIn={isLoggedIn}
                setIsAuthModalOpen={setIsAuthFormOpen}
                isLoading={isLoading}
                isSearchSuccessful={isSearchSuccessful}
                isSearchBegan={isSearchBegan}
              />
              <About />

              <ModalWithForm
                isOpen={isAuthFormOpen}
                onClose={handleCloseAllPopups}
                handleOnRegisterSubmit={handleRegisterSubmit}
                handleOnSigninSubmit={handleSigninSubmit}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsAuthFormOpen={setIsAuthFormOpen}
                isSignUpSuccess={isSignUpSuccess}
                setIsSignUpSuccess={setIsSignUpSuccess}
                setIsSignin={setIsSignin}
                isSignin={isSignin}
              />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                setIsOpen={setIsInfoTooltipOpen}
                onClose={handleCloseAllPopups}
                setIsAuthFormOpen={setIsAuthFormOpen}
                setIsSignin={setIsSignin}
              />
              <Footer />
            </>
          }
        />

        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route
            path='/saved-news'
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
                <SavedNews
                  isSignedIn={isLoggedIn}
                  setIsAuthModalOpen={setIsAuthFormOpen}
                />
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
