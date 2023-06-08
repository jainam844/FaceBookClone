import { Box } from '@mui/material'
const Widget = (): JSX.Element => {
  return (
    <>
      <Box
        sx={{
          width: '18%',
          boxShadow: '0px 5px 10px -7px rgba(0, 0, 0, 0.75)',
          height: '80vh',
          display: ['none', 'none', 'none', 'flex']
        }}
      >hi</Box>
    </>
  )
}
export default Widget
