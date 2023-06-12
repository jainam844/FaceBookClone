import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import fbImgLogo from '../assets/fbNameLogo.png'
// import './Login.css';

function Login (): React.ReactElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    // Implement your login logic here
  }

  return (
    <Box
      className='login'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      //   height="100vh"
      bgcolor='#f0f2f5'
    >
      <Box
        className='logo'
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginBottom='2rem'
      >
        <img
          className='logo-image'
          src={fbImgLogo}
          alt='name logo'
          style={{
            width: '100%',
            height: ' 200px',
            marginBottom: '1rem'
          }}
        />
        <h3>Facebook clone made using Typescript and React.</h3>
      </Box>
      <Box
        className='loginCard'
        width='300px'
        p='2rem'
        bgcolor='#fff'
        borderRadius='8px'
        boxShadow='0px 2px 4px rgba(0, 0, 0, 0.2)'
      >
        <Box display='flex' flexDirection='column' alignItems='center'>
          <span className='title'>Sign In</span>
          <p>Sign in with your Mail ID</p>
          <TextField
            label='Email'
            variant='outlined'
            value={email}
            onChange={handleEmailChange}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={handlePasswordChange}
            style={{ marginBottom: '1rem' }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
