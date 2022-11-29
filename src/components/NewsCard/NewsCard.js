import { useEffect, useState } from 'react'
import './NewsCard.css'

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
  savedCards,
  setSavedCards,
  keyword,
}) {
  const [isTooptipShown, setIsTooptipShown] = useState(false)
  const [isCardSaved, setIsCardSaved] = useState(false)

  //update isCardSaved status upon mounting
  useEffect(() => {
    if (savedCards.some((item) => item.url === card.url)) {
      setIsCardSaved(true)
    } else {
      setIsCardSaved(false)
    }
  }, [savedCards])

  function handleSaveClick(e) {
    if (!isSignedIn) {
      setIsAuthModalOpen(true)
    } else {
      if (!isCardSaved) {
        setIsCardSaved(true)
        setSavedCards([...savedCards, card])
      } else {
        setIsCardSaved(false)
        savedCards = savedCards.filter((item) => {
          console.log(item.url)
          return item.url !== card.url
        })
        setSavedCards([...savedCards])
      }
    }
  }
  function handleDeleteClick() {
    savedCards = savedCards.filter((item) => {
      console.log(item.url)
      return item.url !== card.url
    })
    setSavedCards([...savedCards])
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
          <div class='card__keyword'>{keyword}</div>
          <button
            type='button'
            aria-label='delete'
            className='card__delete-button'
            onClick={handleDeleteClick}
          ></button>
        </>
      )}

      <div
        className={`card__tooltip-container ${
          isTooptipShown && !isSignedIn ? 'card__tooltip-container_shown' : ''
        }`}
      >
        <p className='card__tooltip'> Sign in to save articles</p>
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
