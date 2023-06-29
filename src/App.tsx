import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Flag from "./components/Flag/flag";
import Section from "./components/Section/Section";
import Subscription from "./components/Subscription/Subscription";
import MarketPlace from "./components/MarketPlace/MarketPlace";
import UserFriend from "./components/Group/Groups";
import Friend from "./components/Friend/Friends";
import LoginPage from "./Pages/Login";
import HomeApp from "./Pages/Home";
import Profile from "./Pages/Profile";
import HomeLayout from "./Pages/Layout";
import Notification from "./components/Notification/Notification";

interface ProtectedRouteProps {
  render: () => JSX.Element;
}
const ProtectedRoute = ({
  element: Element,
}: {
  element: React.ElementType;
}) => {
  const isAuthenticated = localStorage.getItem("userInfo") !== null;
  return isAuthenticated ? <Element /> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/layout"
            element={<ProtectedRoute element={() => <HomeLayout />} />}
          >
            <Route path="/layout/home" element={<HomeApp />}>
              <Route index element={<Section />} />
              <Route index path="/layout/home/feed" element={<Section />} />
              <Route path="/layout/home/flag" element={<Flag />} />
              <Route
                path="/layout/home/subscription"
                element={<Subscription />}
              />
              <Route
                path="/layout/home/marketplace"
                element={<MarketPlace />}
              />
              <Route path="/layout/home/userfriend" element={<UserFriend />} />
              {/* <Route
                path="/layout/home/Notification"
                element={<Notification />}
              /> */}
              <Route path="/layout/home/friend" element={<Friend />} />
            </Route>

            <Route path="/layout/Profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
