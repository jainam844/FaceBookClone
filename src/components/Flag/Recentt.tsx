import React from 'react'
import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import Typography from '@mui/material/Typography'

const RecentPages: React.FC = () => {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        columns={16}
        sx={{ margin: '20px 0', padding: ['10px', 0] }}
      >
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src='https://source.unsplash.com/bh4LQHcOcxE/600x300'
            sx={{ width: [70, 80], height: [70, 80] }}
          ></Avatar>
        </Grid>
        <Grid item xs={9}>
          <Typography
            color='initial'
            sx={{ fontSize: [14, 16], fontWeight: 700, marginTop: 0.5 }}
          >
            Food Factory
          </Typography>
          <Typography
            color='initial'
            sx={{ fontSize: [13, 15], marginTop: 0.5 }}
          >
            John
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
              <Avatar src='https://source.unsplash.com/cqtw4QCfbQg/600x300' />
              <Avatar src='https://source.unsplash.com/QhR78CbFPoE/600x300' />
            </Box>
            ABC, XYZ and 32 others like this
          </Typography>

          <Grid
            container
            sx={{ margin: '20px 0', justifyContent: 'space-between' }}
          >
            <Grid item xs={7.6} sm={9.6}>
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
                    fontWeight: 700
                  }}
                >
                  Call Now
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={3} sm={2}>
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
                <Typography sx={{ textTransform: 'none', color: 'black' }}>
                  <ThumbUpOffAltIcon />
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default RecentPages
