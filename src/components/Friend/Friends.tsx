import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'
import SearchIcon from '@material-ui/icons/Search'
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

export default function Friend () {
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
        margin: ["0", "0 30px"],
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
              Friends
            </Typography>
            <IconButton>
              <Avatar>
                <SearchIcon />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid>
            <Button sx={buttonStyle}>
              <Typography sx={{ textTransform: 'none' }}>
                Suggestions
              </Typography>
            </Button>
            <Button sx={buttonStyle}>
              <Typography sx={{ textTransform: 'none' }}>
                Your Friends
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <List
          sx={{
            width: '100%',
            maxWidth: 1000,
            bgcolor: 'background.paper',
            margin: '2rem 5rem'
          }}
        >
          {friendData.slice(0, displayedFriends).map((friend, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    src={friend.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ marginLeft: '2rem' }}
                  primary={friend.name}
                  secondary={
                    <div>
                      <Box sx={{ display: 'flex', marginTop: '0.8rem' }}>
                        {friend.memberAvatars.map((memberAvatar, i) => (
                          <Avatar
                            key={i}
                            src={memberAvatar}
                            sx={{
                              border: '2px solid white',
                              zIndex: 100 - i * 10,
                              width: 30,
                              height: 30,
                              marginLeft: i !== 0 ? '-15px' : 0
                            }}
                          />
                        ))}
                        <Typography sx={{ fontSize: '15px', color: 'gray' }}>
                          {friend.name} and {friend.memberAvatars.length} Friend
                          are Members
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: '0.8rem' }}>
                        <Button
                          variant='contained'
                          sx={{ borderRadius: '5px' }}
                          onClick={() => handleConfirm(friend.id)}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant='outlined'
                          sx={{
                            borderRadius: '5px',
                            marginLeft: '1rem',
                            borderColor: 'gray',
                            color: 'white',
                            backgroundColor: 'gray',
                            '&:hover': {
                              backgroundColor: 'darkgray',
                              borderColor: 'gray'
                            }
                          }}
                          onClick={() => handleDelete(friend.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </div>
                  }
                />
              </ListItem>
              {index < friendData.length - 1 && (
                <Divider variant='inset' component='li' />
              )}
            </React.Fragment>
          ))}
          {displayedFriends < friendData.length && (
            <Button
              variant='outlined'
              sx={{
                borderRadius: '9999px',
                marginTop: '1rem',
                textTransform: 'none',
                color: 'gray',
                borderColor: 'gray',
                '&:hover': {
                  borderColor: 'gray',
                  backgroundColor: 'transparent'
                },
                '& .MuiButton-endIcon': {
                  marginLeft: '4px'
                }
              }}
              endIcon={<ExpandMoreIcon />}
              onClick={() => setDisplayedFriends(friendData.length)}
            >
              See All
            </Button>
          )}
        </List>
      </Box>
    </Box>
  )
}
