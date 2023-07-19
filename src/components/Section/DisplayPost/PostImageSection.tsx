import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface PostImageSectionProps {
  postImage: string[];
  currentImageIndex: number;
  handleImageLoad: (index: number) => void;
  handleImageClick: (index: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  maxSteps: number;
  themeDirection: "rtl" | "ltr";
  openImageIndex: number | null;
  handleCloseImage: () => void;
}

const PostImageSection: React.FC<PostImageSectionProps> = ({
  postImage,
  currentImageIndex,
  handleImageLoad,
  handleImageClick,
  handleNext,
  handleBack,
  activeStep,
  maxSteps,
  themeDirection,
  openImageIndex,
  handleCloseImage,
}) => {
  return (
    <>
      <CardMedia
        component="img"
        height="300"
        image={postImage[currentImageIndex]}
        alt="Post Image"
        onClick={() => handleImageClick(currentImageIndex)}
        onLoad={() => handleImageLoad(currentImageIndex)}
      />
      {postImage.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        ></Box>
      )}
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {themeDirection === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {themeDirection === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      {openImageIndex !== null && (
        <Dialog open={openImageIndex !== null} onClose={handleCloseImage}>
          <DialogContent>
            <img
              src={postImage[openImageIndex]}
              alt="Full Post Image"
              style={{ width: "100%" }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PostImageSection;
