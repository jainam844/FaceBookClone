import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Path } from "../components/Utils/Path";
import {
  ToastErrorMessages,
  ToastSuccessMessages,
} from "../components/Utils/Path";
import { UserRegistration } from "../services/API/UserDataApi";
import BhartBook from "./BhartBook";
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string()
      .required("Required")
      .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one special character"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("FirstName", values.firstName);
        formData.append("LastName", values.lastName);
        formData.append("Email", values.email);
        formData.append("PhoneNumber", values.mobile);
        formData.append("Password", values.password);
        const response = await UserRegistration(formData);
        toast.success(ToastSuccessMessages.REGISTRATION_SUCCESSFUL);
      } catch (err) {
        toast.error(ToastErrorMessages.INVALID_EMAIL_OR_PASSWORD);
      }
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <React.Fragment>
      <ToastContainer />
      <Box sx={{ height: "900px", bgcolor: "#f0f2f5" }}>
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
              paddingX: "1rem",
              paddingY: ["2rem", "2rem", "1rem"],
            }}
          >
            <Box
              className="loginCard"
              width="100%"
              maxWidth="600px"
              sx={{
                padding: ["1rem", "1rem", "2rem"],
              }}
              bgcolor="#fff"
              borderRadius="8px"
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
            >
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      fullWidth
                      margin="normal"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      margin="normal"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      name="mobile"
                      label="Mobile Number"
                      fullWidth
                      margin="normal"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.mobile && !!errors.mobile}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      fullWidth
                      margin="normal"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ marginTop: "1rem" }}
                >
                  Register
                </Button>
                <Typography
                  sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <Typography
                    color="primary"
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                  >
                    Forgot Account?
                  </Typography>
                </Typography>
                <Button
                  component={RouterLink}
                  to={Path.Login}
                  variant="contained"
                  color="success"
                  fullWidth
                  size="large"
                  sx={{ marginTop: "1rem" }}
                >
                  Login
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default RegisterPage;
