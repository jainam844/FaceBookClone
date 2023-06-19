import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'

const validateDescription = (value: string) => {
  let error
  if (!value) {
    error = 'Description is required'
  }
  console.log('https://c457-14-99-103-154.ngrok-free.app/User/UserbyId?id=1')
  return error
}

export default function BasicCard () {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    setFile(uploadedFile || null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card sx={{ width: 800, minHeight: 300 }}>
        <Typography
          variant='h5'
          component='div'
          sx={{
            color: 'primary.main',
            marginBottom: 2,
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1rem',
            fontSize: '1rem'
          }}
        >
          <Avatar src='https://source.unsplash.com/bh4LQHcOcxE/600x300'></Avatar>
          <span>
            {' '}
            <Box sx={{ marginLeft: '10px', color: 'black' }}>Jainam Shah </Box>
          </span>
        </Typography>
        <Typography
          sx={{
            padding: '0.5rem 0.2rem',
            marginLeft: '3.5rem',
            marginTop: '-2rem',
            display: ['none', 'flex', 'flex']
          }}
        >
          (What's on your mind?)
        </Typography>
        <CardContent>
          <Formik
            initialValues={{
              description: ''
            }}
            onSubmit={(values, { resetForm }) => {
              console.log('Description:', values.description)
              console.log('File:', file)
              resetForm() // Reset the form values
            }}
          >
            {({ handleChange, errors }) => (
              <Form>
                <Box>
                  <Field
                    as={TextField}
                    id='description-input'
                    name='description'
                    label='Enter Description Here'
                    variant='standard'
                    sx={{ width: '100%' }}
                    validate={validateDescription}
                  />
                  {errors.description && (
                    <div style={{ color: 'red' }}>{errors.description}</div>
                  )}
                </Box>
                <Box
                  sx={{
                    // width: '100%',
                    marginTop: '1.3rem',
                    // border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <label htmlFor='file-input' style={{ flexGrow: 1 }}>
                    <input
                      type='file'
                      id='file-input'
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <Button variant='outlined' component='span'>
                      Upload Image


                    </Button>
                    {file && (
                      <span style={{ marginLeft: '0.5rem' }}>{file.name}</span>
                    )}

                
                    
                  </label>


                </Box>

                <Button
                  type='submit'
                  variant='contained'
                  endIcon={<SendIcon />}
                  sx={{
                    margin: '0 0.7rem 0.5rem 0',
                    marginTop: '2rem',
                    float: 'right'
                  }}
                >
                  Share Post
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  )
}
