import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

export default function BasicCard () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (title.trim() === '') {
      setError('Please enter a title')
      return
    }

    if (description.trim() === '') {
      setError('Please enter a description')
      return
    }

    console.log('Title:', title)
    console.log('Description:', description)
    setError('')
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setError('') // Reset the error message when the user modifies the title field
  }
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value)
    setError('') // Reset the error message when the user modifies the description field
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
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            sx={{
              color: 'primary.main',
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
                      <Avatar src='https://cdn.pixabay.com/photo/2023/04/04/10/21/fashion-7898973__340.jpg'></Avatar>
            <span>
              {' '}
              <Box sx={{ marginLeft: '10px', color: 'black' }}>
                Jainam Shah{' '}
              </Box>
            </span>
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
          }}
        >
          <label htmlFor='title'>Title</label>
          <Box
            sx={{
              marginBottom: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <input
              id='title'
              type='text'
              placeholder='Title'
              value={title}
              onChange={handleTitleChange}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent'
              }}
            />
          </Box>
          {error && error.includes('title') && (
            <Typography color='error' variant='caption'>
              Please enter a title
            </Typography>
          )}
          <label htmlFor='description'> Description</label>
          <Box
            sx={{
              marginBottom: 1,
            
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <textarea
              id='description'
              placeholder='Description'
              value={description}
              onChange={handleDescriptionChange}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                backgroundColor: 'transparent'
              }}
            />
          </Box>
          {error && error.includes('description') && (
            <Typography color='error' variant='caption'>
              Please enter a description
            </Typography>
          )}
          <Button
            size='small'
            onClick={handleSubmit}
            sx={{ marginLeft: 'auto' }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
