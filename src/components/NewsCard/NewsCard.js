import { useEffect, useState, useContext } from 'react'
import { SavedCardsContext } from '../../context/SavedCardsContext'
import './NewsCard.css'

import { SearchTermContext } from '../../context/SearchTermContext'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function NewsCard({
  card,
  isSignedIn,
  setIsAuthModalOpen,
  isCardTypeSavedNews,
}) {
  const { savedCards, setSavedCards } = useContext(SavedCardsContext)
  const { searchTerm } = useContext(SearchTermContext)

  const [isTooptipShown, setIsTooptipShown] = useState(false)
  const [isCardSaved, setIsCardSaved] = useState(false)

  //update isCardSaved status upon rerendering
  useEffect(() => {
    if (savedCards && savedCards.some((item) => item.url === card.url)) {
      setIsCardSaved(true)
    } else {
      setIsCardSaved(false)
    }
  }, [savedCards, card])

  function handleSaveClick(e) {
    if (!isSignedIn) {
      setIsAuthModalOpen(true)
    } else {
      if (!isCardSaved) {
        setIsCardSaved(true)
        setSavedCards([...savedCards, { ...card, keyword: searchTerm }])
      } else {
        setIsCardSaved(false)
        const newSavedCards = savedCards.filter((item) => {
          console.log(item.url)
          return item.url !== card.url
        })
        setSavedCards([...newSavedCards])
      }
    }
  }
  function handleDeleteClick() {
    const newSavedCards = savedCards.filter((item) => {
      console.log(item.url)
      return item.url !== card.url
    })
    setSavedCards([...newSavedCards])
  }

  function convertDate(timestr) {
    const publishDate = timestr.split('T')[0]
    const [year, month, day] = publishDate.split('-')
    const publishDay = months[month - 1] + ' ' + day + ', ' + year
    return publishDay
  }

  return (
    <li className='card'>
      {!isCardTypeSavedNews && (
        <button
          type='button'
          aria-label='save'
          className={`card__save-button ${
            isCardSaved ? 'card__save-button_saved' : ''
          }`}
          onClick={handleSaveClick}
          onMouseEnter={() => setIsTooptipShown(true)}
          onMouseLeave={() => setIsTooptipShown(false)}
        ></button>
      )}

      {isCardTypeSavedNews && (
        <>
          <div className='card__keyword'>{card.keyword}</div>
          <button
            type='button'
            aria-label='delete'
            className='card__delete-button'
            onClick={handleDeleteClick}
            onMouseEnter={() => setIsTooptipShown(true)}
            onMouseLeave={() => setIsTooptipShown(false)}
          ></button>
        </>
      )}

      <div
        className={`card__tooltip-container ${
          (isTooptipShown && !isSignedIn) ||
          (isCardTypeSavedNews && isTooptipShown)
            ? 'card__tooltip-container_shown'
            : ''
        }`}
      >
        <p className='card__tooltip'>
          {' '}
          {!isCardTypeSavedNews
            ? 'Sign in to save articles'
            : 'Remove from saved '}
        </p>
      </div>

      <a className='card__link' href={card.url} target='_blank'>
        <img
          className='card__img'
          src={card.urlToImage}
          alt='card news headline image'
        />
      </a>
      <div className='card__content'>
        <p className='card__date'>{convertDate(card.publishedAt)}</p>
        <a className='card__link' href={card.url} target='_blank'>
          <h2 className='card__title'>{card.title}</h2>
        </a>
        <a className='card__link' href={card.url} target='_blank'>
          <p className='card__text'>{card.description}</p>
        </a>
        <p className='card__source-name'>{card.source.name}</p>
      </div>
    </li>
  )
}
