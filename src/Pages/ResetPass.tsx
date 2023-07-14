import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import fbImgLogo from "../assets/BharatBook1.png";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Path } from "../components/Utils/Path";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { getResetPassword } from "../services/Response";

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

        // Call the API function
        const response = await getResetPassword(formData);
        console.log("User API Response:", response);
        navigate(Path.Login);

        toast.success("You Password Successfully Reset..!!  😃  ");
      } catch (err) {
        console.error("API Error:", err);
        toast.error("Invalid Password.!!😐");
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
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginLeft: [0, 0, 0], // Responsive marginLeft
              }}
            >
              <img
                src={fbImgLogo}
                alt=""
                width={400}
                style={{ mixBlendMode: "multiply" }}
              />

              <Typography sx={{ fontWeight: "bold", marginTop: "1rem" }}>
                Connect with Friends and the world <br /> around you on
                BharatBook
              </Typography>
            </Box>
          </Grid>
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
                    backgroundColor: "#FF4081",
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
