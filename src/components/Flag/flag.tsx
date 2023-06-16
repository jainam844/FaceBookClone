import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'

import RecentPages from "./Recentt";
// import SuggestedPages from "../Friends/SuggestedPages";
const friendData = [
  {
    id: 1,
    name: 'Jainam Shah',
    avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
    memberAvatars: [
      'https://source.unsplash.com/bh4LQHcOcxE/600x300',
      'https://source.unsplash.com/cqtw4QCfbQg/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  },
  {
    id: 1,
    name: 'Jainam Shah',
    avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
    memberAvatars: [
      'https://source.unsplash.com/bh4LQHcOcxE/600x300',
      'https://source.unsplash.com/cqtw4QCfbQg/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  },
  {
    id: 1,
    name: 'Jainam Shah',
    avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
    memberAvatars: [
      'https://source.unsplash.com/bh4LQHcOcxE/600x300',
      'https://source.unsplash.com/cqtw4QCfbQg/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  },
  {
    id: 1,
    name: 'Jainam Shah',
    avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
    memberAvatars: [
      'https://source.unsplash.com/bh4LQHcOcxE/600x300',
      'https://source.unsplash.com/cqtw4QCfbQg/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  },
  {
    id: 1,
    name: 'Jainam Shah',
    avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
    memberAvatars: [
      'https://source.unsplash.com/bh4LQHcOcxE/600x300',
      'https://source.unsplash.com/cqtw4QCfbQg/600x300',
      'https://source.unsplash.com/QhR78CbFPoE/600x300'
    ]
  }
]

export default function Flag () {
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

  const [displayedFriends, setDisplayedFriends] = React.useState(4)

  const handleConfirm = (friendId: number) => {
    console.log('Confirmed friend with id:', friendId)
  }

  const handleDelete = (friendId: number) => {
    console.log('Deleted friend with id:', friendId)
  }
  return (
    <Box
      sx={{
        // maxHeight: '100vh'  ,
        paddingTop: [0, 2],
        margin: ['0', '0 30px']
      }}
    >
      {' '}
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
              Pages
            </Typography>
            <IconButton>
              <Avatar>
                <SearchIcon />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid>
            <Button sx={buttonStyle}>
              <AddCircleRoundedIcon sx={{ marginRight: 0.5 }} />
              <Typography sx={{ textTransform: 'none' }}>Creates</Typography>
            </Button>
            <Button sx={buttonStyle}>
              <ThumbUpOutlinedIcon sx={{ marginRight: 0.5 }} />
              <Typography sx={{ textTransform: 'none' }}>
                Liked Pages
              </Typography>
            </Button>{' '}
            <Button sx={buttonStyle}>
              <GroupAddRoundedIcon sx={{ marginRight: 0.5 }} />
              <Typography sx={{ textTransform: 'none' }}>Invites</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid sx={mainGridStyle}>
          <Grid sx={subGridStyle}>
            <Typography
              variant="h6"
              color="initial"
              sx={{ fontWeight: 700, paddingBottom: 1 }}
            >
              Recently Visited Pages
            </Typography>
            <Typography sx={{ color: "#1877f2", cursor: "pointer" }}>
              See all
            </Typography>
          </Grid>
          <RecentPages />
        </Grid>
       
      </Box>
    </Box>
  )
}
