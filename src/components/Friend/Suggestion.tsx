import { useEffect, useState, useRef, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserSuggestion } from "../../services/API/UserDataApi";
import Suggestionlist from "./suggestionlist";
import Grid from "@mui/material/Grid";
const Suggestion = () => {
  const [friends, setFriends] = useState([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastSuggestionListRef = useCallback(
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
    const fetchData = async () => {
      try {
        const response = await getUserSuggestion(pageNumber, 100);

        setFriends(response.records);
        setHasMore(response.records.length > 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container spacing={2} justifyContent="start">
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} md={12} lg={4}>
            <Suggestionlist
              friend={friend}
              reference={lastSuggestionListRef}
              sx={{ width: "calc(33% - 1rem)" }}
            />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
    </>
  );
};
export default Suggestion;
