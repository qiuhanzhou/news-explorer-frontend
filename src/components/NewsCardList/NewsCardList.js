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
  const [renderedCards, setRendedCards] = useState(cards.slice(0, count))

  useEffect(() => {
    setRendedCards(cards.slice(0, count))
  }, [cards, count])

  useEffect(() => {
    console.log(renderedCards, cards.slice(0, 3))
  }, [renderedCards, cards])

  function handleClickShowMore() {
    setCount((count) => count + 3)

    // setRendedCards(cards.slice(0, count))
  }
  return (
    <>
      <ul className='card-list'>
        {renderedCards.map((card) => (
          <NewsCard
            card={card}
            isSignedIn={isSignedIn}
            setIsAuthModalOpen={setIsAuthModalOpen}
          />
        ))}
      </ul>
      <button className='card-list__button' onClick={handleClickShowMore}>
        Show more
      </button>
    </>
  )
}
