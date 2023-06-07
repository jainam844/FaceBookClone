import { Avatar, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@mui/material/IconButton'

const CreateStory = (): JSX.Element => {
  return (
    <Paper
      sx={{
        height: 180,
        width: 100,
        margin: '30px',
        backgroundImage: `url( 'https://pixabay.com/get/g4f26ad328c4026fb21a43254e4278b8f03b64d1aba9f6a0d1b56edf78476e2f2ee1d385eda9dd1d1bcd0b81917b8117837231c0f57166c0db3efdf804ac1c8ebb90b76998a6c7c938bb8db3c50361aa3_1280.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '15px 15px',
        borderRadius: '20px',
        position: 'relative' // Added position relative
      }}
    >
      {/* <IconButton size='large' edge='end'> */}
        <Avatar
  
          sx={{
            position: 'absolute',
            top: 10,
            left: 0,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid #fff'
          }}
        ></Avatar>
        {/* <AddIcon style={{ color:'white' }} /> */}
      {/* </IconButton> */}
      <Typography
        variant='subtitle2'
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          fontWeight: '600',
          color: '#ffffff' // Added color for username
        }}
      >
      Add to Story
      </Typography>
    </Paper>
  )
}

export default CreateStory
