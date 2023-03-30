import { useEffect, useContext } from 'react'
import { getArticles } from '../../utils/MainApi'
import { SavedCardsContext } from '../../context/SavedCardsContext'
import Navigation from '../Navigation/Navigation'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import SavedNews from '../SavedNews/SavedNews'
import Footer from '../Footer/Footer'

export default function SavedNewsPage({
  isLoggedIn,
  onClickSignIn,
  setIsLoggedIn,
  setIsAuthFormOpen,
}) {
  // useeffect // call getArticles
  // save to context

  const { setSavedCards } = useContext(SavedCardsContext)

  useEffect(() => {
    getArticles().then((data) => {
      setSavedCards(data)
    })
  }, [])

  return (
    <>
      <Navigation
        brightTheme={true}
        loggedIn={isLoggedIn}
        onClickSignIn={onClickSignIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <SavedNewsHeader />
      <SavedNews
        isSignedIn={isLoggedIn}
        setIsAuthModalOpen={setIsAuthFormOpen}
      />
      <Footer />
    </>
  )
}
