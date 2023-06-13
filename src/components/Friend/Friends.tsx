// import * as React from 'react'
// import List from '@mui/material/List'
// import ListItem from '@mui/material/ListItem'
// import Divider from '@mui/material/Divider'
// import ListItemText from '@mui/material/ListItemText'
// import ListItemAvatar from '@mui/material/ListItemAvatar'
// import Avatar from '@mui/material/Avatar'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'
// import { Button } from '@mui/material'
// // import * as React from 'react';
// import { styled } from '@mui/material/styles'

// import IconButton from '@mui/material/IconButton'
// import FormGroup from '@mui/material/FormGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
// import Grid from '@mui/material/Grid'

// import FolderIcon from '@mui/icons-material/Folder'
// import DeleteIcon from '@mui/icons-material/Delete'
// const friendData = [
//   {
//     name: 'Jainam Shah',
//     avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//     memberAvatars: [
//       'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//       'https://source.unsplash.com/cqtw4QCfbQg/600x300',
//       'https://source.unsplash.com/QhR78CbFPoE/600x300'
//     ]
//   },
//   {
//     name: 'Jainam Shah',
//     avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//     memberAvatars: [
//       'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//       'https://source.unsplash.com/cqtw4QCfbQg/600x300',
//       'https://source.unsplash.com/QhR78CbFPoE/600x300'
//     ]
//   },
//   {
//     name: 'Jainam Shah',
//     avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//     memberAvatars: [
//       'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//       'https://source.unsplash.com/cqtw4QCfbQg/600x300',
//       'https://source.unsplash.com/QhR78CbFPoE/600x300'
//     ]
//   },
//   {
//     name: 'Jainam Shah',
//     avatar: 'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//     memberAvatars: [
//       'https://source.unsplash.com/bh4LQHcOcxE/600x300',
//       'https://source.unsplash.com/cqtw4QCfbQg/600x300',
//       'https://source.unsplash.com/QhR78CbFPoE/600x300'
//     ]
//   }
// ]
// function generate (element: React.ReactElement) {
//   return [0].map(value =>
//     React.cloneElement(element, {
//       key: value
//     })
//   )
// }

// const Demo = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper
// }))
// export default function Friend () {
//   const [dense, setDense] = React.useState(false)
//   const [secondary, setSecondary] = React.useState(false)
//   return (
//     <Box
//       sx={{
//         maxHeight: '100vh'
//       }}
//     >
//       <Demo>
//         <List dense={dense}>
//           {generate(
//             <ListItem
//               secondaryAction={
//                 <IconButton edge='end' aria-label='delete'>
//                   <DeleteIcon />
//                 </IconButton>
//               }
//             >
//               <ListItemText primary='Friends' />
//             </ListItem>
//           )}
//         </List>
//       </Demo>
//       <List
//         sx={{
//           width: '100%',
//           maxWidth: 1000,
//           bgcolor: 'background.paper',
//           margin: '2rem 2rem'
//         }}
//       >
//         {friendData.map((friend, index) => (
//           <React.Fragment key={index}>
//             <ListItem alignItems='flex-start'>
//               <ListItemAvatar>
//                 <Avatar src={friend.avatar} sx={{ width: 100, height: 100 }} />
//               </ListItemAvatar>
//               <ListItemText
//                 sx={{ marginLeft: '2rem' }}
//                 primary={friend.name}
//                 secondary={
//                   <div>
//                     <Box sx={{ display: 'flex', marginTop: '0.8rem' }}>
//                       {friend.memberAvatars.map((memberAvatar, i) => (
//                         <Avatar
//                           key={i}
//                           src={memberAvatar}
//                           sx={{
//                             border: '2px solid white',
//                             zIndex: 100 - i * 10,
//                             width: 30,
//                             height: 30,
//                             marginLeft: i !== 0 ? '-15px' : 0
//                           }}
//                         />
//                       ))}
//                       <Typography sx={{ fontSize: '15px', color: 'gray' }}>
//                         {friend.name} and {friend.memberAvatars.length} Friend
//                         are Members
//                       </Typography>
//                     </Box>
//                     <Box sx={{ marginTop: '0.8rem' }}>
//                       <Button variant='contained' sx={{ borderRadius: '5px' }}>
//                         Confirm
//                       </Button>
//                       <Button
//                         variant='outlined'
//                         sx={{
//                           borderRadius: '5px',
//                           marginLeft: '1rem',
//                           borderColor: 'gray',
//                           color: 'white',
//                           backgroundColor: 'gray',
//                           '&:hover': {
//                             backgroundColor: 'darkgray',
//                             borderColor: 'gray' // Specify the hover color here
//                           }
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </Box>
//                   </div>
//                 }
//               />
//             </ListItem>
//             {index < friendData.length - 1 && (
//               <Divider variant='inset' component='li' />
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </Box>
//   )
// }
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
import SearchIcon from '@mui/icons-material/Search'
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
  // Add more friend objects as needed
]

export default function Friend () {
  const subGridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid lightgray'
  }
  const [displayedFriends, setDisplayedFriends] = React.useState(4)

  const handleConfirm = (friendId: number) => {
    // Perform the confirmation action for the friend with the given id
    console.log('Confirmed friend with id:', friendId)
  }

  const handleDelete = (friendId: number) => {
    // Perform the deletion action for the friend with the given id
    console.log('Deleted friend with id:', friendId)
  }
  return (
    <Box
      sx={{
        maxHeight: '100vh'
      }}
    >
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
      <List
        sx={{
          width: '100%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          margin: '2rem 2rem'
        }}
      >
        {friendData.slice(0, displayedFriends).map((friend, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar src={friend.avatar} sx={{ width: 100, height: 100 }} />
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
  )
}
