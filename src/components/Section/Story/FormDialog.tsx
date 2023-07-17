import { useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Field, Form } from "formik";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import UserContext from "../../Context/UserContext";
import { addStory } from "../../../services/Response";
import { IStory } from "../../../Models/Story";
interface FormValues {
  description: string;
}
interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  handlenewStory: (storyData: IStory) => void;
}
const validateDescription1 = (value: string) => {
  let error: string | undefined;
  if (!value) {
    error = "Description is required";
  }
  return error;
};



const FormDialog = ({ open, onClose, handlenewStory }: FormDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSizeError1, setImageSizeError1] = useState(false);
  const { userData, userimageUrl } = useContext(UserContext);

  const handleFileChange1 = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile && uploadedFile.size <= 2 * 1024 * 1024) {
      const compressedImage = await compressImage(uploadedFile);
      setFile(compressedImage);
      setImageSizeError1(false);
    } else {
      setFile(null);
      setImageSizeError1(true);
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
            0.7 // Compression quality (adjust as needed)
          );
        };
      };
    });
  };

  const handleSubmit = async (values: FormValues) => {
    const { description } = values;

    try {
      const formData = new FormData();
      formData.append("Description", description);
      if (file) {
        formData.append("Images", file);
      }
      const response = await addStory(formData);
      handlenewStory(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Card sx={{ width: 600, minHeight: 300 }}>
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
              (Upload Story..!!)
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
                    validate={validateDescription1}
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
                  <label htmlFor="story-file-input" style={{ flexGrow: 1 }}>
                    <input
                      type="file"
                      id="story-file-input"
                      onChange={handleFileChange1}
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
                {imageSizeError1 && (
                  <div style={{ color: "red" }}>
                    Image size limit exceeded (max: 2MB)
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
    </Dialog>
  );
};
export default FormDialog;
