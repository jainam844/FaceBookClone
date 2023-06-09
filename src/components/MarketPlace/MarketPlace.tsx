import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import SellingItem from './marketdata'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

const MarketPlace = () => {
  const sellingItems = [
    {
      img: 'https://source.unsplash.com/GRV4ypBKgxE',
      price: '₹340,969',
      description:
        'Audi S5 Sunset',
      location: 'Ahmedabad, GJ'
    },
   
   
    {
      img: 'https://source.unsplash.com/ZwKCWVFdrcs',
      price: '₹1,35,000',
      description: 'iPhone 11 Pro Max in spacegray',
      location: 'Ahmedabad, GJ'
    },
    {
      img: 'https://source.unsplash.com/hGV2TfOh0ns',
      price: '₹40,000',
      description: 'Apple Laptop',
      location: 'Ahmedabad, GJ'
    },
    {
      img: 'https://source.unsplash.com/hbTKIbuMmBI',
      price: '₹8,399',
      description: 'Apple Watch Series 5',
      location: 'Baroda, GJ'
    },
    {
      img: 'https://source.unsplash.com/SxAXphIPWeg',
      price: '₹1,40,000',
      description: '“Leather on concrete”',
      location: 'Ahmedabad, GJ'
    },
    {
      img: 'https://source.unsplash.com/_H0fjILH5Vw',
      price: '₹8,40,000',
      description: 'navy blue backpack',
      location: 'Beijing, China'
    },
    {
      img: 'https://source.unsplash.com/eeTJKC_wz34',
      price: '₹66,959',
      description: 'Harley-Davidson',
      location: 'Ahmedabad, GJ'
    },
    {
      img: 'https://source.unsplash.com/IGfIGP5ONV0',
      price: '₹70,000',
      description: 'Vegan salad bowl',
      location: 'Beijing, China'
    }
  ]
  return (
    <Box
      sx={{
        width: ['100%', '100%', '75%', '75%'],
        maxHeight: '100vh'
      }}
    >
      <Box sx={{ padding: 3, height: '300px' }}>
        <Typography
          sx={{
            margin: '1.5rem 1.5rem 0 1.3rem',
            fontSize: '22px',
            fontWeight:600,
            fontFamily:'initial',
            marginTop:'1rem',
          }}
        >
          {' '}
          Today's picks
        </Typography>
        {/* <Grid xs={12} sx={{ margin: '10px 0' }}> */}
          <Grid container justifyContent='start' spacing={3}>
            {sellingItems.map((item, index) => (
              <SellingItem
                key={index}
                img={item.img}
                price={item.price}
                description={item.description}
                location={item.location}
              />
            ))}
          </Grid>
        {/* </Grid> */}
      </Box>
    </Box>
  )
}

export default MarketPlace
