import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FaceIcon from '@mui/icons-material/Face'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Typography, Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Profile = () => {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          maxHeight: '100vh'
        }}
      >
        <Grid xs={12} sm={12} md={9} item sx={{ margin: 'auto' }}>
          <Box
            sx={{
              height: ['250px', '350px', '400px'],
              // width: '100%',
              backgroundColor: 'white',
              display: 'flex',
              borderRadius: '10px',
              backgroundImage: `url('https://source.unsplash.com/gVBIohdCRUQ')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              objectFit: 'contain',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}
          >
            <Button
              sx={{
                width: '200px',
                backgroundColor: '#0006',
                color: 'white',
                margin: '0 2rem 1rem 0'
              }}
            >
              <FaceIcon />{' '}
              <Typography sx={{ margin: '0 0.5rem', fontSize: '13px' }}>
                Create With Avatar
              </Typography>
            </Button>{' '}
            <Button
              sx={{
                width: '200px',
                backgroundColor: '#0006',
                color: 'white',
                margin: '0 2rem 1rem 0'
              }}
            >
              <CameraAltIcon />{' '}
              <Typography sx={{ margin: '0 0.5rem', fontSize: '13px' }}>
                Add Cover Photo
              </Typography>
            </Button>
          </Box>
          <Grid xs={12} sm={12} md={3} item sx={{ margin: 'auto' }}>
            <Avatar
              src='https://source.unsplash.com/bh4LQHcOcxE/600x300'
              sx={{ height: [100, 100, 200, 200] }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Profile
