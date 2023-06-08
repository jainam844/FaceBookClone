import Box from '@mui/material/Box'
import Story from './Story/story'
import BasicCard from './AddComment/comment'
import Post from './PostStory/PostStory'

const Section = (): JSX.Element => {
  return (
    <div>
      {/* <Box sx={{ width: ['100%', '100%', '85%', '70%'] }}> */}
        {' '}
        <Story />
        <BasicCard />
        <Post />
      {/* </Box> */}
    </div>
  )
}

export default Section
