import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import Paper from '@mui/material/Paper'
import CreateStory from './CreateUser'

const stories = [
  {
    backgroundImage:
      'https://source.unsplash.com/XVaXbzQul90',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Jainam Shah'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/ohLyHvxGJYo',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Het Patel'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/67sVPjK6Q7I',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Harsh Prajapati'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/0vuW7F-47Oo',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Aayush Teli'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/bY4cqxp7vos',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Krish Doshi'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/NYrVisodQ2M',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Teerth Gandhi'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/XVaXbzQul90',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Vrushbh Rami'
  },
  {
    backgroundImage:
    'https://source.unsplash.com/XVaXbzQul90',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Parth kaneriya'
  },
 

]

const Story = (): JSX.Element => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid justifyContent='start' container spacing={2}>
        <Grid item xs={12}>
          <Grid
            sx={{ display: 'flex', flexWrap: 'nowrap', overflow: 'hidden' }}
          >
            <Grid item>
              <CreateStory />
            </Grid>
            {stories.map((story, index) => (
              <Grid key={index} item>
                <Paper
                  sx={{
                    height: 180,
                    width: 100,
                    margin: '30px',
                    backgroundImage: `url('${story.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    padding: '15px 15px',
                    borderRadius: '20px',
                    position: 'relative' // Added position relative
                  }}
                >
                  <Avatar
                    src={story.avatar}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 0,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '2px solid #fff'
                    }}
                  ></Avatar>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                      fontWeight: '600',
                      color: '#fff' // Added color for username
                    }}
                  >
                    {story.username}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Story
