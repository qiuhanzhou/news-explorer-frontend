import './SearchForm.css'

export default function SearchForm({ handleOnSearch }) {
  return (
    <form className='search-form'>
      <input
        type='text'
        className='search-form__input '
        id='search-input'
        name='search'
        placeholder='Enter topic'
      />
      <button className='search-form__button' onClick={handleOnSearch}>
        Search
      </button>
    </form>
  )
}
