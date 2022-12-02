import { useState } from 'react'
import './SearchForm.css'
import { SearchTermContext } from '../../context/SearchTermContext'
import { useContext } from 'react'

export default function SearchForm({ handleOnSearch }) {
  const { searchTerm, setSearchTerm } = useContext(SearchTermContext)
  const [hasError, setHasError] = useState(false)

  function handleChange(e) {
    setHasError(false)
    setSearchTerm(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (searchTerm === '') {
      setHasError(true)
      setSearchTerm('Please enter a search word')
    } else {
      handleOnSearch(searchTerm)
    }
  }

  return (
    <form className='search-form'>
      <input
        type='text'
        className={`search-form__input ${
          hasError ? 'search-form__input_error' : ''
        }`}
        id='search-input'
        name='search'
        placeholder='Enter topic'
        onChange={handleChange}
        value={searchTerm}
      />

      <button className='search-form__button' onClick={handleSubmit}>
        Search
      </button>
    </form>
  )
}
