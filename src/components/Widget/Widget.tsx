import { Box, useMediaQuery } from '@mui/material'
const Widget = (): JSX.Element => {
  // Media Queries for Header start
  const hideWidget = useMediaQuery('(max-width: 900px)')

  return (
    <>
      <Box
        sx={{
          width: '10%',
          boxShadow: '0px 5px 10px -7px rgba(0, 0, 0, 0.75)',
          height: '80vh',
          display: hideWidget ? 'none' : 'flex',
          justifyContent: 'flex-end', // Aligns the widget to the right
          alignItems: 'center', // Centers the widget vertically
          position: 'fixed',
          top: '78px',
          right: 0,
          zIndex: 9999
        }}
      ></Box>
    </>
  )
}

export default Widget
