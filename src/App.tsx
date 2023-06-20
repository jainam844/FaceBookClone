import React, { useEffect, useState, useContext } from 'react'
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
import { getUserData } from './services/Response'
import UserContext from './components/Context/UserContext'

const ProtectedRoute = ({
  element: Element
}: {
  element: React.ElementType
}) => {
  const isAuthenticated = localStorage.getItem('userInfo') !== null
  return isAuthenticated ? <Element /> : <Navigate to='/' />
}

const App = () => {
  const [userData, setUserData] = useState('')
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userInfo') ?? '')
        const userId = userData.userId
        const token = userData.token
        const data = await getUserData(parseInt(userId), token)
        console.log(data)
        setUserData(data)
      } catch (error) {
        console.log('Error fetching user data:', error)
      }
    }
    fetchUserData()
  }, [])

  return (
    <React.Fragment>
      <UserContext.Provider value={userData}>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<ProtectedRoute element={HomeApp} />}>
              <Route index element={<Section />} />
              <Route index path='/home/feed' element={<Section />} />
              <Route path='/home/flag' element={<Flag />} />
              <Route path='/home/subscription' element={<Subscription />} />
              <Route path='/home/marketplace' element={<MarketPlace />} />
              <Route path='/home/userfriend' element={<UserFriend />} />
              <Route path='/home/friend' element={<Friend />} />
            </Route>
            <Route path='/home/profile' element={<Profile />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </React.Fragment>
  )
}

export default App
