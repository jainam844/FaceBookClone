import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import { Path } from "../components/Utils/Path";
import { ToastSuccessMessages } from "../components/Utils/Path";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { getAccountForgot ,getVerifyToken} from "../services/API/AccountApi";
import BhartBook from "./BhartBook";

const ForgotPage: React.FC = () => {
  const navigate = useNavigate();
  const [showSecondForm, setShowSecondForm] = useState(false);

  const handleFirstFormSubmit = async (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    if (values.email) {
      try {
        const response = await getAccountForgot(values.email);
        setShowSecondForm(true);
        toast.success(ToastSuccessMessages.CONFIRMATIN_CODE_SENT);
      } catch (err) {
        console.log(err);
        toast.error("Invalid email.!!😐");
      }
    }
    setSubmitting(false);
  };

  const handleSecondFormSubmit = async (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    try {
      const response = await getVerifyToken(values.email, values.token);
      console.log("hey user", response);
      navigate(Path.Reset, { state: { email: values.email } });
      setSubmitting(false);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Token...!!");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Box sx={{ height: "100vh", bgcolor: "#f0f2f5" }}>
        <Grid container sx={{ height: "100%" }}>
          <BhartBook />
          <Grid
            item
            xs={12}
            md={6}
            justifyContent="center"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              className="loginCard"
              width="350px"
              sx={{
                padding: ["1rem", "1rem", "2rem"],
              }}
              bgcolor="#fff"
              borderRadius="8px"
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: 80,
                  color: "#f55146",
                  marginBottom: "1rem",
                  marginLeft: "8rem",
                }}
              />

              <Typography
                variant="h5"
                component="p"
                align="center"
                sx={{ fontWeight: "600" }}
              >
                Forgot Password
              </Typography>

              <Typography align="center" marginBottom="1rem">
                Enter your email. We will send you a code to reset your
                password.
              </Typography>

              {!showSecondForm ? (
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Required"),
                  })}
                  onSubmit={handleFirstFormSubmit}
                >
                  <Form>
                    <Field
                      name="email"
                      type="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "1rem" }}
                    />

                    <ErrorMessage name="email">
                      {(errorMsg) => (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ marginBottom: "0.2rem", marginTop: "-0.8rem" }}
                        >
                          {errorMsg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      style={{
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                        backgroundColor: "#20a726",
                        color: "white",
                        borderRadius: "50px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        padding: "8px 16px", // Decreased padding value
                        fontSize: "16px", // Decreased font size value
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        border: "none",
                      }}
                    >
                      Send
                    </Button>

                    <Button
                      component={RouterLink}
                      to={Path.Login}
                      variant="contained"
                      fullWidth
                      sx={{
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                        backgroundColor: "#3F51B5",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        padding: "8px 16px", // Decreased padding value
                        fontSize: "16px", // Decreased font size value
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        border: "none",
                      }}
                    >
                      Login
                    </Button>
                  </Form>
                </Formik>
              ) : (
                <Formik
                  initialValues={{ email: "", token: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Required"),
                    token: Yup.string().required("Required"),
                  })}
                  onSubmit={handleSecondFormSubmit}
                >
                  <Form>
                    <Field
                      name="email"
                      type="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "1rem" }}
                    />

                    <Field
                      name="token"
                      type="text"
                      as={TextField}
                      label="Enter your token"
                      variant="outlined"
                      fullWidth
                      style={{ marginBottom: "1rem" }}
                    />
                    <ErrorMessage name="email">
                      {(errorMsg) => (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ marginBottom: "0.2rem", marginTop: "-0.8rem" }}
                        >
                          {errorMsg}
                        </Typography>
                      )}
                    </ErrorMessage>

                    <ErrorMessage name="token">
                      {(errorMsg) => (
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{ marginBottom: "0.2rem", marginTop: "-0.8rem" }}
                        >
                          {errorMsg}
                        </Typography>
                      )}
                    </ErrorMessage>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      style={{
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                        backgroundColor: "#20a726",
                        color: "white",
                        borderRadius: "50px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        padding: "8px 16px", // Decreased padding value
                        fontSize: "16px", // Decreased font size value
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        border: "none",
                      }}
                    >
                      Submit
                    </Button>
                  </Form>
                </Formik>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default ForgotPage;
