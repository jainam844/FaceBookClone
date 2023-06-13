import React, { useState } from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import fbImgLogo from '../assets/fbNameLogo.png'
import { Box, Button, TextField, Link } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(show => !show)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleLogin = async (values: FormikValues) => {
    const { email, password } = values
    const apiUrl = 'https://randomuser.me/api/'
    const url = `${apiUrl}?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`

    try {
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        console.log('Login successful:', data)
      } else {
        console.error('Login failed:', response.statusText)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const handleCreateAccount = () => {
    // Handle create account logic here
  }

  return (
    <React.Fragment>
      <Box sx={{ height: '100vh', bgcolor: '#f0f2f5' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                marginLeft: [0, 0, 30] // Responsive marginLeft
              }}
            >
              <img src={fbImgLogo} alt='' width={400} />
              <Typography sx={{ fontWeight: 'bold' }}>
                Connect with Friends and the world <br /> around you on Facebook
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            justifyContent='center'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              className='loginCard'
              width='300px'
              sx={{
                padding: ['1rem', '1rem', '2rem']
              }}
              bgcolor='#fff'
              borderRadius='8px'
              boxShadow='0px 2px 4px rgba(0, 0, 0, 0.2)'
            >
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  password: Yup.string().required('Required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin(values)
                  setSubmitting(false)
                }}
              >
                <Form>
                  <Field
                    name='email'
                    type='email'
                    as={TextField}
                    label='Email'
                    variant='outlined'
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                  />

                  <ErrorMessage name='email'>
                    {errorMsg => (
                      <Typography
                        variant='body2'
                        color='error'
                        sx={{ marginBottom: '0.2rem', marginTop: '-0.8rem' }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Field
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    as={TextField}
                    label='Password'
                    variant='outlined'
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  <ErrorMessage name='password'>
                    {errorMsg => (
                      <Typography
                        variant='body2'
                        style={{
                          color: 'red',
                          marginBottom: '0.2rem',
                          marginTop: '-0.8rem'
                        }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                  >
                    Log In
                  </Button>
                  <Typography
                    variant='body2'
                    sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                  >
                    <Link
                      href='#'
                      color='primary'
                      sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      Forgot Password?
                    </Link>
                  </Typography>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={handleCreateAccount}
                    fullWidth
                    sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                  >
                    Create New Account
                  </Button>
                </Form>
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Login
