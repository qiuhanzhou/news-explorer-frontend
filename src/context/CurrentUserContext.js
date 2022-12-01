import { createContext, useState } from 'react'

export const CurrentUserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
})

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const value = { currentUser, setCurrentUser }

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}
