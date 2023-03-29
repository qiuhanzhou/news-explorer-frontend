import { useEffect, useState, useContext } from 'react'
import { SavedCardsContext } from '../../context/SavedCardsContext'

import { SearchTermContext } from '../../context/SearchTermContext'
import { saveArticles, deleteArticles, getArticles } from '../../utils/MainApi'
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
}) {
  const { savedCards, setSavedCards } = useContext(SavedCardsContext)
  const { searchTerm } = useContext(SearchTermContext)

  const [isTooptipShown, setIsTooptipShown] = useState(false)
  const [isCardSaved, setIsCardSaved] = useState(false)

  //update isCardSaved status upon rerendering for UI
  useEffect(() => {
    if (savedCards && savedCards.some((item) => item.link === card.url)) {
      setIsCardSaved(true)
    } else {
      setIsCardSaved(false)
    }
  }, [savedCards, card])

  function handleSaveClick() {
    console.log(card)
    if (!isSignedIn) {
      setIsAuthModalOpen(true)
    } else {
      if (!isCardSaved) {
        const {
          title,
          content: text,
          publishedAt: date,
          url: link,
          urlToImage: image,
          source,
        } = card

        saveArticles({
          keyword: searchTerm,
          title,
          text,
          date,
          source: source.name,
          link,
          image,
        })
          .then((newArticle) => {
            console.log(newArticle)
            setIsCardSaved(true)
            // setSavedCards([...savedCards, newArticle])
          })
          .catch((err) => {
            console.log(err)
          })

        // getArticles()
        //   .then((data) => {
        //     console.log(data)
        //     setSavedCards(data)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
      } else {
        const currentSavedCard = savedCards.find(
          (item) => item.link === card.url,
        )

        deleteArticles({ articleId: currentSavedCard._id }) //should pass in saved card obj with article ID info
          .then((res) => {
            console.log(res.data)
            setIsCardSaved(false)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  function handleDeleteClick() {
    deleteArticles({ articleId: card._id }) //should pass in saved card obj with article ID info
      .then((res) => {
        console.log(res.data)
        //update savedCards state locally wihout having to call API agian

        setSavedCards(savedCards.filter((item) => item.link !== card.link))
      })
      .catch((err) => {
        console.log(err)
      })
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

      <a
        className='card__link'
        href={isCardTypeSavedNews ? card.link : card.url}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='card__img'
          src={isCardTypeSavedNews ? card.image : card.urlToImage}
          alt='card news headline'
        />
      </a>
      <div className='card__content'>
        <p className='card__date'>
          {isCardTypeSavedNews
            ? convertDate(card.date)
            : convertDate(card.publishedAt)}
        </p>
        <a
          className='card__link'
          href={card.url}
          target='_blank'
          rel='noreferrer'
        >
          <h2 className='card__title'>{card.title}</h2>
        </a>
        <a
          className='card__link'
          href={card.url}
          target='_blank'
          rel='noreferrer'
        >
          <p className='card__text'>
            {isCardTypeSavedNews ? card.text : card.description}
          </p>
        </a>
        <p className='card__source-name'>
          {isCardTypeSavedNews ? card.source : card.source.name}
        </p>
      </div>
    </li>
  )
}
