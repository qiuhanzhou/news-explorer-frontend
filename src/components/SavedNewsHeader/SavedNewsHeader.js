import './SavedNewsHeader.css'
import { useContext } from 'react'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { useEffect } from 'react'
import { useState } from 'react'

export default function SavedNewsHeader({ savedCards, keyword }) {
  const { name } = useContext(CurrentUserContext)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(savedCards.length)
  }, [savedCards])

  return (
    <div className='saved-news-header'>
      <p className='saved-news-header__intro'>Saved articles</p>
      <h1 className='saved-news-header__title'>{`${name}, you have ${count} saved articles`}</h1>
      <p className='saved-news-header__keywords'>
        By keywords&nbsp;
        <span className='saved-news-header__keywords-bold'>{keyword}</span>
      </p>
    </div>
  )
}
