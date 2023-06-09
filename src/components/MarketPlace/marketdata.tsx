import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

interface SellingItemProps {
  img: string
  price: string
  description: string
  location: string
}

const SellingItem: React.FC<SellingItemProps> = ({
  img,
  price,
  description,
  location
}) => {
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        xl={3}
        sx={{
          cursor: 'pointer',
          marginBottom: '1rem',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
      >
        <Card sx={{ height: '100%', boxShadow: 'none' }}>
          <CardMedia
            sx={{
              height: [300, 250, 220, 220, 200],
              width: '100%',
              borderRadius: '5px'
            }}
            image={img}
          />
          <CardContent sx={{ paddingTop: 0 }}>
            <Typography
              sx={{
                margin: '0.5rem 0 0 0.2rem',
                fontSize: ' 20px',
                fontWeight: '500'
              }}
            >
              {price}
            </Typography>
            <Typography sx={{ fontSize: '13px' }}>{description}</Typography>
            <Typography sx={{ fontSize: '12px', color: 'gray' }}>
              {location}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </React.Fragment>
  )
}

export default SellingItem
