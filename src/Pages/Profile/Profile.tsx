import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

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
import UserContext from "../../components/Context/UserContext";
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
} from "../../services/API/UserDataApi";
import { getUserRequest } from "../../services/API/UserREquestApi";
import ProfileHeader from "./ProfileHeader";
import { getAvatarImage } from "../../services/API/AccountApi";
import ProfileHeaderSection from "./ProfileImageSection";
import { getPostByUserId } from "../../services/API/SocialActivityApi";
import { Ipost, PostClass } from "../../Models/Post";
import CircularProgress from "@mui/material/CircularProgress";
import PostDisplay from "./PostDisplay";
import SentReq from "../../components/Friend/sentreq";
import TotalFriend from "./TotalFriend";
import { RequestType, RequestType1 } from "../../components/Utils/Path";
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
  isFriend: boolean;
  isRejected: boolean;
  requestType: string;
  RequestType1: string;
  status: string;
  avatarUrl: string;
  toUserName: string;
  createdAt: string;
  toUserId: number;
  toAvatar: string;
  firstName: string;
  lastName: string;
  avatar: string;
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
  const { userData, userimageUrl, updateUserData } = useContext(UserContext);
  const [avatarRecords, setAvatarRecords] = useState<any[]>([]);

  const [open, setOpen] = React.useState(false);
  const [totalFriend, settotalFriend] = useState<totalFriend[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [value, setValue] = React.useState(0);

  const [selectedCountryId, setSelectedCountryId] = useState<number | null>();
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
      // updateUserData(response.userData);
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
  const [friends, setFriends] = useState<totalFriend[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(1, 100, 1, 0);

        const avatarPromises = response.records.map(async (friend) => {
          const avatarUrl = await getAvatarImage(friend.fromAvatar);
          return { ...friend, avatarUrl };
        });

        const friendDataWithAvatar = await Promise.all(avatarPromises);

        settotalFriend(response.totalCount);
        setAvatarRecords(friendDataWithAvatar);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(1, 100, 1, 0);
        console.log(response);
        setFriends((prevRecords) => [...prevRecords, ...response.records]);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageSize = 10;
  const [postData, setPostData] = useState<Ipost[]>([]);

  const [newPost, setNewPost] = useState<Ipost>(new PostClass());
  const onChangePost = (post: Ipost) => {
    setNewPost(post);
  };
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await getPostByUserId(pageNumber, pageSize, true);

        if (Array.isArray(response.records)) {
          const data: Ipost[] = response.records;
          const updatedData = await Promise.all(
            data.map(async (post) => {
              return { ...post };
            })
          );

          setPostData((prevData) => [...prevData, ...updatedData]);

          setHasMore(response.records.length > 0);
          setLoading(false);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };

    fetchPosts();
  }, [pageNumber]);

  const removeDeletedPost = (postId: number) => {
    setPostData((prevData) =>
      prevData.filter((post) => post.postId !== postId)
    );
  };

  useEffect(() => {
    if (newPost.postId) {
      setPostData((prevData) => [newPost, ...prevData]);
    }
  }, [newPost]);

  return (
    <React.Fragment>
      <Grid container sx={{ maxHeight: "100vh" }}>
        <Grid xs={12} sm={12} md={9} item sx={{ margin: "auto" }}>
          <ProfileHeader />
          <Grid container alignItems="center">
            <ProfileHeaderSection
              totalFriend={totalFriend}
              avatarRecords={avatarRecords}
            />

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
                                    variant="outlined"
                                    name="birthDate"
                                    type="date"
                                    defaultValue={userData.birthDate}
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
          </Grid>
        </Grid>

        <Grid xs={12} sm={12} md={9} item sx={{ margin: "auto" }}>
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
              <Box sx={{ flex: "1", width: "100%" }}>
                {postData.map((post, index) => {
                  if (postData.length === index + 1) {
                    return (
                      <PostDisplay
                        key={post.postId}
                        post={post}
                        reference={lastPostRef}
                        onClearPost={removeDeletedPost}
                      />
                    );
                  } else {
                    return (
                      <PostDisplay
                        key={post.postId}
                        post={post}
                        onClearPost={removeDeletedPost}
                      />
                    );
                  }
                })}
                {loading && (
                  <CircularProgress sx={{ display: "block", margin: "auto" }} />
                )}
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              About
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              {friends.map((friend, index) => (
                <React.Fragment key={index}>
                  <TotalFriend
                    friend={friend}
                    RequestType={friends.requestType}
                    sx={{ width: "calc(33% - 1rem)" }}
                  />
                  {index !== friends.length - 1 && (
                    <hr style={{ borderTop: "1px solid #b8b8b8" }} />
                  )}
                </React.Fragment>
              ))}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
