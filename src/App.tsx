import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Flag from './components/Flag/flag'
import Section from './components/Section/Section'
import Subscription from './components/Subscription/Subscription'
import MarketPlace from './components/MarketPlace/MarketPlace'
import UserFriend from './components/Group/Groups'
import Friend from './components/Friend/Friends'
import LoginPage from './Pages/Login'
import HomeApp from './Pages/Home'
import Profile from './Pages/Profile'
import HomeLayout from './Pages/Layout'
import Notification from './components/Notification/Notification'
import RegisterPage from './Pages/Register'
import { Path } from './components/Utils/Path'

interface ProtectedRouteProps {
  render: () => JSX.Element
}

const ProtectedRoute = ({
  element: Element
}: {
  element: React.ElementType
}) => {
  const isAuthenticated = localStorage.getItem('userInfo') !== null
  return isAuthenticated ? <Element /> : <Navigate to={Path.Login} />
}

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path={Path.Login} element={<LoginPage />} />
          <Route path={Path.Register} element={<RegisterPage />} />
          <Route
            path={Path.Layout}
            element={<ProtectedRoute element={() => <HomeLayout />} />}
          >
            <Route path={Path.Home} element={<HomeApp />}>
              <Route index element={<Section />} />
              <Route index path={Path.Feed} element={<Section />} />
              <Route path={Path.Flag} element={<Flag />} />
              <Route path={Path.Subscription} element={<Subscription />} />
              <Route path={Path.MarketPlace} element={<MarketPlace />} />
              <Route path={Path.UserFriend} element={<UserFriend />} />
              <Route path={Path.Notification} element={<Notification />} />
              <Route path={Path.Friend} element={<Friend />} />
            </Route>
            <Route path={Path.Profile} element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
