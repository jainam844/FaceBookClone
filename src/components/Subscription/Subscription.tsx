import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PauseIcon from "@mui/icons-material/Pause";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Button from "@mui/material/Button";

interface CardData {
  id: number;
  image: string;
  title: string;
  artist: string;
  date: string;
  views: string;
  likes: number;
  dislikes: number;
}

export default function MediaControlCard() {
  const theme = useTheme();
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const [cardData, setCardData] = useState<CardData[]>([
    {
      id: 1,
      image: "https://source.unsplash.com/random/?song/",
      title: "Song 1",
      artist: "Artist 1",
      date: "11 Nov 2021",
      views: "33M Views",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/?song/",
      title: "Song 2",
      artist: "Artist 2",
      date: "12 Nov 2021",
      views: "25M Views",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/?song/",
      title: "Song 3",
      artist: "Artist 3",
      date: "13 Nov 2021",
      views: "100M Views",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 4,
      image: "https://source.unsplash.com/random/?song/",
      title: "Song 4",
      artist: "Artist 4",
      date: "13 Jan 2021",
      views: "40M Views",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 5,
      image: "https://source.unsplash.com/random/?song/",
      title: "Song 5",
      artist: "Artist 4",
      date: "13 Jan 2021",
      views: "40M Views",
      likes: 0,
      dislikes: 0,
    },
  ]);

  const handleLike = (cardId: number) => {
    setCardData((prevCardData) => {
      const updatedCardData = prevCardData.map((card) => {
        if (card.id === cardId) {
          return { ...card, likes: card.likes + 1 };
        }
        return card;
      });
      return updatedCardData;
    });
    if (!likedCards.includes(cardId)) {
      setLikedCards((prevLikedCards) => [...prevLikedCards, cardId]);
    }
  };

  const handleDislike = (cardId: number) => {
    setCardData((prevCardData) => {
      const updatedCardData = prevCardData.map((card) => {
        if (card.id === cardId) {
          return { ...card, dislikes: card.dislikes + 1 };
        }
        return card;
      });
      return updatedCardData;
    });
  };

  const displayedCards = 3; // Initial number of cards to display

  return (
    <Box>
      {cardData
        .slice(0, showAll ? cardData.length : displayedCards)
        .map((card) => (
          <Card
            key={card.id}
            sx={{
              display: "flex",
              margin: "2rem 2rem",
              flexDirection: ["column", "row", "row"],
              boxShadow: "3px 3px 3px 3px rgba(3, 3, 3, 0.137)",
              borderRadius: "5px",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                sx={{ width: "100%", height: 200, position: "relative" }}
                onMouseEnter={() => setHoveredImage(card.id)}
                onMouseLeave={() => setHoveredImage(null)}
                image={card.image}
                alt="Live from space album cover"
              />
              {hoveredImage === card.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <PauseIcon sx={{ fontSize: 48, color: "white" }} />
                </Box>
              )}
              <Typography
                color="initial"
                variant="body2"
                sx={{
                  position: "absolute",
                  bottom: 2,
                  right: 10,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "2px 5px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                05:30
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                backgroundColor: "#F8F8F8",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", position: "relative" }}>
                <Typography component="div" variant="h5">
                  {card.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Out Now
                </Typography>
                <Box display="flex">
                  <Typography marginTop={"0.2rem"}>{card.artist}</Typography>
                </Box>
                <Typography sx={{ color: "gray" }}>
                  Published At-{card.date}
                </Typography>{" "}
                <Typography sx={{ color: "gray" }}>{card.views}</Typography>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "2px",
                  }}
                >
                  <MoreHorizIcon sx={{ cursor: "pointer" }} />
                </IconButton>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1em",
                }}
              >
                <IconButton
                  onClick={() => handleLike(card.id)}
                  sx={{
                    padding: "2px",
                    color: likedCards.includes(card.id)
                      ? theme.palette.primary.main
                      : "",
                  }}
                >
                  <ThumbUpIcon sx={{ cursor: "pointer" }} />
                </IconButton>
                <Typography>{card.likes}</Typography>
                <IconButton
                  onClick={() => handleDislike(card.id)}
                  sx={{ padding: "2px", marginLeft: "0.3rem" }}
                >
                  <ThumbDownIcon sx={{ cursor: "pointer" }} />
                </IconButton>
                <Typography>{card.dislikes}</Typography>
              </Box>
            </Box>
          </Card>
        ))}
      {cardData.length > displayedCards && (
        <Button
          onClick={() => setShowAll(!showAll)}
          variant="outlined"
          sx={{ marginLeft: "25rem", alignSelf: "center" }}
        >
          {showAll ? "Hide" : "See All"}
        </Button>
      )}
    </Box>
  );
}
