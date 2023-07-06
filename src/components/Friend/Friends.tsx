import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'
import SearchIcon from '@material-ui/icons/Search'
import FriendList from './FriendList'
import { getUserRequest } from '../../services/Response'
import { Path } from '../Utils/Path'

const Friend = () => {
  const subGridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid lightgray'
  }

  const mainGridStyle = {
    background: 'white',
    borderRadius: 2,
    padding: 2,
    marginBottom: 3
  }

  const buttonStyle = {
    background: '#e5e5e5',
    color: 'black',
    borderRadius: 5,
    '&:hover': {
      background: '#c9c7c7'
    },
    margin: 2,
    padding: '5px 10px'
  }

  return (
    <Box
      sx={{
        // maxHeight: '100vh'  ,
        paddingTop: [0, 2],
        margin: ['0', '0 30px']
      }}
    >
      <Box
        sx={{
          background: ['white', 'transparent'],
          borderRadius: [0, 3],
          padding: '20px 0'
        }}
      >
        <Grid sx={mainGridStyle}>
          <Grid sx={subGridStyle}>
            <Typography variant='h5' color='initial'>
              Friends
            </Typography>
            <IconButton>
              <Avatar>
                <SearchIcon />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid>
            <Button sx={buttonStyle} component={RouterLink} to={Path.Friend}>
              <Typography sx={{ textTransform: 'none' }}>Friend</Typography>
            </Button>{' '}
            <Button
              sx={buttonStyle}
              component={RouterLink}
              to={Path.Suggestion}
            >
              <Typography sx={{ textTransform: 'none' }}>
                Suggestions
              </Typography>
            </Button>
            <Button
              sx={buttonStyle}
              component={RouterLink}
              to={Path.YourFriend}
            >
              <Typography sx={{ textTransform: 'none' }}>
                Your Friends
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 2rem',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Outlet />{' '}
        </Box>
      </Box>
    </Box>
  )
}

export default Friend
