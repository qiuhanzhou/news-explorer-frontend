export default function NewsCard({ card }) {
  function handleSaveClick() {}
  return (
    <li className='card' id={card._id}>
      <button
        type='button'
        aria-label='save'
        className='card__save-button'
        onClick={handleSaveClick}
      ></button>
      <dialog className='card__tooltip'>Sign in to save articles</dialog>

      <a href={card.newsLink} target='_blank'>
        <img src={card.imgUrl} alt='card news headline image' />
      </a>
      <div className='card__content'>
        <p className='card__date'>{card.date}</p>
        <h2 className='card__title'>{card.title}</h2>
        <p className='card__text'>{card.title}</p>
        <p className='card__source'>{card.source}</p>
      </div>
    </li>
  )
}
