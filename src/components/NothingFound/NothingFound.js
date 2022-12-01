import './NothingFound.css'
import nothingFoundIcon from '../../images/not-found_v1.svg'

export default function NothingFound() {
  return (
    <div className={`nothing-found `}>
      <img
        src={nothingFoundIcon}
        alt='Nothing found icon'
        className='nothing-found__icon'
      />
      <h3 className='nothing-found__title'> Nothing found</h3>
      <p className='nothing-found__text'>
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  )
}
