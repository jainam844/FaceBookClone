import React, { useState, useContext, useEffect } from "react";
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
import {
  addPost,
} from "../../../services/Response";

interface FormValues {
  description: string;
}

interface PostData {
  userName?: string;
  postId: number;
  text?: string;
  path?: string[];
  avatar: string;
  createdAt: string;
  avatarUrl: string;
}

const validateDescription = (value: string) => {
  let error: string | undefined;
  if (!value) {
    error = "Description is required";
  }
  return error;
};

const BasicCard = ({
  setNewPost,
}: {
  setNewPost: React.Dispatch<React.SetStateAction<PostData | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { userData, userimageUrl } = useContext(UserContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile || null);
  };

  const handleSubmit = async (values: FormValues) => {
    const { description } = values;

    try {
      const formData = new FormData();
      formData.append("UserId", userData.userId);
      formData.append("Description", description);
      if (file) {
        formData.append("Images", file);
      }

      await addPost(formData);

      const newPostData: PostData = {
        userName: userData.firstName + " " + userData.lastName,
        postId: -1, 
        text: description,
        path: [], 
        avatar: userData.avatar,
        createdAt: new Date().toISOString(),
        avatarUrl: userData.avatarUrl,
      };

      setNewPost(newPostData);

      console.log("Post added successfully!");
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
            {({ handleChange, errors }) => (
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
                      style={{ display: "none" }}
                    />
                    <Button variant="outlined" component="span">
                      Upload Image
                    </Button>
                    {file && (
                      <span style={{ marginLeft: "0.5rem" }}>{file.name}</span>
                    )}
                  </label>
                </Box>

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
export default BasicCard;
