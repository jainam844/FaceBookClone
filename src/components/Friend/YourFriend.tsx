import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getUserRequest } from '../../services/Response'
import SentReq from './sentreq'
import ReceiveReq from './ReceiveReq'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export enum FilterStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3
}

export enum RequestType {
  Sent = 1,
  Received = 2
}
function CustomTabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function YourFriend () {
  const [value, setValue] = React.useState(0)
  const [friends, setFriends] = useState([])
  const [receivcefriends, setreceiveFriends] = useState([])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          10,
          FilterStatus.ACCEPTED,
          RequestType.Sent
        )

        setFriends(response.records)
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }

    fetchData()
  }, [])

  const SentrequestCount = friends.length
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          10,
          FilterStatus.ACCEPTED,
          RequestType.Received
        )

        setreceiveFriends(response.records)
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }

    fetchData()
  }, [])
  const ReceiverequestCount = receivcefriends.length
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label={`Sent (${SentrequestCount})`} {...a11yProps(0)} />

          <Tab label={`Received (${ReceiverequestCount})`} {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        {friends.map((friend, index) => (
          <React.Fragment key={index}>
            <SentReq friend={friend} sx={{ width: 'calc(33% - 1rem)' }} />
            {index !== friends.length - 1 && (
              <hr style={{ borderTop: '1px solid #b8b8b8' }} />
            )}
          </React.Fragment>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {receivcefriends.length > 0 ? (
          receivcefriends.map((friend, index) => (
            <React.Fragment key={index}>
              <ReceiveReq
                receivcefriends={friend}
                sx={{ width: 'calc(33% - 1rem)' }}
              />
              {index !== receivcefriends.length - 1 && (
                <hr style={{ borderTop: '1px solid #b8b8b8' }} />
              )}
            </React.Fragment>
          ))
        ) : (
          <Typography>No received friends</Typography>
        )}
      </CustomTabPanel>
    </Box>
  )
}
