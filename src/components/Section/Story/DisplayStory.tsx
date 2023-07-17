import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";

import CreateStory from "./CreateStory";

import { getStoryByUserId } from "../../../services/API/StoryApi";
import React, { useState, useEffect, useRef } from "react";
import UserStory from "./UserStory";
import { IStory } from "../../../Models/Story";

const Story: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [story, setStory] = useState<IStory[]>([]);

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

  const apendNewStory = (storyData: IStory) => {
    setStory((StoriesList) =>
      StoriesList.map((story) => {
        if (story.userId === storyData.userId) {
          return {
            ...story,
            stories: [storyData.stories[0], ...story.stories],
          };
        }
        return story;
      })
    );
  };
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      top: -100,
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      top: 0,
      left: 200,
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
              <CreateStory handlenewStory={apendNewStory} />
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
