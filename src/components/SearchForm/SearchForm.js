import { useState } from 'react'
import './SearchForm.css'
import { SearchTermContext } from '../../context/SearchTermContext'
import { useContext } from 'react'

export default function SearchForm({ handleOnSearch }) {
  const { searchTerm, setSearchTerm } = useContext(SearchTermContext)

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(searchTerm)
    handleOnSearch(searchTerm)
  }

  return (
    <form className='search-form'>
      <input
        type='text'
        className='search-form__input '
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
