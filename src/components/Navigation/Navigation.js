import './Navigation.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logOutIconWhite from '../../images/Union-white.svg'
import logOutIconBlack from '../../images/Union-black.svg'
import logoWhite from '../../images/NewsExplorer-white.svg'
import logoBlack from '../../images/NewsExplorer-blackk.svg'
import burgerBlack from '../../images/burger-black.svg'
import burgerWhite from '../../images/burger-white.svg'
import closeIcon from '../../images/close-white.svg'

export default function Navigation({
  loggedIn,
  userName,
  brightTheme,
  currentPath,
  onSignIn,
}) {
  const [width, setWidth] = useState(window.innerWidth)
  const [burgerOpen, setBurgerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const breakPoint = 700

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
    return () => window.removeEventListener('scroll', listenScrollEvent)
  }, [])

  function listenScrollEvent(e) {
    console.log(window.pageYOffset)
    if (window.pageYOffset > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  function onSignOut() {
    console.log('onsignout')
  }

  function toggleBurger() {
    setBurgerOpen(!burgerOpen)
  }

  return (
    <section
      className={`navigation ${brightTheme ? 'navigation_bright-theme' : ''} ${
        isScrolled ? 'navigation_scroll' : ''
      } 
      ${width < breakPoint && burgerOpen ? 'navigation_burger-open' : ''}`}
    >
      <div
        className={`navigation__bar  ${
          isScrolled ? 'navigation__bar_scroll' : ''
        }`}
      >
        <Link to='/' className='navigation__logo-link'>
          <img
            src={
              !brightTheme || (brightTheme && burgerOpen && width < breakPoint)
                ? logoWhite
                : logoBlack
            }
            alt='NewsExplorer logo'
            className='navigation__logo'
          />
        </Link>

        {width > breakPoint ? (
          <div className='navigation__items-wrapper'>
            <Link
              to='/'
              className={`navigation__link ${
                currentPath === '/' ? 'navigation__link_type_focus' : ''
              }`}
            >
              Home
            </Link>
            {loggedIn && (
              <>
                <Link
                  to='/saved-news'
                  className={`navigation__link ${
                    currentPath === '/saved-news'
                      ? 'navigation__link_type_focus'
                      : ''
                  }`}
                >
                  Saved articles
                </Link>
                <button
                  aria-label='signout'
                  type='button'
                  className='navigation__button navigation__button_type_signout'
                  onClick={onSignOut}
                >
                  {userName}ersdfsdf
                  <img
                    src={
                      currentPath === '/saved-news'
                        ? logOutIconBlack
                        : logOutIconWhite
                    }
                    alt='signout icon'
                    className='navigation__signout-icon'
                  />
                </button>
              </>
            )}

            {!loggedIn && (
              <button
                aria-label='signin'
                type='button'
                className='navigation__button navigation__button_type_signin'
                onClick={onSignIn}
              >
                Sign in{' '}
              </button>
            )}
          </div>
        ) : !burgerOpen ? (
          <button
            className='navigation_burger-nav_burger-btn'
            onClick={toggleBurger}
          >
            <img
              src={brightTheme ? burgerBlack : burgerWhite}
              alt='burger menu icon for mobile screen'
            />
          </button>
        ) : (
          <button
            className='navigation_burger-nav_burger-btn'
            onClick={toggleBurger}
          >
            <img
              src={closeIcon}
              alt='close button icon of burger menu for mobile screen'
            />
          </button>
        )}
      </div>

      {width < breakPoint && burgerOpen && (
        <div className='navigation_burger-nav'>
          <Link to='/' className='navigation_burger-nav_link'>
            Home
          </Link>
          <Link to='/saved-news' className='navigation_burger-nav_link'>
            Saved articles
          </Link>
          {!loggedIn && (
            <button
              aria-label='signin'
              type='button'
              className='navigation_burger-nav_button'
              onClick={onSignIn}
            >
              Sign in{' '}
            </button>
          )}
          {loggedIn && (
            <button
              aria-label='signout'
              type='button'
              className='navigation_burger-nav_button'
              onClick={onSignOut}
            >
              {userName}ersdfsdf
              <img
                src={logOutIconWhite}
                alt='signout icon'
                className='navigation__signout-icon'
              />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
