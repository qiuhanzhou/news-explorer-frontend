import './App.css'

import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Navigation from '../Navigation/Navigation'
import ProtectedRoute from '../ProtectedRoute'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import InfoTooltip from '../InfoToolTip/InfoToolTip'
import About from '../About/About'
import Footer from '../Footer/Footer'
import SavedNewsPage from '../SavedNewsPage/SavedNewsPage'

import { CurrentUserContext } from '../../context/CurrentUserContext'
import { SavedCardsContext } from '../../context/SavedCardsContext'
import api from '../../utils/newsApi'
import {
  getProfileInfo,
  getArticles,
  register,
  authorize,
  checkToken,
} from '../../utils/MainApi'

export default function App() {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [brightTheme, setBrightTheme] = useState(false)
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchBegan, setIsSearchBegan] = useState(false)
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(false)
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false)
  const [isSignin, setIsSignin] = useState(true)
  const [showServerMessage, setShowServerMessage] = useState(false)
  const [isSignInSuccess, setIsSignInSuccess] = useState(null)
  const [signInErrorMessage, setSignInErrorMessage] = useState('')
  const [showSignInErrorMessage, setShowSignInErrorMessage] = useState(false)

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const { savedCards, setSavedCards } = useContext(SavedCardsContext)

  useEffect(() => {
    if (isSignUpSuccess) setIsInfoTooltipOpen(true)
  }, [isSignUpSuccess, setIsInfoTooltipOpen])

  // useEffect(() => {
  //   const parsed = JSON.parse(localStorage.getItem('saved-cards'))
  //   if (parsed !== null) {
  //     setSavedCards(parsed)
  //   }
  // }, [setSavedCards])

  // useEffect(() => {
  //   localStorage.setItem('saved-cards', JSON.stringify(savedCards))
  // }, [savedCards])

  useEffect(() => {
    if (location.pathname === '/saved-news') {
      setBrightTheme(true)
    } else {
      setBrightTheme(false)
    }
  }, [location.pathname])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt && isLoggedIn) {
      getProfileInfo()
        .then((res) => {
          setCurrentUser(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      getArticles()
        .then((data) => {
          setSavedCards(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  //check for token before verifying token when mounting the app
  useEffect(handleTokenCheck, [])

  function handleTokenCheck() {
    const token = localStorage.getItem('jwt')
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            //meaning token is verified
            setCurrentUser(res.data)
            setIsLoggedIn(true)
            // history.push('/')
          } else {
            //meaning token is not verified
            localStorage.removeItem('jwt')
          }
        })
        .catch((err) => {
          console.log('cannot check token', err)
        })
    }
  }

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

  function onClickSignIn() {
    setIsAuthFormOpen(true)
  }

  function handleRegisterSubmit(email, password, name) {
    register(email, password, name)
      .then((res) => {
        if (res.data) {
          //show modal with success message
          setIsInfoTooltipOpen(true)
          // history.push('/login')
        } else {
          //show register error
          setShowServerMessage(true)
        }
      })
      .catch((err) => {
        if (err.statusCode === 400) {
          console.log('one of the fields was filled in incorrectly')
        } else {
          console.log(err)
          setShowServerMessage(true)
        }
      })
  }

  function handleSigninSubmit(email, password) {
    if (!password || !email) {
      console.log('Email or password are not correct')
      return
    }
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          setCurrentUser(res.data)
          setIsLoggedIn(true)
          closeAllPopups(true)
          setIsAuthFormOpen(false)
        }
      })
      .catch((err) => {
        setIsSignUpSuccess(false)
        setIsSignInSuccess(false)
        setShowSignInErrorMessage(true)
        setSignInErrorMessage(err.message)
      })
      .finally(() => {
        setSavedCards([])
        setIsLoading(false)
      })
  }

  return (
    <div className={`App`}>
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
                onClickSignIn={onClickSignIn}
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
                isSignInSuccess={isSignInSuccess}
                setIsSignin={setIsSignin}
                isSignin={isSignin}
                setShowServerMessage={setShowServerMessage}
                showServerMessage={showServerMessage}
                signInErrorMessage={signInErrorMessage}
                setShowSignInErrorMessage={setShowSignInErrorMessage}
                showSignInErrorMessage={showSignInErrorMessage}
              />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                setIsOpen={setIsInfoTooltipOpen}
                onClose={handleCloseAllPopups}
                setIsAuthFormOpen={setIsAuthFormOpen}
              />
              <Footer />
            </>
          }
        />

        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route
            path='/saved-news'
            element={
              <SavedNewsPage
                isLoggedIn={isLoggedIn}
                onClickSignIn={onClickSignIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsAuthFormOpen={setCurrentUser}
              />
            }
          />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
    //use Navigate to dynamically redirect the  routes  to '/'
  )
}
