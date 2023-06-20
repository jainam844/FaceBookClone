import React, { useState, useContext } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CommentCollapse from './CommentCollapse'
import ShareIcon from '@mui/icons-material/Share'
import UserContext from '../../Context/UserContext'
const Post: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const userData = useContext(UserContext)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      setLiked(true)
      setLikeCount(likeCount + 1)
    }
  }
  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Shared Title',
          text: 'Shared Text',
          url: 'https://example.com'
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.log('Error sharing:', error))
    } else {
      console.log('Sharing not supported')
    }
  }

  return (
    <React.Fragment>
      <Card sx={{ width: '60%', margin: '3rem auto' }}>
        <CardHeader
          avatar={
            <Avatar src='https://source.unsplash.com/bh4LQHcOcxE/600x300'></Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={userData.firstName + ' ' + userData.lastName}
          subheader='Nov 11, 2022'
        />
        <CardMedia
          component='img'
          height='270'
          image='https://source.unsplash.com/random?sea'
          alt='Paella dish'
        />
        <CardContent>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: ['none', 'flex', 'flex'],
              fontWeight: '900',
              fontFamily: '"Lucida Console", Courier, monospace;'
            }}
          >
            A sea is a large body of salty water. There are particular seas and
            the sea. The sea commonly refers to the ocean, the wider body of
            seawater. Particular seas are either marginal seas, second-order
            sections of the oceanic sea (e.g. the Mediterranean Sea), or certain
            large, nearly or completely landlocked (e.g. the Caspian Sea).
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            '& .MuiButtonBase-root': {
              border: 'none',
              '&:hover': {
                backgroundColor: 'transparent'
              },
              '&:active .MuiIconButton-label': {
                backgroundColor: 'transparent'
              },
              '& .MuiIconButton-label': {
                borderRadius: '0',
                color: liked ? 'blue' : 'inherit'
              },
              '&:focus': {
                outline: 'none'
              }
            }
          }}
        >
          <IconButton sx={{ display: 'flex' }} onClick={handleLikeClick}>
            {liked ? <ThumbUpIcon color='primary' /> : <ThumbUpIcon />}
            <Typography
              sx={{ margin: '0 0.3rem', display: ['none', 'flex', 'flex'] }}
            >
              Like
            </Typography>
          </IconButton>
          <IconButton onClick={handleExpandClick}>
            <CommentIcon />
            <Typography
              sx={{ margin: '0 0.3rem', display: ['none', 'flex', 'flex'] }}
            >
              Comment
            </Typography>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton onClick={handleShareClick}>
            <ShareIcon />
            <Typography
              sx={{ margin: '0 0.3rem', display: ['none', 'flex', 'flex'] }}
            >
              Share
            </Typography>
          </IconButton>
        </CardActions>
        <Collapse in={expanded}>
          <CommentCollapse />
        </Collapse>
      </Card>{' '}
      <Card sx={{ width: '60%', margin: '3rem auto' }}>
        <CardHeader
          avatar={
            <Avatar src='https://source.unsplash.com/bh4LQHcOcxE/600x300'></Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={userData.firstName + ' ' + userData.lastName}
          subheader='Nov 11, 2022'
        />
        <CardMedia
          component='img'
          height='270'
          image='https://source.unsplash.com/random?sea'
          alt='Paella dish'
        />
        <CardContent>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: ['none', 'flex', 'flex'],
              fontWeight: '900',
              fontFamily: '"Lucida Console", Courier, monospace;'
            }}
          >
            A sea is a large body of salty water. There are particular seas and
            the sea. The sea commonly refers to the ocean, the wider body of
            seawater. Particular seas are either marginal seas, second-order
            sections of the oceanic sea (e.g. the Mediterranean Sea), or certain
            large, nearly or completely landlocked (e.g. the Caspian Sea).
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            '& .MuiButtonBase-root': {
              border: 'none',
              '&:hover': {
                backgroundColor: 'transparent'
              },
              '&:active .MuiIconButton-label': {
                backgroundColor: 'transparent'
              },
              '& .MuiIconButton-label': {
                borderRadius: '0',
                color: liked ? 'blue' : 'inherit'
              },
              '&:focus': {
                outline: 'none'
              }
            }
          }}
        >
          <IconButton sx={{ display: 'flex' }} onClick={handleLikeClick}>
            {liked ? <ThumbUpIcon color='primary' /> : <ThumbUpIcon />}
            <Typography
              sx={{ margin: '0 0.3rem', display: ['none', 'flex', 'flex'] }}
            >
              Like
            </Typography>
          </IconButton>
          <IconButton onClick={handleExpandClick}>
            <CommentIcon />
            <Typography
              sx={{ margin: '0 0.3rem', display: ['none', 'flex', 'flex'] }}
            >
              Comment
            </Typography>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton onClick={handleShareClick}>
            <ShareIcon />
            <Typography
              sx={{ margin: '0 0.3rem', display: ['none', 'flex', 'flex'] }}
            >
              Share
            </Typography>
          </IconButton>
        </CardActions>
        <Collapse in={expanded}>
          <CommentCollapse />
        </Collapse>
      </Card>
    </React.Fragment>
  )
}

export default Post
