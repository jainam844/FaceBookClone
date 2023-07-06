import React, { useState, useEffect } from 'react'
import List from '@mui/material/List'
import { getAvatarImage, getUserMutual } from '../../services/Response'
import { getUserRequestRespond } from '../../services/Response'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { UserData } from '../../Models/User'
interface Friend {
  toUserName: string
  toAvatar: string
  requestId: number
  toUserId: number
}
type FriendListProps = {
  friend: Friend
  sx?: React.CSSProperties
}
const SentReq: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [friends, setFriends] = useState([])
  const [avatar, setAvatar] = useState<string | null>(null)
  console.log('hii', friend)

 useEffect(() => {
  const getAvatar = async () => {
    const avatarUrl = await getAvatarImage(friend.toAvatar)
    setAvatar(avatarUrl)
  }
  getAvatar()
}, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMutual(1, 10, friend.toUserId)
        const avatarUrl = await getAvatarImage(friend.toAvatar)
        console.log(friend.toUserId)
        setFriends(response.toUserId)
        setAvatar(avatarUrl)
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }
    fetchData()
  }, [])

  

  return (
    <React.Fragment>
      <List>
        <Grid
          container
          spacing={2}
          columns={16}
          sx={{ margin: '20px 0', padding: ['10px', 0] }}
        >
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{ width: [70, 80], height: [70, 80] }}
              src={avatar ? avatar : friend.toUserName}
            ></Avatar>
          </Grid>
          <Grid
            item
            xs={false}
            sm={9}
            md={9}
            lg={5}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Typography
              color='initial'
              sx={{ fontSize: [14, 18], fontWeight: 700, marginTop: 0.5 }}
            >
              {friend.toUserName}
              <Box sx={{ display: 'flex', marginTop: '0.3rem' }}>
                <Avatar
                  src='https://source.unsplash.com/bh4LQHcOcxE/600x300'
                  sx={{ border: '2px solid white', zIndex: '100' }}
                />
             
                <Typography
                  sx={{
                    fontSize: '15px',
                    color: 'gray',
                    marginTop: '0.5rem'
                  }}
                >
                  Jainam and 10 Friend are Members
                </Typography>
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </List>
    </React.Fragment>
  )
}

export default SentReq
