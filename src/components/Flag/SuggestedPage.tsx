import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const items = [
  {
    id: 1,
    avatarSrc: 'https://source.unsplash.com/QhR78CbFPoE/600x300',
    title: 'Food Factory',
    author: 'John',
    likes: [
      'https://source.unsplash.com/QhR78CbFPoE/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  },
  {
    id: 2,
    avatarSrc: 'https://source.unsplash.com/QhR78CbFPoE/600x300',
    title: 'Another Item',
    author: 'Jane',
    likes: [
      'https://source.unsplash.com/QhR78CbFPoE/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  },
  {
    id: 2,
    avatarSrc: 'https://source.unsplash.com/QhR78CbFPoE/600x300',
    title: 'Another Item',
    author: 'Jane',
    likes: [
      'https://source.unsplash.com/QhR78CbFPoE/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  }
]
const subGridStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid lightgray'
}

const SuggestPage: React.FC = () => {
  const [showAllCards, setShowAllCards] = useState(false)

  const handleShowCards = () => {
    setShowAllCards(!showAllCards)
  }

  return (
    <React.Fragment>
      <Grid sx={subGridStyle}>
        <Typography
          variant='h6'
          color='initial'
          sx={{ fontWeight: 700, paddingBottom: 1 }}
        >
          Suggested Pages
        </Typography>
        <Typography
          onClick={handleShowCards}
          sx={{ color: '#1877f2', cursor: 'pointer' }}
        >
          {showAllCards ? 'Hide' : 'See all'}
        </Typography>
      </Grid>
      {items.map((item, index) => (
        <Grid
          container
          spacing={2}
          columns={16}
          key={item.id}
          style={{ display: showAllCards || index < 1 ? 'flex' : 'none' }}
          sx={{ margin: '20px 0', padding: ['10px', 0] }}
        >
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={item.avatarSrc}
              sx={{ width: [70, 80], height: [70, 80] }}
            ></Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography
              color='initial'
              sx={{ fontSize: [14, 16], fontWeight: 700, marginTop: 0.5 }}
            >
              {item.title}
            </Typography>
            <Typography
              color='initial'
              sx={{ fontSize: [13, 15], marginTop: 0.5 }}
            >
              {item.author}
            </Typography>
            <Typography
              color='initial'
              sx={{
                fontSize: [12, 13],
                display: 'flex',
                alignItems: 'center',
                marginTop: 0.5
              }}
            >
              <Box sx={{ display: 'flex', marginRight: 0.5 }}>
                {item.likes.map((like, index) => (
                  <Avatar src={like} key={index} />
                ))}
              </Box>
              {`${item.likes.length} others like this`}
            </Typography>

            <Grid
              container
              sx={{ margin: '20px 0', justifyContent: 'space-between' }}
            >
              <Grid item xs={5.5} sm={5.5}>
                <Button
                  sx={{
                    width: '100%',
                    background: '#e8f4ff',
                    '&:hover': {
                      background: '#e8f4ff'
                    },
                    height: 45
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: 'none',
                      color: '#1877f2',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <ThumbUpIcon sx={{ marginRight: 0.5 }} />
                    Like
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button
                  sx={{
                    width: '100%',
                    background: '#e5e5e5',
                    '&:hover': {
                      background: '#e5e5e5'
                    },
                    height: 45
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: 'none',
                      color: 'black',
                      fontWeight: 700
                    }}
                  >
                    Remove
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  )
}

export default SuggestPage
