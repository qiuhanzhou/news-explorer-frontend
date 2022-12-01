import './SavedNews.css'
import NewsCard from '../NewsCard/NewsCard'
import { useContext } from 'react'
import { SavedCardsContext } from '../../context/SavedCardsContext'

export default function SavedNews({ isSignedIn, setIsAuthModalOpen }) {
  const { savedCards } = useContext(SavedCardsContext)

  return (
    <section className='saved-news'>
      <ul className='card-list'>
        {savedCards.map((card, i) => (
          <NewsCard
            key={i}
            card={card}
            isSignedIn={isSignedIn}
            setIsAuthModalOpen={setIsAuthModalOpen}
            isCardTypeSavedNews={true}
          />
        ))}
      </ul>
    </section>
  )
}
