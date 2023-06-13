import Box from '@mui/material/Box'
import Story from './Story/story'
import BasicCard from './AddComment/AddComment'
import Post from './PostStory/PostStory'

const Section = (): JSX.Element => {
  return (
    <Box sx={{ maxHeight: '100vh',    flex: "1", }}>
      {/* <Box sx={{ width: ['100%', '100%', '85%', '70%'] }}> */} <Story />
      <BasicCard />
      <Post />
      {/* </Box> */}
    </Box>
  )
}

export default Section
