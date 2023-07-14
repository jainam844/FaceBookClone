import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ForUserLogin } from "../services/Response";
import jwtDecode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Path } from "../components/Utils/Path";
import BhartBook from "./BhartBook";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLogin = async (values: FormikValues) => {
    const { email, password } = values;

    try {
      const loginSuccessful = await ForUserLogin({ email, password });

      if (loginSuccessful) {
        const decodedToken: { UserId: string } = jwtDecode(loginSuccessful);
        console.log("Decoded Token:", decodedToken);

        const userId = decodedToken.UserId;
        console.log("User ID:", userId);

        const userInfo = {
          email: email,
          token: loginSuccessful,
          userId: userId,
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        navigate(Path.Home);
        toast.success("You Are LoggedIn..!  😃  ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email Or Password...!!!😐");
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
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string().required("Required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin(values);
                  setSubmitting(false);
                }}
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

                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    as={TextField}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: "1rem" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <ErrorMessage name="password">
                    {(errorMsg) => (
                      <Typography
                        variant="body2"
                        style={{
                          color: "red",
                          marginBottom: "0.2rem",
                          marginTop: "-0.8rem",
                        }}
                      >
                        {errorMsg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Button
                    type="submit"
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
                    Log In
                  </Button>
                  {/* <Box
                    sx={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                  > */}
                  <Typography
                    color="primary"
                    sx={{
                      marginBottom: "0.5rem",
                      marginTop: "0.5rem",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                    component={RouterLink}
                    to={Path.Forgot}
                  >
                    Forgot Password?
                  </Typography>
                  {/* </Box> */}
                  <Button
                    component={RouterLink}
                    to={Path.Register}
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
                    Create New Account
                  </Button>
                </Form>
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default LoginPage;
