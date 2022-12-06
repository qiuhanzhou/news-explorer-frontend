import './NewsCardList.css'
import { useEffect } from 'react'
import NewsCard from '../NewsCard/NewsCard'
import { useState } from 'react'

export default function NewsCardList({
  cards,
  isSignedIn,
  setIsAuthModalOpen,
}) {
  const [count, setCount] = useState(3)
  const [toBeRenderedCards, setToBeRendedCards] = useState(
    cards.slice(0, count),
  )

  useEffect(() => {
    setToBeRendedCards(cards.slice(0, count))
  }, [cards, count])

  function handleClickShowMore() {
    setCount((count) => count + 3)
  }
  return (
    <>
      <ul className='card-list'>
        {toBeRenderedCards.map((card, index) => (
          <NewsCard
            key={index}
            index={index}
            card={card}
            isSignedIn={isSignedIn}
            setIsAuthModalOpen={setIsAuthModalOpen}
            isCardTypeSavedNews={false}
          />
        ))}
      </ul>
      <button className='card-list__button' onClick={handleClickShowMore}>
        Show more
      </button>
    </>
  )
}
