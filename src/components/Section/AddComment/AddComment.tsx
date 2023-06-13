import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import SendIcon from "@mui/icons-material/Send";
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
        <Typography
          variant='h5'
          component='div'
          sx={{
            color: 'primary.main',
            marginBottom: 2,
            marginTop:'1rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft:'1rem',
            fontSize:'1rem',
          }}
        >
          <Avatar src='https://source.unsplash.com/bh4LQHcOcxE/600x300'></Avatar>
          <span>
            {' '}
            <Box sx={{ marginLeft: '10px', color: 'black' }}>Jainam Shah </Box>
          </span>
        </Typography>
        <CardContent>
          <Box>
            <TextField
              id='title-input'
              label='Enter Title'
              variant='standard'
              sx={{ width: '100%' }}
              value={title}
              onChange={handleTitleChange}
            />
            {error && error.includes('title') && (
              <Typography color='error' variant='caption'>
                Please enter a title
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              id='description-input'
              label='Enter Description Here'
              variant='standard'
              sx={{ width: '100%' ,marginTop:'2rem'}}
              value={description}
              onChange={handleDescriptionChange}
            />
            {error && error.includes('description') && (
              <Typography color='error' variant='caption'>
                Please enter a description
              </Typography>
            )}
          </Box>
          <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{  margin: '0 0.7rem 0.5rem 0',
          marginTop: '2rem',  float: 'right' }}
          onClick={handleSubmit}
        >
          Share Post
        </Button>
        </CardContent>
      </Card>
    </Box>
  )
}