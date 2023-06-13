import Grid from '@mui/material/Grid'
import { Avatar, Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import CreateStory from './CreateUser'

const stories = [
  {
    backgroundImage: 'https://source.unsplash.com/XVaXbzQul90',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Jainam Shah'
  },
  {
    backgroundImage: 'https://source.unsplash.com/ohLyHvxGJYo',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Het Patel'
  },
  {
    backgroundImage: 'https://source.unsplash.com/67sVPjK6Q7I',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Harsh Prajapati'
  },
  {
    backgroundImage: 'https://source.unsplash.com/0vuW7F-47Oo',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Aayush Teli'
  },
  {
    backgroundImage: 'https://source.unsplash.com/bY4cqxp7vos',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Krish Doshi'
  },
  {
    backgroundImage: 'https://source.unsplash.com/NYrVisodQ2M',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Teerth Gandhi'
  },
  {
    backgroundImage: 'https://source.unsplash.com/XVaXbzQul90',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Vrushbh Rami'
  },
  {
    backgroundImage: 'https://source.unsplash.com/XVaXbzQul90',
    avatar: 'https://source.unsplash.com/NYrVisodQ2M',
    username: 'Parth kaneriya'
  }
]

const Story = (): JSX.Element => {
  return (
    <Box sx={{}}>
      <Grid justifyContent='start' container spacing={0.5}>
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
                    margin: '10px',
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
