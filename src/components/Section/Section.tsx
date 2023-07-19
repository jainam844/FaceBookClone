import { useState, useEffect, useRef, useCallback } from "react";
import { getPostByUserId } from "../../services/API/SocialActivityApi";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Story from "./Story/DisplayStory";
import Post from "./DisplayPost/DisplayPost";
import AddDescription from "./AddPost/AddPost";
import { Ipost, PostClass } from "../../Models/Post";
const Section = (): JSX.Element => {
  const [postData, setPostData] = useState<Ipost[]>([]);
  const [newPost, setNewPost] = useState<Ipost>(new PostClass());
  const onChangePost = (post: Ipost) => {
    setNewPost(post);
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
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
        const response = await getPostByUserId(pageNumber, 100, false);

        if (Array.isArray(response.records)) {
          const data: Ipost[] = response.records;
          const updatedData = await Promise.all(
            data.map(async (post) => {
              return { ...post };
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

    fetchPosts();
  }, [pageNumber]);

  const removeDeletedPost = (postId: number) => {
    setPostData((prevData) =>
      prevData.filter((post) => post.postId !== postId)
    );
  };

  useEffect(() => {
    if (newPost.postId) {
      setPostData((prevData) => [newPost, ...prevData]);
    }
  }, [newPost]);

  return (
    <Box sx={{ flex: "1", width: "100%" }}>
      <Story />
      <AddDescription handleNewPost={onChangePost} />
      {postData.map((post, index) => {
        if (postData.length === index + 1) {
          return (
            <Post
              key={post.postId}
              post={post}
              reference={lastPostRef}
              onClearPost={removeDeletedPost}
            />
          );
        } else {
          return (
            <Post
              key={post.postId}
              post={post}
              onClearPost={removeDeletedPost}
            />
          );
        }
      })}
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
    </Box>
  );
};

export default Section;
