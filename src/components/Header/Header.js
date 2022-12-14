import './Header.css'
import SearchForm from '../SearchForm/SearchForm'

export default function Header({ brightTheme, handleOnSearch }) {
  return (
    <header className={`header ${brightTheme ? 'header_bright-theme' : ''}`}>
      <h1 className='header__title'>What's going on in the world?</h1>
      <p className='header__subtitle'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm handleOnSearch={handleOnSearch} />
    </header>
  )
}
