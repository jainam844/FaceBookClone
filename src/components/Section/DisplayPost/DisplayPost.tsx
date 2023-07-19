import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import {
  PostLike,
  getPostDelete,
  getLikesByPost,
  addComment,
  getCommentByPostId,
} from "../../../services/API/SocialActivityApi";
import { getAvatarImage, getPostImage } from "../../../services/API/AccountApi";
import { IComment } from "../../../Models/Comment";
import { Ipost } from "../../../Models/Post";
import UserContext from "../../Context/UserContext";
import PostCardHeader from "./PostCardHeader";
import PostImageSection from "./PostImageSection";
import PostCardContent from "./PostCardContent";
import PostCardActions from "./PostCardAction";

interface PostProps {
  post: Ipost;
  reference?: (node: HTMLDivElement) => void;
  onClearPost: (postId: number) => void;
}
const Post: React.FC<PostProps> = ({ post, reference, onClearPost }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [likeCount, setLikeCount] = useState("");
  const { userData } = useContext(UserContext);
  const [postImage, setPostImage] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsList, setCommentsList] = useState<IComment[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async (postId: number) => {
    try {
      const responseData = await getPostDelete(postId);
      onClearPost(postId);
      console.log("Your Post deleted:", responseData);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const totalImages = postImage.length;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = postImage.length;
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const lastCommentRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingComments) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreComments) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingComments, hasMoreComments]
  );

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = (await getAvatarImage(post.avatar)) ?? "";
        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar image:", error);
      }
    };

    fetchAvatar();
  }, [post.avatar]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikesByPost(post.postId);
        setLikeCount(likesData);
        const loginUserLiked = likesData.some(
          (like: { userId: number }) => like.userId === userData.userId
        );
        setIsLiked(loginUserLiked);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikes();
  }, [isLiked]);

  useEffect(() => {
    const fetchPostImages = async () => {
      if (post.path) {
        const postImagePromises = post.path.map(async (imageName) => {
          const image = await getPostImage(imageName);
          return image;
        });

        try {
          const imageData = await Promise.all(postImagePromises);
          setPostImage(imageData);
          setLoadedImages(Array(imageData.length).fill(1));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchPostImages();
  }, [post.path]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentByPostId(
          pageNumber,
          1,
          post.postId
        );
        const data = commentsData.record.responseModel;
        if (Array.isArray(data)) {
          setCommentsList((prevComments) => [...prevComments, ...data]);
          setHasMoreComments(data.length > 0);
          setLoadingComments(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [post.postId, pageNumber]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = async () => {
    if (isLiked) {
      const isLike = false;
      const response = await PostLike(userData.userId, post.postId, isLike);
      setIsLiked(response);
      console.log("unliked");
    } else {
      const isLike = true;
      const response = await PostLike(userData.userId, post.postId, isLike);
      console.log("successfully liked");
      setIsLiked(response);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shared Title",
          text: "Shared Text",
          url: "https://example.com",
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Sharing not supported");
    }
  };

  const handleImageLoad = (index: number) => {
    const updatedLoadedImages = [...loadedImages];
    updatedLoadedImages[index] = 1;
    setLoadedImages(updatedLoadedImages);
  };

  const handleImageClick = (index: number) => {
    setOpenImageIndex(index);
  };

  const handleCloseImage = () => {
    setOpenImageIndex(null);
  };

  const handleClearComment = (commentId: number) => {
    console.log("hello boys");
    setCommentsList((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  const handlePost = async () => {
    if (newComment.trim() !== "") {
      try {
        const newCommentData = await addComment(
          userData.userId,
          post.postId,
          newComment
        );
        setCommentsList([...commentsList, newCommentData]);
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };
  const isDeleteIconVisible = post.userId === userData.userId;
  
  return (
    <React.Fragment>
      {!isRemoved && (
        <Card
          ref={reference}
          sx={{
            width: "65%",
            margin: "3rem auto",
            "@media (max-width: 900px)": { width: "95%" },
            "@media (min-width: 901px) and (max-width: 1100px)": {
              width: "95%",
            },
          }}
        >
          <PostCardHeader
            userName={post.userName}
            avatarUrl={avatarUrl}
            createdAt={post.createdAt}
            isDeleteIconVisible={isDeleteIconVisible}
            onMenuClick={handleMenuClick}
            onDeleteClick={() => setIsRemoved(true)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            onDelete={() => handleDelete(post.postId)}
          />
          <PostImageSection
            postImage={postImage}
            currentImageIndex={currentImageIndex}
            handleImageLoad={handleImageLoad}
            handleImageClick={handleImageClick}
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            maxSteps={maxSteps}
            themeDirection={theme.direction}
            openImageIndex={openImageIndex}
            handleCloseImage={handleCloseImage}
          />
          <PostCardContent
            text={post.text}
            likeCount={likeCount.length}
            commentsCount={commentsList.length}
          />
          <PostCardActions
            isLiked={isLiked}
            handleLikeClick={handleLikeClick}
            handleExpandClick={handleExpandClick}
            handleShareClick={handleShareClick}
            expanded={expanded}
            commentsList={commentsList}
            lastCommentRef={lastCommentRef}
            newComment={newComment}
            handleCommentChange={handleCommentChange}
            handlePost={handlePost}
            handleClearComment={handleClearComment}
          />
        </Card>
      )}
    </React.Fragment>
  );
};
export default Post;
