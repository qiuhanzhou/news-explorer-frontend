import './Main.css'
import NothingFound from '../NothingFound/NothingFound'
import Preloader from '../Preloader/Preloader'
import NewsCardList from '../NewsCardList/NewsCardList'
import { useState } from 'react'

export default function Main({
  cards,
  isSignedIn,
  setIsAuthModalOpen,
  isSearchSuccessful,
  isSearchBegan,
  isLoading,
}) {
  return (
    <main className='main'>
      {isLoading && <Preloader />}

      {isSearchBegan && !isSearchSuccessful && <NothingFound />}

      {isSearchBegan && isSearchSuccessful && (
        <div className='main__results'>
          <h1 className='main__results_title'>Search Results</h1>
          <NewsCardList
            cards={cards}
            isSignedIn={isSignedIn}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        </div>
      )}
    </main>
  )
}
