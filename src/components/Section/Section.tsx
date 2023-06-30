import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { getAvatarImage, getPostByUserId } from "../../services/Response";
import Box from "@mui/material/Box";
import Story from "./Story/story";
import Post from "./DisplayPost/DisplayPost";
import UserContext from "../Context/UserContext";
import BasicCard from "./AddDescription/AddDescription";
import AddDescription from "./AddDescription/AddDescription";

interface PostData {
  userName?: string;
  postId: number;
  text?: string;
  path?: string[];
  avatar: string;
  createdAt: string;
  avatarUrl: string;
}

const Section = (): JSX.Element => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const [newPost, setNewPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const { userData } = useContext(UserContext);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await getPostByUserId(pageNumber, 1, false);
        // console.log(pageNumber);
        if (Array.isArray(response.records)) {
          const data: PostData[] = response.records;
          const updatedData = await Promise.all(
            data.map(async (post) => {
              const avatarUrl = await getAvatarImage(post.avatar);
              return { ...post, avatarUrl };
            })
          );

          setPostData((prevData) => [...prevData, ...updatedData]);

          setHasMore(response.records.length > 0);
          setLoading(false);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };

    if (userData) {
      fetchPosts();
    }
  }, [pageNumber, userData]);

  useEffect(() => {
    if (newPost) {
      setPostData((prevData) => [newPost, ...prevData]);
    }
  }, [newPost]);

  return (
    <Box sx={{ flex: "1", width: "100%" }}>
      <Story />
      <AddDescription setNewPost={setNewPost} />
      {postData.map((post, index) => {
        if (postData.length === index + 1) {
          return <Post key={post.postId} post={post} reference={lastPostRef} />;
        } else {
          return <Post key={post.postId} post={post} />;
        }
      })}

      {loading && <p>Loading...</p>}
    </Box>
  );
};

export default Section;
