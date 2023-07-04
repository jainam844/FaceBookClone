import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {
  getCommentNotification,
  getLikeNotification,
  getNewPostNotification,
  getAvatarImage,
  getCommentByPostId,
  getPostImage,
  getUserNotification,
  getUserReqNotification
} from '../../services/Response'
import Avatar from '@mui/material/Avatar'

interface NotificationItemProps {
  notification: Notification
}

enum NotificationType {
  Comment = 'CommentOnPost',
  PostLike = 'PostLike',
  NewPost = 'AddNewPost',
  Acceptreq = 'AcceptRequest'
}

interface Notification extends NotificationData {
  byUser?: string
}

interface NotificationData {
  notificationId: number
  activityType: number
  activityId: number
  activityTypeName: string
}
const defaultAvatar = '/path/to/default/avatar.png'
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification
}) => {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [postImage, setPostImage] = useState<string[]>([])
  useEffect(() => {
    const getUserdata = async () => {
      switch (notification.activityTypeName) {
        case NotificationType.Comment:
          try {
            const getNotifData = await getCommentNotification(
              notification.activityId
            )

            const postData = await getNewPostNotification(getNotifData.postId)

            const ImageData = await getPostImage(postData.path)

            setPostImage([ImageData])

            setUsername(getNotifData.userName)

            const avatarUrl = await getAvatarImage(getNotifData.avatar)

            setAvatar(avatarUrl)
          } catch (error) {
            console.log(error)
          }
          break

        case NotificationType.PostLike:
          try {
            const getLikeNotif = await getLikeNotification(
              notification.activityId
            )

            const postData = await getNewPostNotification(getLikeNotif.postId)

            const ImageData = await getPostImage(postData.path)
            setPostImage([ImageData])

            setUsername(getLikeNotif.userName)
            const avatarUrl = await getAvatarImage(getLikeNotif.avatar)
            setAvatar(avatarUrl)
          } catch (error) {
            console.log(error)
          }
          break

        case NotificationType.NewPost:
          try {
            const getNewPostNotif = await getNewPostNotification(
              notification.activityId
            )

            const postData = await getNewPostNotification(
              getNewPostNotif.postId
            )

            const ImageData = await getPostImage(postData.path)
            setPostImage([ImageData])

            setUsername(getNewPostNotif.userName)
            const avatarUrl = await getAvatarImage(getNewPostNotif.avatar)
            setAvatar(avatarUrl)
          } catch (error) {
            console.log(error)
          }
          break

        case NotificationType.Acceptreq:
          try {
            const getUserReqNotifi = await getUserReqNotification(
              notification.activityId
            )
            console.log(getUserReqNotifi)

            const postData = await getNewPostNotification(
              getUserReqNotifi.postId
            )

            const ImageData = await getPostImage(postData.path)
            setPostImage([ImageData])

            setUsername(getUserReqNotifi.userName)
            const avatarUrl = await getAvatarImage(getUserReqNotifi.avatar)
            setAvatar(avatarUrl)
          } catch (error) {
            console.log(error)
          }
          break
        default:
          break
      }
    }
    getUserdata()
  }, [notification.activityType, notification.activityId])

  if (notification.activityTypeName === NotificationType.Comment) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: '10px' }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: '10px' }} />
        )}
        <p>{username} Commented on Your Post</p>
        {postImage.length > 0 && (
          <Avatar src={postImage[0]} sx={{ marginLeft: '50px' }} />
        )}
      </Box>
    )
  } else if (notification.activityTypeName === NotificationType.PostLike) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: '10px' }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: '10px' }} />
        )}
        <p>{username} Liked Your Post</p>
        {postImage.length > 0 && (
          <Avatar src={postImage[0]} sx={{ marginLeft: '50px' }} />
        )}
      </Box>
    )
  } else if (notification.activityTypeName === NotificationType.NewPost) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: '10px' }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: '10px' }} />
        )}
        <p>{username} Added a New Post</p>
        {postImage.length > 0 && (
          <Avatar src={postImage[0]} sx={{ marginLeft: '50px' }} />
        )}
      </Box>
    )
  } else if (notification.activityTypeName === NotificationType.Acceptreq) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: '10px' }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: '10px' }} />
        )}
        <p>{username} Accepted Your Request</p>
        {postImage.length > 0 && (
          <Avatar src={postImage[0]} sx={{ marginLeft: '50px' }} />
        )}
      </Box>
    )
  } else {
    return null
  }
}
export default NotificationItem
