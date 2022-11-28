import './SavedNewsHeader.css'

export default function SavedNewsHeader({ userName, count }) {
  return (
    <div className='saved-news-header'>
      <p className='saved-news-header__intro'></p>
      <h1 className='saved-news-header__title'>{`${userName}, you have ${count} saved articles`}</h1>
      <p class='saved-news-header__keywords'>
        By keywords:&nbsp;
        <span class='saved-news-header__keywords-bold'></span>
      </p>
    </div>
  )
}
