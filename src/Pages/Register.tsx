import React from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import fbImgLogo from "../assets/BharatBook1.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <React.Fragment>
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
                marginLeft: [0, 0, 30], // Responsive marginLeft
              }}
            >
              <img
                src={fbImgLogo}
                alt=""
                width={400}
                style={{ mixBlendMode: "multiply" }}
              />

              <Typography sx={{ fontWeight: "bold", marginTop: "1rem" }}>
                Connect with Friends and the world <br /> around you on BharatBook
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
              width="300px"
              sx={{
                padding: ["1rem", "1rem", "2rem"],
              }}
              bgcolor="#fff"
              borderRadius="8px"
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        fullWidth
                        margin="normal"
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="firstName" component="div" />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        margin="normal"
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="lastName" component="div" />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="email" component="div" />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        name="mobile"
                        label="Mobile Number"
                        fullWidth
                        margin="normal"
                      />
                      <div style={{ color: "red" }}>
                        <ErrorMessage name="mobile" component="div" />
                      </div>
                    </Grid>
                  </Grid>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="confirmPassword" component="div" />
                  </div>
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
                </Form>
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default RegisterPage;
