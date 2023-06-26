import React, { useState, useContext } from "react";
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
import { addPost } from "../../../services/Response";

interface FormValues {
  description: string;
}

const validateDescription = (value: string) => {
  let error: string | undefined;
  if (!value) {
    error = "Description is required";
  }
  // console.log("https://c457-14-99-103-154.ngrok-free.app/User/UserbyId?id=1");
  return error;
};

export default function BasicCard() {
  const [file, setFile] = useState<File | null>(null);
  const { userData } = useContext(UserContext);

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
          <Avatar src={userData.avatar}></Avatar>

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
              // image: "", // Add the image field to the initial values
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
}
