import Grid from '@mui/material/Grid'
import { Avatar, Box, Typography, Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import CreateStory from './CreateUser'
import { getAvatarImage, getPostImage } from '../../../services/Response' // Import the getAvatarImage function
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
  useCallback
} from 'react'
interface StoryProps {
  story: {
    backgroundImage: string
    avatar: string
    userName: string
    avatarUrl: string
    path: string[]
  }
}

const Story: React.FC<StoryProps> = ({ story }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [postImage, setPostImage] = useState<string[]>([])
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = (await getAvatarImage(story.avatar)) ?? ''
        setAvatarUrl(avatarUrl)
      } catch (error) {
        console.error('Error fetching avatar image:', error)
      }
    }

    fetchAvatar()
  }, [story.avatar])

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const image = (await getPostImage(story.path)) ?? ''
        setPostImage(image)
      } catch (error) {
        console.error('Error fetching post image:', error)
      }
    }
  
    fetchAvatar()
  }, [story.path])
  
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      top: -100,
      left: -200, // adjust the scroll amount as per your needs
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      top: 0,
      left: 200, // adjust the scroll amount as per your needs
      behavior: 'smooth'
    })
  }

  return (
    <Box sx={{}}>
      <Grid justifyContent='start' container spacing={0.5}>
        <Grid item xs={12}>
          <Grid
            sx={{ display: 'flex', flexWrap: 'nowrap', overflow: 'hidden' }}
            ref={scrollContainerRef}
          >
            <Grid item>
              <CreateStory />
            </Grid>

            <Grid item>
              <Paper
                sx={{
                  height: 180,
                  width: 100,
                  margin: '10px',
                  backgroundImage: postImage[0],
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  padding: '15px 15px',
                  borderRadius: '20px',
                  position: 'relative'
                }}
              >
                <Avatar
                  src={avatarUrl} // Use the fetched avatarUrl as the src
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '3px solid royalblue'
                  }}
                ></Avatar>
                <Typography
                  variant='subtitle2'
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    fontWeight: '600',
                    color: '#fc1a1a'
                  }}
                >
                  {story.userName}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px'
            }}
          >
            <Button
              onClick={scrollLeft}
              sx={{ color: 'black', fontSize: '2rem' }}
            >
              ←
            </Button>
            <Button
              onClick={scrollRight}
              sx={{ color: 'black', fontSize: '2rem' }}
            >
              →
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Story
