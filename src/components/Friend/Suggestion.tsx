import React, { useEffect, useState } from "react";
import { getUserSuggestion } from "../../services/API/UserDataApi";

import Suggestionlist from "./suggestionlist";
import Grid from "@mui/material/Grid";
const Suggestion = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserSuggestion(1, 100);

        setFriends(response.records);
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
              sx={{ width: "calc(33% - 1rem)" }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default Suggestion;
