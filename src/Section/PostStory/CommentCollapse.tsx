import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
const CommentCollapase = () => {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography
            variant='h5'
            component='div'
            sx={{
              color: 'primary.main',
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Avatar src="https://source.unsplash.com/bh4LQHcOcxE/600x300"></Avatar>
            <span>
              {' '}
              <Box sx={{ marginLeft: '10px', color: 'black',fontSize:'1rem' }}>
                Jainam Shah{' '}
              </Box>
            </span>
          </Typography>

          <Typography sx={{ fontSize: '0.8em' }}>
          Nov 11, 2022 10:08:30 PM
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
export default CommentCollapase
