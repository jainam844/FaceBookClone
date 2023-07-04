import { useEffect, useState, useContext } from 'react'
import { getUserNotification } from '../../services/Response'
import UserContext from '../Context/UserContext'
import NotificationItem from './NotificationDat'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'

interface Notification extends NotificationData {
  byUser?: string
}

interface NotificationData {
  notificationId: number
  activityType: number
  activityId: number
  activityTypeName: string
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const { userData } = useContext(UserContext)
  const subGridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid black'
  }

  const mainGridStyle = {
    // background: "white",
    borderRadius: 2,
    padding: 2,
    marginBottom: 3
  }
  const mainGridStyle1 = {
    backgroundColor: 'rgba(255, 192, 203, 0.5)',
    borderRadius: '2px',
    padding: '2px',
    marginBottom: '3px'
  }

  useEffect(() => {
    const getAllNotification = async () => {
      try {
        const notificationData = await getUserNotification(1, 30)
        
        console.log(notificationData)
        setNotifications(notificationData.records)
      } catch (e) {
        console.log(e)
      }
    }
    if (userData.userId) {
      getAllNotification()
    }
  }, [userData.userId])

  return (
    <>
      <Box
        sx={{
          background: ['white', 'transparent'],
          borderRadius: [0, 3],
          padding: '20px 0'
        }}
      >
        <Grid sx={mainGridStyle}>
          <Grid sx={subGridStyle}>
            <Typography
              variant='h4'
              color='initial'
              sx={{ marginLeft: '1rem' }}
            >
              Notifications
            </Typography>
            <IconButton style={{ display: 'flex', alignItems: 'center' }}>
              <Typography style={{ marginRight: '5px' }}>ClearAll</Typography>
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Grid>
        {notifications.map(notification => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid
              container
              key={notification.notificationId}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                gap: '12px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#F0F8FF'
                },
                width: '600px'
              }}
            >
              <NotificationItem notification={notification} />
            </Grid>
          </div>
        ))}
      </Grid>
    </>
  )
}

export default Notification
