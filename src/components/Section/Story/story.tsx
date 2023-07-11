import Grid from "@mui/material/Grid";
import { Avatar, Box, Typography, Button } from "@mui/material";

import CreateStory from "./CreateUser";
import {
  getAvatarImage,
  getPostImage,
  getStoryByUserId,
  getStoryImage,
} from "../../../services/Response"; // Import the getAvatarImage function
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import UserStory from "./UserStory";

const Story: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [story, setStory] = useState<[]>([]);
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const pageNumber = 1;
        const pageSize = 100;

        const data = await getStoryByUserId(pageNumber, pageSize);
        setStory(data.records);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStory();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      top: -100,
      left: -200, // adjust the scroll amount as per your needs
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      top: 0,
      left: 200, // adjust the scroll amount as per your needs
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{}}>
      <Grid justifyContent="start" container spacing={0.5}>
        <Grid item xs={12}>
          <Grid
            sx={{ display: "flex", flexWrap: "nowrap", overflow: "hidden" }}
            ref={scrollContainerRef}
          >
            <Grid item>
              <CreateStory />
            </Grid>

            {story.map((item, index) => (
              <UserStory key={index} story={item} />
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <Button
              onClick={scrollLeft}
              sx={{ color: "black", fontSize: "2rem" }}
            >
              ←
            </Button>
            <Button
              onClick={scrollRight}
              sx={{ color: "black", fontSize: "2rem" }}
            >
              →
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Story;
