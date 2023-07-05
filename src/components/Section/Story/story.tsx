import Grid from '@mui/material/Grid'
import { Avatar, Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import CreateStory from './CreateUser'

const stories = [
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Jainam Shah'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2014/01/30/18/26/skyline-255116_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Het Patel'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2014/09/27/17/30/waterfalls-463925_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Teerth Gandhi'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Harsh Prajapati'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2018/06/04/18/32/rhine-river-3453860_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Aayush Joshi'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Krish Doshi'
  },

  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2016/10/25/12/28/iceland-1768744_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Vrushbh Parmar'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Vrushbh Parmar'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
    username: 'Vrushbh Parmar'
  },
  {
    backgroundImage:
      'https://cdn.pixabay.com/photo/2013/10/09/02/26/lake-192979_1280.jpg',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/15/08/34/woman-3083453_640.jpg',
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
                    position: 'relative'
                  }}
                >
                  <Avatar
                    src={story.avatar}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '3px solid royalblue'
                    }}
                  ></Avatar>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                      fontWeight: '600',
                      color: '#fff'
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
