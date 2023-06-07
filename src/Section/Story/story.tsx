import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material'
import Paper from '@mui/material/Paper'
import CreateStory from './CreateUser'

const stories = [
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Jainam Shah'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Het Patel'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Harsh Prajapati'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Aayush Teli'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Krish Doshi'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Teerth Gandhi'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Vrushbh Rami'
  },
  {
    backgroundImage:
      'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg',
    avatar:
      'https://pixabay.com/get/gcd65c035a35942a88ba68032ca1c39f1b724fb8f105d5fc1d68b0e11ea39b1df762bf58504dd84abedba37aabee1ef5d82ea5e9ca50d55f14b91a2f814f8194054daf5984d8be08d66d2fdac0f61e831_1280.jpg',
    username: 'Parth kaneriya'
  },
 
  // Add more objects for other stories
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
