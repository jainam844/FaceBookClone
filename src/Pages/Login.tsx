import React, { useState } from 'react'
import { Typography, Box, Button, TextField } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import fbImgLogo from '../assets/BharatBook1.png'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { ForUserLogin } from '../services/Response'
import jwtDecode from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Path } from '../components/Utils/Path'

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

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

    try {
      const loginSuccessful = await ForUserLogin({ email, password })

      console.log('Login response:', loginSuccessful)

      if (loginSuccessful) {
        const decodedToken: { UserId: string } = jwtDecode(loginSuccessful)
        console.log('Decoded Token:', decodedToken)

        const userId = decodedToken.UserId
        console.log('User ID:', userId)

        const userInfo = {
          email: email,
          token: loginSuccessful,
          userId: userId
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo))

        navigate(Path.Home)
        toast.success('Login successful!')
      } else {
        toast.error('Login failed. Please try again.')
      }
    } catch (error) {
      console.log(error)
    }
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
                marginLeft: [0, 0, 0] // Responsive marginLeft
              }}
            >
              <img
                src={fbImgLogo}
                alt=''
                width={400}
                style={{ mixBlendMode: 'multiply' }}
              />

              <Typography sx={{ fontWeight: 'bold', marginTop: '1rem' }}>
                Connect with Friends and the world <br /> around you on
                BharatBook
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
              width='350px'
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
                    sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                  >
                    <Typography
                      color='primary'
                      sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      Forgot Password?
                    </Typography>
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={Path.Register}
                    variant='contained'
                    color='success'
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
      <ToastContainer />;
    </React.Fragment>
  )
}

export default LoginPage
