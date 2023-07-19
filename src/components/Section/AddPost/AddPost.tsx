import React, { useState, useContext, useRef } from "react";
import { Formik, Field, Form } from "formik";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import UserContext from "../../Context/UserContext";
import { addPost } from "../../../services/API/SocialActivityApi";
import { Ipost } from "../../../Models/Post";

interface FormValues {
  description: string;
}

const validateDescription = (value: string) => {
  let error: string | undefined;
  if (!value) {
    error = "Description is required";
  }
  return error;
};

const AddDescription = ({
  handleNewPost,
}: {
  handleNewPost: (newPostData: Ipost) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSizeError, setImageSizeError] = useState(false);
  const { userData, userimageUrl } = useContext(UserContext);
  const [files, setFiles] = useState<File[]>([]);
  const [imageSizeExceeded, setImageSizeExceeded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = event.target.files;
    const newFiles: File[] = [];
    let sizeExceeded = false;

    if (uploadedFiles) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const uploadedFile = uploadedFiles[i];

        if (uploadedFile.size <= 2 * 1024 * 1024) {
          const compressedImage = await compressImage(uploadedFile);
          newFiles.push(compressedImage);
        } else {
          sizeExceeded = true;
        }
      }

      setFiles(newFiles);
      setImageSizeError(false);
      setImageSizeExceeded(sizeExceeded);
    }
  };

  const compressImage = (file: File) => {
    return new Promise<File>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob as Blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            file.type,
            0.7
          );
        };
      };
    });
  };

  const handleSubmit = async (values: FormValues) => {
    const { description } = values;

    if (files.length === 0) {
      setImageSizeError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Description", description);

      for (let i = 0; i < files.length; i++) {
        formData.append("Images", files[i]);
      }

      const response = await addPost(formData);
      handleNewPost(response);
      console.log("Post added successfully!");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImageSizeError(false);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        margin: "1rem",
      }}
    >
      <Card sx={{ width: 800, minHeight: 300 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "primary.main",
            marginBottom: 2,
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            marginLeft: "1rem",
            fontSize: "1rem",
          }}
        >
          <Avatar src={userimageUrl} />

          <span>
            {" "}
            <Box sx={{ marginLeft: "10px", color: "black" }}>
              {userData.firstName + " " + userData.lastName}{" "}
            </Box>
            <Typography
              sx={{
                padding: "0.5rem 0.3rem",
                marginLeft: "6rem",
                marginTop: "-2rem",
                color: "black",
                display: ["none", "flex", "flex"],
              }}
            >
              (What's on your mind?)
            </Typography>
          </span>
        </Typography>

        <CardContent>
          <Formik
            initialValues={{
              description: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form>
                <Box>
                  <Field
                    as={TextField}
                    id="description-input"
                    name="description"
                    label="Enter Description Here"
                    variant="standard"
                    sx={{ width: "100%" }}
                    validate={validateDescription}
                  />
                  {errors.description && (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  )}
                </Box>

                <Box
                  sx={{
                    marginTop: "1.3rem",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="file-input" style={{ flexGrow: 1 }}>
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      multiple
                      accept="image/*"
                      onInput={(event) => {
                        const target = event.target as HTMLInputElement;
                        const uploadedFiles = target.files;
                        if (uploadedFiles) {
                          let sizeExceeded = false;
                          for (let i = 0; i < uploadedFiles.length; i++) {
                            if (uploadedFiles[i].size > 2 * 1024 * 1024) {
                              sizeExceeded = true;
                              break;
                            }
                          }
                          setImageSizeError(sizeExceeded);
                        }
                      }}
                    />

                    <Button variant="outlined" component="span">
                      Upload Image(s)
                    </Button>
                    {files.length > 0 && (
                      <span style={{ marginLeft: "0.5rem" }}>
                        {files.map((file) => file.name).join(", ")}
                      </span>
                    )}
                  </label>
                </Box>

                {imageSizeError && (
                  <div style={{ color: "red", marginTop: "0.5rem" }}>
                    Image is required. Please select at least one image.
                  </div>
                )}

                {imageSizeExceeded && (
                  <div style={{ color: "red", marginTop: "0.5rem" }}>
                    Image size limit exceeded (max: 2MB).
                  </div>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{
                    margin: "0 0.7rem 0.5rem 0",
                    marginTop: "2rem",
                    float: "right",
                  }}
                >
                  Share Post
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddDescription;
