import React, { useState, useEffect } from 'react'
import List from '@mui/material/List'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import { IconButton } from '@mui/material'
import SearchIcon from '@material-ui/icons/Search'
import { getAvatarImage } from '../../services/Response'
import { getUserRequestRespond } from '../../services/Response'

interface Friend {
  fromUserName: string
  fromAvatar: string
  requestId: number
}
type FriendListProps = {
  friend: Friend
  sx?: React.CSSProperties
}
const FriendList: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null)
  console.log('hii', friend)
  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.fromAvatar)
      setAvatar(avatarUrl)
    }

    getAvatar()
  }, [])

  const handleConfirm = async () => {
    try {
      const response = await getUserRequestRespond(friend.requestId, true)

      console.log('API response:', response)
    } catch (error) {
      console.error('API error:', error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await getUserRequestRespond(friend.requestId, false)

      console.log('Deleted friend with id:', response)
    } catch (error) {
      console.error('API error:', error)
    }
  }

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: '1rem', width: '30%', minWidth: 300 }}>
        <CardHeader
          avatar={<Avatar src={avatar ? avatar : undefined} />}
          title={friend.fromUserName}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              marginTop: '0.8rem',
              alignItems: 'center'
            }}
          >
            <Avatar
              src={avatar ? avatar : undefined}
              sx={{
                border: '2px solid white',
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: '-15px'
              }}
            />{' '}
            <Avatar
              src={avatar ? avatar : undefined}
              sx={{
                border: '2px solid white',
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: '-15px'
              }}
            />{' '}
            <Avatar
              src={avatar ? avatar : undefined}
              sx={{
                border: '2px solid white',
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: '-15px'
              }}
            />
            <Typography sx={{ fontSize: '15px', color: 'gray' }}>
              Friend are Members
            </Typography>
          </Box>
          <Box sx={{ marginTop: '0.8rem' }}>
            <Button
              variant='contained'
              sx={{ borderRadius: '5px' }}
              onClick={() => handleConfirm()}
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
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default FriendList
