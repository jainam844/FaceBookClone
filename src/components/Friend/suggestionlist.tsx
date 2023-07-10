import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  getAvatarImage,
  getUserMutual,
  getUserRequestSend
} from '../../services/Response'
import defaultimg from '../../assets/images.jpg'
interface Friend {
  firstName: string
  lastName: string
  avatar: string
  requestId: number
  userId: number
  avatarUrl: string
  toUserId: number
  fromUserId: number
}
type FriendListProps = {
  friend: Friend
  sx?: React.CSSProperties
}
const Suggestionlist: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null)

  const [friends, setFriends] = useState<Friend[]>([])

  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.avatar)
      if(avatarUrl){
      setAvatar(avatarUrl)
      }
    }
    getAvatar()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMutual(1, 100, friend.userId)

        if (Array.isArray(response.records)) {
          const data = response.records

          const updatedData = await Promise.all(
            data.map(async (friend: Friend) => {
              let avatarUrl = null
              if (friend.avatar) {
                avatarUrl = await getAvatarImage(friend.avatar)
              }
              return { ...friend, avatarUrl }
            })
          )

     
          setFriends(updatedData)
          // setAvatar(avatarUrl);
        }
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }

    fetchData()
  }, [])

  const handleConfirm = async () => {
    try {
      const response = await getUserRequestSend(friend.userId)
      console.log('API response:')
    } catch (error) {
      console.error('API error:', error)
    }
  }

  const handleDelete = async () => {
    try {
      console.log('Deleted friend with id:')
    } catch (error) {
      console.error('API error:', error)
    }
  }

  return (
    <React.Fragment>
      <Card
        sx={{
          background: '#f9f9f9',
          borderRadius: '10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: 345,
          margin: '1rem',
          padding: '1rem'
        }}
      >
        <CardMedia
          component='img'
          alt='green iguana'
          height='220'
          image={avatar !== null ? avatar : defaultimg}
          sx={{ borderRadius: '10px' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h6'
            component='div'
            sx={{ color: 'black', fontWeight: 'bold' }}
          >
            {friend.firstName} {friend.lastName}
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.8rem",
            }}
          >
            <Avatar
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />
    
            <Typography
              sx={{ fontSize: "15px", color: "gray", marginLeft: "0.5rem" }}
            >
              Friends are Members
            </Typography>
          </Box> */}
          {friends.length > 0 ? (
            <Box sx={{ display: 'flex', marginTop: '0.3rem' }}>
              {friends.slice(0, 3).map((friend, index) => (
                <Avatar
                  key={index}
                  src={friend.avatarUrl}
                  sx={{
                    border: '2px solid white',
                    zIndex: 100 - index,
                    marginLeft: `${index * -12}px`,
                    position: 'relative'
                  }}
                />
              ))}

              {friends.length > 0 && (
                <Typography
                  sx={{
                    fontSize: ['12px', '15px'],
                    color: 'gray',
                    marginTop: '0.5rem'
                  }}
                >
                  {`${friends[0].firstName} ${friends[0].lastName}`}
                  {friends.length > 1
                    ? ` and ${friends.length - 1} other mutual friend${
                        friends.length !== 2 ? 's' : ''
                      }`
                    : ' is a mutual friend'}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: ['12px', '15px'],
                color: 'gray',
                marginTop: '0.5rem'
              }}
            >
              No mutual friends
            </Typography>
          )}
        </CardContent>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '0.8rem',
            marginBottom: '1rem'
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant='contained'
                sx={{
                  borderRadius: '5px',
                  width: '100%',
                  background: 'linear-gradient(to right, #6C63FF, #5850EC)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(to right, #5850EC, #6C63FF)'
                  }
                }}
                onClick={() => handleConfirm()}
              >
                Add Friend
                <AddIcon sx={{ marginLeft: '1rem' }} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                sx={{
                  borderRadius: '5px',
                  borderColor: '#DDDDDD',
                  color: '#202020',
                  width: '100%',
                  '&:hover': {
                    borderColor: '#999999',
                    color: '#554242'
                  }
                }}
                onClick={() => handleDelete()}
              >
                Remove
                <DeleteIcon sx={{ marginLeft: '2rem' }} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </React.Fragment>
  )
}
export default Suggestionlist
