import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { TransitionProps } from "@mui/material/transitions";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import UserContext from "../../components/Context/UserContext";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItemText,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  UserRegistration,
  getUserCityList,
  getUserCountryList,
} from "../../services/API/UserDataApi";
import { UserData } from "../../Models/User";

interface Country {
  code: number;
  countryId: number;
  iso: string;
  name: string;
}
interface City {
  cityId: number;
  countryId: number;
  iso: string;
  name: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDialog = ({
  open,
  handleClose,
  userData,
}: {
  open: boolean;
  handleClose: () => void;
  userData: UserData;
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>();
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const { userimageUrl, updateUserData } = useContext(UserContext);
  const [birthdate, setBirthdate] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    setSelectedCountryId(
      userData.countryId ? parseInt(userData.countryId) : null
    );
  }, [userData]);

  const handleCameraIconClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };
  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedAvatar(files[0]);
    }
  };
  useEffect(() => {
    if (selectedCountryId !== null) {
      const citiesForCountry = cities.filter(
        (city) => city.countryId === selectedCountryId
      );
      setFilteredCities(citiesForCountry);
    }
  }, [selectedCountryId, cities, userData]);

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const countryId = event.target.value as number;
    setSelectedCountryId(countryId);

    const citiesForCountry = cities.filter(
      (city) => city.countryId === countryId
    );
    setFilteredCities(citiesForCountry);
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryData = await getUserCountryList(1, 100);
        setCountries(countryData.records);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityData = await getUserCityList(1, 100);
        setCities(cityData.records);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      if (selectedAvatar) {
        formData.append("UserProfile", selectedAvatar);
      }
      formData.append("UserId", values.userId);
      formData.append("FirstName", values.firstName);
      formData.append("LastName", values.lastName);
      formData.append("Email", values.email);
      formData.append("PhoneNumber", values.phoneNumber);
      formData.append("Address", values.address);
      formData.append("ProfileText", values.profileText);
      formData.append("CityId", values.cityId);
      if (selectedCountryId !== null && selectedCountryId !== undefined) {
        formData.append("CountryId", selectedCountryId.toString());
      }

      formData.append("BirthDate", birthdate);
      console.log(birthdate);
      const response = await UserRegistration(formData);
      console.log("api res", response);
      handleClose();
      updateUserData(response);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
  });

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Your Profile
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Formik
          initialValues={userData}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Box
              border="1px solid #ccc"
              borderRadius="5px"
              p={2}
              style={{ backgroundColor: "#fbfcff" }}
            >
              <List>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        // backgroundColor: "#f0f2f5",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          marginBottom: "20px",
                        }}
                      >
                        <Avatar
                          src={
                            selectedAvatar
                              ? URL.createObjectURL(selectedAvatar)
                              : userimageUrl
                          }
                          sx={{
                            height: [100, 100, 200, 200],
                            width: [100, 100, 200, 200],
                            border: "2px solid white",
                            margin: ["-2rem auto 0 auto", "-2rem auto 0 auto"],
                          }}
                        />
                        <CameraAltIcon
                          style={{
                            position: "absolute",
                            bottom: "0.2rem",
                            right: "0.2rem",
                            fontSize: "1.5rem",
                            color: "white",
                            backgroundColor: "#4267B2",
                            borderRadius: "50%",
                            padding: "4px",
                          }}
                          onClick={handleCameraIconClick}
                        />
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e.target.files)}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="First Name" />
                    <Field as={TextField} name="firstName" fullWidth />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="firstName" component="div" />
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <ListItemText primary="Last Name" />
                    <Field as={TextField} name="lastName" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="Email" />
                    <Field as={TextField} name="email" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="Phone Number" />
                    <Field as={TextField} name="phoneNumber" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="Address" />
                    <Field as={TextField} name="address" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="Profile Text" />
                    <Field
                      as={TextField}
                      name="profileText"
                      fullWidth
                      defaultValue=""
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="Country" />
                    <Field
                      as={Select}
                      name="countryId"
                      fullWidth
                      value={selectedCountryId}
                      onChange={handleCountryChange}
                    >
                      {countries.map((country) => (
                        <MenuItem
                          key={country.countryId}
                          value={country.countryId}
                        >
                          {country.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListItemText primary="City" />
                    <Field as={Select} name="cityId" fullWidth>
                      {filteredCities.map((city) => (
                        <MenuItem key={city.cityId} value={city.cityId}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="birthDate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </List>

              <Grid
                container
                justifyContent="center"
                sx={{ marginTop: "1rem" }}
              >
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
