import './SavedNewsHeader.css'
import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { SavedCardsContext } from '../../context/SavedCardsContext'

export default function SavedNewsHeader({ keyword }) {
  const { currentUser } = useContext(CurrentUserContext)
  const [count, setCount] = useState(0)
  const { savedCards } = useContext(SavedCardsContext)

  useEffect(() => {
    setCount(savedCards.length)
  }, [savedCards])

  const keywords = savedCards.map((card) => card.keyword)
  const uniqueKeywords = [...new Set(keywords)]

  return (
    <div className='saved-news-header'>
      <p className='saved-news-header__intro'>Saved articles</p>
      <h1 className='saved-news-header__title'>{`${currentUser.name}, you have ${count} saved articles`}</h1>
      <p className='saved-news-header__keywords'>
        By keywords&#58;&nbsp;
        <span className='saved-news-header__keywords-bold'>
          {uniqueKeywords.length > 2
            ? `${uniqueKeywords.slice(0, 2).join(', ')} and ${
                uniqueKeywords.length - 2
              }
          ${uniqueKeywords.length - 2 > 1 ? 'others' : 'other'}`
            : uniqueKeywords.slice(0, 2).join(', ')}
        </span>
      </p>
    </div>
  )
}
