import { Avatar, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'

const CreateStory = (): JSX.Element => {
  return (
    <Paper
      sx={{
        height: 180,
        width: 100,
        margin: '10px',
        backgroundImage: `url(  'https://source.unsplash.com/RrUItyCYrVM')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '15px 15px',
        borderRadius: '20px',
        position: 'relative' // Added position relative
      }}
    >
      <AddIcon
        sx={{
          // backgroundColor: "white",
          color: 'white',
          borderRadius: '50%',
          border: '2px solid white',
          padding: '5px'
        }}
      />

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
