import {
  Route,
  Routes,
  Navigate,
  useHistory,
  withRouter,
} from 'react-router-dom'
import { useState } from 'react'
import SavedNews from './SavedNews'
import Header from './Header'
import Main from './Main'
import Navigation from './Navigation'
import ProtectedRoute from './ProtectedRoute'
import SavedNewsHeader from './SavedNewsHeader'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return (
    <div className='App'>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <Navigation loggedIn={isLoggedIn} />
              {/* <Header></Header>
              <Main /> */}
            </>
          }
        />

        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route
            path='saved-news'
            element={
              <>
                <Navigation loggedIn={isLoggedIn} />
                {/* <SavedNewsHeader />
                <SavedNews></SavedNews> */}
              </>
            }
          />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}
