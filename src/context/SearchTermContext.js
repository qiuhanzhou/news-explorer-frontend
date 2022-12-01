import { createContext, useState } from 'react'

export const SearchTermContext = createContext({
  searchTerm: '',
  setSearchTerm: () => '',
})

export const SearchTermProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const value = { searchTerm, setSearchTerm }

  return (
    <SearchTermContext.Provider value={value}>
      {children}
    </SearchTermContext.Provider>
  )
}
