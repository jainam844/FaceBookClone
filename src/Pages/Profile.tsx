import React, { useContext, useState, useEffect } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import { TransitionProps } from "@mui/material/transitions";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import UserContext from "../components/Context/UserContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  UserRegistration,
  getUserCityList,
  getUserCountryList,
} from "../services/API/UserDataApi";
import { getUserRequest } from "../services/API/UserREquestApi";

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
  toUserName: string;
  toAvatar: string;
  requestId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
  toUserId: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const { userData, userimageUrl } = useContext(UserContext);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(1, 100, 1, 0);

        settotalFriend(response.totalCount);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  });
  return (
    <React.Fragment>
      <Grid container sx={{ maxHeight: "100vh" }}>
        <Grid xs={12} sm={12} md={9} item sx={{ margin: "auto" }}>
          <Box
            sx={{
              height: ["250px", "350px", "400px"],
              backgroundColor: "white",
              display: "flex",
              borderRadius: "10px",
              backgroundImage: `url('https://source.unsplash.com/gVBIohdCRUQ')`,
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              objectFit: "contain",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              sx={{
                width: "200px",
                backgroundColor: "#0006",
                color: "white",
                margin: "0 2rem 1rem 0",
              }}
            >
              <FaceIcon />{" "}
              <Typography sx={{ margin: "0 0.5rem", fontSize: "13px" }}>
                Create With Avatar
              </Typography>
            </Button>{" "}
            <Button
              sx={{
                width: "200px",
                backgroundColor: "#0006",
                color: "white",
                margin: "0 2rem 1rem 0",
              }}
            >
              <CameraAltIcon />{" "}
              <Typography sx={{ margin: "0 0.5rem", fontSize: "13px" }}>
                Add Cover Photo
              </Typography>
            </Button>
          </Box>
          <Grid container alignItems="center">
            <Grid xs={12} sm={12} md={3} lg={3}>
              <Avatar
                src={userimageUrl}
                sx={{
                  height: [100, 100, 200, 200],
                  width: [100, 100, 200, 200],
                  border: "2px solid white",
                  margin: ["-2rem auto 0 auto", "-2rem auto 0 auto"],
                }}
              />
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={7}
              lg={6}
              sx={{
                margin: "1rem 0",
                display: "flex",
                alignItems: ["center", "center", "flex-start"],
                flexDirection: ["column"],
              }}
            >
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {userData.firstName + " " + userData.lastName}
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: 550, color: "gray" }}
              >
                {` ${totalFriend} Friends`}
              </Typography>

              <Box sx={{ display: "flex", marginRight: 0.5 }}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    marginLeft: "-5px",
                    zIndex: 15,
                    border: "1px solid white",
                  }}
                />{" "}
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    marginLeft: "-5px",
                    zIndex: 15,
                    border: "1px solid white",
                  }}
                />{" "}
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    marginLeft: "-5px",
                    zIndex: 15,
                    border: "1px solid white",
                  }}
                />
              </Box>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={5}
              lg={12}
              item
              sx={{
                display: "flex",
                flexDirection: ["column", "column", "row"],
                justifyContent: ["center", "center", "flex-end"],
                alignItems: ["center", "center", "flex-end"],
              }}
            >
              <Grid
                xs={12}
                sm={12}
                md={5}
                lg={12}
                item
                sx={{
                  display: "flex",
                  flexDirection: ["column", "column", "row"],
                  justifyContent: ["center", "center", "flex-end"],
                  alignItems: ["center", "center", "flex-end"],
                }}
              >
                <Grid
                  item
                  sx={{ margin: ["0.3rem 0", "0.3rem 0", "0 0.4rem"] }}
                >
                  <Button
                    onClick={handleClickOpen}
                    sx={{
                      backgroundImage:
                        "linear-gradient(45deg, #b71c1c, #ff5252)",
                      color: "white",
                      borderRadius: "30px",
                      padding: "12px 24px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s",
                      "&:hover": {
                        backgroundImage:
                          "linear-gradient(45deg, #880e4f, #c51162)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <EditIcon />
                    <Typography
                      sx={{
                        marginLeft: "0.5rem",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      Edit a Profile
                    </Typography>
                  </Button>
                  <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                  >
                    <AppBar sx={{ position: "relative" }}>
                      <Toolbar>
                        <Typography
                          sx={{ ml: 2, flex: 1 }}
                          variant="h6"
                          component="div"
                        >
                          Edit Profile
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
                              <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                              >
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
                                      style={{
                                        position: "relative",
                                        marginBottom: "20px",
                                      }}
                                    >
                                      <Avatar
                                        src={
                                          selectedAvatar
                                            ? URL.createObjectURL(
                                                selectedAvatar
                                              )
                                            : userimageUrl
                                        }
                                        sx={{
                                          height: [100, 100, 200, 200],
                                          width: [100, 100, 200, 200],
                                          border: "2px solid white",
                                          margin: [
                                            "-2rem auto 0 auto",
                                            "-2rem auto 0 auto",
                                          ],
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
                                      onChange={(e) =>
                                        handleFileChange(e.target.files)
                                      }
                                    />
                                  </div>
                                </Grid>
                              </Grid>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <ListItemText primary="First Name" />
                                  <Field
                                    as={TextField}
                                    name="firstName"
                                    fullWidth
                                  />
                                  <div style={{ color: "red" }}>
                                    <ErrorMessage
                                      name="firstName"
                                      component="div"
                                    />
                                  </div>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <ListItemText primary="Last Name" />
                                  <Field
                                    as={TextField}
                                    name="lastName"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <ListItemText primary="Email" />
                                  <Field
                                    as={TextField}
                                    name="email"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <ListItemText primary="Phone Number" />
                                  <Field
                                    as={TextField}
                                    name="phoneNumber"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <ListItemText primary="Address" />
                                  <Field
                                    as={TextField}
                                    name="address"
                                    fullWidth
                                  />
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
                                      <MenuItem
                                        key={city.cityId}
                                        value={city.cityId}
                                      >
                                        {city.name}
                                      </MenuItem>
                                    ))}
                                  </Field>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                  <TextField
                                    fullWidth
                                    // label="Birth Date"
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
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                >
                                  Save Changes
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Form>
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Post" {...a11yProps(0)} />
                  <Tab label="About" {...a11yProps(1)} />
                  <Tab label="Friends" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                Post
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                About
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Friend
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
