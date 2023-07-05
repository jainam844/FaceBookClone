import React, { useState } from 'react'
import {
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Radio,
  FormControlLabel,
  RadioGroup
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import fbImgLogo from '../assets/BharatBook1.png'
import { Field, Form, Formik, ErrorMessage, FieldProps } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import * as Yup from 'yup'
import { Path } from '../components/Utils/Path'
import MenuItem from '@mui/material/MenuItem'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
  confirmPassword: string
  gender: string
  birthday: string
}

const RegisterPage = () => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthday: ''
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    mobile: Yup.string()
      .required('Required')
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character'
      ),
    confirmPassword: Yup.string()
      .required('Required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      }),
    gender: Yup.string().required('Required')
  })

  const handleSubmit = (values: FormValues) => {
    console.log(values)
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const GenderLabel = () => (
    <TextField
      label='Select Gender'
      disabled
      fullWidth
      margin='normal'
      InputProps={{
        disableUnderline: true
      }}
      InputLabelProps={{
        shrink: true
      }}
    />
  )

  return (
    <React.Fragment>
      <Box sx={{ height: '900px', bgcolor: '#f0f2f5' }}>
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
              alignItems: 'center',
              paddingX: '1rem', // Responsive horizontal padding
              paddingY: ['2rem', '2rem', '1rem'] // Responsive vertical padding
            }}
          >
            <Box
              className='loginCard'
              width='100%' // Adjusted to 100% for responsiveness
              maxWidth='600px' // Added maxWidth to limit width on larger screens
              sx={{
                padding: ['1rem', '1rem', '2rem']
              }}
              bgcolor='#fff'
              borderRadius='8px'
              boxShadow='0px 2px 4px rgba(0, 0, 0, 0.2)'
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name='firstName'
                        label='First Name'
                        fullWidth
                        margin='normal'
                      />
                      <div style={{ color: 'red' }}>
                        <ErrorMessage name='firstName' component='div' />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name='lastName'
                        label='Last Name'
                        fullWidth
                        margin='normal'
                      />
                      <div style={{ color: 'red' }}>
                        <ErrorMessage name='lastName' component='div' />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name='email'
                        label='Email'
                        fullWidth
                        margin='normal'
                      />
                      <div style={{ color: 'red' }}>
                        <ErrorMessage name='email' component='div' />
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name='mobile'
                        label='Mobile Number'
                        fullWidth
                        margin='normal'
                      />
                      <div style={{ color: 'red' }}>
                        <ErrorMessage name='mobile' component='div' />
                      </div>
                    </Grid>
                  </Grid>
                  <Field
                    as={TextField}
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin='normal'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleTogglePasswordVisibility}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <div style={{ color: 'red' }}>
                    <ErrorMessage name='password' component='div' />
                  </div>
                  <Field
                    as={TextField}
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    fullWidth
                    margin='normal'
                  />
                  <div style={{ color: 'red' }}>
                    <ErrorMessage name='confirmPassword' component='div' />
                  </div>
                  <Field
                    as={TextField}
                    name='birthday'
                    type='date'
                    fullWidth
                    margin='normal'
                  />
                  {/* <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name='gender'>
                        {({ field }: FieldProps<any>) => (
                          <div>
                         
                            <Field
                              as={TextField}
                              select
                              name='gender'
                              label='Gender'
                              fullWidth
                              margin='normal'
                            >
                              <MenuItem value='male'>Male</MenuItem>
                              <MenuItem value='female'>Female</MenuItem>
                              <MenuItem value='other'>Other</MenuItem>
                            </Field>
                          </div>
                        )}
                      </Field>
                      <div style={{ color: 'red' }}>
                        <ErrorMessage name='gender' component='div' />
                      </div>
                    </Grid>
                  </Grid> */}
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    size='large'
                    sx={{ marginTop: '1rem' }}
                  >
                    Register
                  </Button>{' '}
                  <Typography
                    sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                  >
                    <Typography
                      color='primary'
                      sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      Forgot Account?
                    </Typography>
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={Path.Login}
                    variant='contained'
                    color='success'
                    fullWidth
                    size='large'
                    sx={{ marginTop: '1rem' }}
                  >
                    Login
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

export default RegisterPage
