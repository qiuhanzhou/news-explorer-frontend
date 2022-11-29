import './SavedNews.css'
import NewsCard from '../NewsCard/NewsCard'
export default function SavedNews({
  savedCards,
  keyword,
  isSignedIn,
  setIsAuthModalOpen,
  setSavedCards,
}) {
  return (
    <section className='saved-news'>
      <ul className='card-list'>
        {savedCards.map((card) => (
          <NewsCard
            card={card}
            isSignedIn={isSignedIn}
            setIsAuthModalOpen={setIsAuthModalOpen}
            keyword={keyword}
            isCardTypeSavedNews={true}
            savedCards={savedCards}
            setSavedCards={setSavedCards}
          />
        ))}
      </ul>
    </section>
  )
}
