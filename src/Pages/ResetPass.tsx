import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import "react-toastify/dist/ReactToastify.css";
import { Path } from "../components/Utils/Path";
import {
  ToastErrorMessages,
  ToastSuccessMessages,
} from "../components/Utils/Path";

import { getResetPassword } from "../services/API/AccountApi";
import BhartBook from "./BhartBook";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPass: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || "";
  console.log(email);

  const initialValues: FormValues = {
    email: email || "",
    password: "",
    confirmPassword: "",
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
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
        formData.append("email", values.email || email);
        formData.append("oldPassword", "");
        formData.append("newPassword", values.confirmPassword);
        const response = await getResetPassword(formData);
        console.log("User API Response:", response);
        navigate(Path.Login);
        toast.success(ToastSuccessMessages.PASSWORD_RESET);
      } catch (err) {
        toast.error(ToastErrorMessages.INVALID_PASSWORD);
      }
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

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
              <CheckCircleOutlineRoundedIcon
                sx={{
                  fontSize: 80,
                  color: "#2ebb12",
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
                Reset Password
              </Typography>

              <Typography align="center" marginBottom="1rem">
                set the new password for your account so you can login..!!!
              </Typography>

              <form onSubmit={formik.handleSubmit}>
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
                  fullWidth
                  size="large"
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
                  Reset Password
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default ResetPass;
