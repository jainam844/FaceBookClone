import React, { useState, useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Dialog, DialogContent, Divider } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import * as Yup from "yup";
import {
  UserRegistration,
  getUserCityList,
  getUserCountryList,
} from "../../services/API/UserDataApi";
import { getUserRequest } from "../../services/API/UserREquestApi";
import { getAvatarImage } from "../../services/API/AccountApi";
// import { Country, City, totalFriend } from "./Profile"; // Assuming these interfaces are in the same file as before

interface ProfileDialogProps {
  open: boolean;
  handleClose: () => void;
  userData: any; // Modify the type accordingly based on your actual userData structure
  userimageUrl: string;
}

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
interface totalFriend {
  fromUserName: string;
  fromAvatar: string;
  requestId: number;
  fromUserId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  open,
  handleClose,
  userData,
  userimageUrl,
}) => {
    const { userData, userimageUrl } = useContext(UserContext);
    const [avatarRecords, setAvatarRecords] = useState<any[]>([]);
  
    const [open, setOpen] = React.useState(false);
    const [totalFriend, settotalFriend] = useState<totalFriend[]>([]);
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [value, setValue] = React.useState(0);
    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
      userData.countryId
    );
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
  
    useEffect(() => {
      setSelectedCountryId(userData.countryId);
    }, [userData]);
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
  
    const validationSchema = Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
    });
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    const handleFileChange = (files: FileList | null) => {
      if (files && files.length > 0) {
        setSelectedAvatar(files[0]);
      }
    };
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
        formData.append("CountryId", selectedCountryId);
        formData.append("BirthDate", values.birthDate);
        console.log(values.birthDate);
        const response = await UserRegistration(formData);
        console.log("api res", response);
        handleClose();
      } catch (error) {
        console.error("API Error:", error);
      }
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleCameraIconClick = () => {
      const fileInput = document.getElementById("fileInput");
      fileInput?.click();
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
                  <Grid xs={12} sm={12} md={3} lg={3}>
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
                        style={{ position: "relative", marginBottom: "20px" }}
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
