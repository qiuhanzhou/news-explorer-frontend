import { createContext, useState } from 'react'

export const SavedCardsContext = createContext({
  savedCards: [],
  setSavedCards: () => [],
})

export const SavedCardsProvider = ({ children }) => {
  const [savedCards, setSavedCards] = useState([])
  const value = { savedCards, setSavedCards }

  return (
    <SavedCardsContext.Provider value={value}>
      {children}
    </SavedCardsContext.Provider>
  )
}
