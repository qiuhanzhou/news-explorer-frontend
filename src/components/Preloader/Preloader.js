import './Preloader.css'

export default function Preloader() {
  return (
    <div className={`preloader__container`}>
      <div className='preloader__spinner'></div>
      <p className='preloader__text'>Searching for news...</p>
    </div>
  )
}
