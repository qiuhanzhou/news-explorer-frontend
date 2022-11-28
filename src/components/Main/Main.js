import './Main.css'
import Preloader from '../Preloader'
import NewsCardList from '../NewsCardList/NewsCardList'
import { useState } from 'react'

export default function Main({ cards, isSignedIn, setIsAuthModalOpen }) {
  const [searchSuccess, setSearchSuccess] = useState(true)

  return (
    <main className='main'>
      {searchSuccess && (
        <div className='main__results'>
          <h1 className='main__results_title'>Search Results</h1>
          <NewsCardList
            cards={cards}
            isSignedIn={isSignedIn}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        </div>
      )}
      <Preloader />
    </main>
  )
}
