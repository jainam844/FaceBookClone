import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import FriendList from './FriendList'
import { getUserRequest } from '../../services/Response'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export enum FilterStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3
}

export enum RequestType {
  Sent = 1,
  Received = 2
}

export const FriendBox = () => {
  const [friends, setFriends] = useState([])

  const subGridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid lightgray'
  }

  const mainGridStyle = {
    width: '67vw',
    borderRadius: 2,
    padding: 2,
    marginBottom: 3
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          10,
          FilterStatus.PENDING,
          RequestType.Received
        )
        // console.log(response.records)
        setFriends(response.records)
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }

    fetchData()
  }, [])

  const requestCount = friends.length

  return (
    <>
      <Box
        sx={{
          paddingTop: 0,
          marginTop: 0,
          margin: '0 30px'
        }}
      >
        <Grid sx={mainGridStyle}>
          <Grid sx={subGridStyle}>
            <Typography variant='h5' color='initial'>
              Friend Request ({requestCount}){' '}
            </Typography>
          </Grid>
        </Grid>
        {friends.map(friend => (
          <FriendList friend={friend} sx={{ width: 'calc(33% - 1rem)' }} />
        ))}
      </Box>
    </>
  )
}
