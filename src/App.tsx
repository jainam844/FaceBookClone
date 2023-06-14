import { useState, useEffect } from 'react'
import HomeApp from './Pages/Home'
import LoginPage from './Pages/Login'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
    <>
      {isLoggedIn ? (
        <HomeApp />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  )
}

export default App
