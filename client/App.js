import React, { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import {
  me,
  getAllChallenges,
  getConnections,
  getUserChallenges,
  getPublicUsers,
  getAllStravaActivies,
} from "./store";
import Homepage from "./components/Home/Homepage";
import AuthForm from "./components/Auth/AuthForm";
import Navbar from "./components/Navbar";
import BrowseUsers from "./components/Users/BrowseUsers";
import UserProfileDetails from "./components/Users/UserProfileDetails";
import CreateChallenge from "./components/Challenge/CreateChallenge";
import BrowseChallenges from "./components/Challenge/BrowseChallenges/BrowseChallenges";
import ChallengeDetails from "./components/Challenge/ChallengeDetails/Main";
import EditChallenge from "./components/Challenge/EditChallenge";
import UserProfile from "./components/User/UserProfile";
import EditUserProfile from "./components/User/EditUserProfile";
import UserSettings from "./components/User/UserSettings";
import UserDashboard from "./components/User/UserDashboard";
import AdminChallenges from "./components/Admin/AdminChallenges";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminHub from "./components/Admin/AdminHub";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import { StravaRedirect } from "./components/Auth/StravaRedirect";
import { LOCALES } from "./components/i18n";
import RequireAuth from "./components/Auth/RequireAuth";
import RequireAdminAuth from "./components/Auth/RequireAdminAuth";

export const LanguageContext = createContext();

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    const user = await dispatch(me());
    const challenges = await dispatch(getAllChallenges());
    const userChallenges = await dispatch(getUserChallenges());
    const users = await dispatch(getPublicUsers());
  }, []);

  useEffect(async () => {
    if (user.id) {
      const userConnections = await dispatch(getConnections(user.id));
    }
    if (user.stravaId) {
      const stravaActivities = await dispatch(
        getAllStravaActivies({
          id: user.id,
          stravaRefreshToken: user.stravaRefreshToken,
        })
      );
    }
  }, [user?.id]);

  const [locale, setLocale] = useState(LOCALES.ENGLISH);
  // console.log(locale)
  return (
    // <div>
    <BrowserRouter>
      <LanguageContext.Provider value={{ locale, setLocale }}>
        <div className="nav">
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthForm path={"/"} />} />
          <Route path="/signup" element={<AuthForm path={"/"} />} />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <BrowseUsers />
              </RequireAuth>
            }
          />
          <Route
            path="/users/:userGroup"
            element={
              <RequireAuth>
                <BrowseUsers />
              </RequireAuth>
            }
          />
          <Route
            path="/users/profile/:username"
            element={
              <RequireAuth>
                <UserProfileDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/challenges"
            element={
              <RequireAuth>
                <BrowseChallenges />
              </RequireAuth>
            }
          />
          <Route
            path="/challenges/:filterAndSortParams"
            element={
              <RequireAuth>
                <BrowseChallenges />
              </RequireAuth>
            }
          />
          <Route
            path="/challenges/create"
            element={
              <RequireAuth>
                <CreateChallenge />
              </RequireAuth>
            }
          />
          <Route
            path="/challenges/details/:id"
            element={
              <RequireAuth>
                <ChallengeDetails />
              </RequireAuth>
            }
          />
          {/* <Route path="/challenges/:id/edit" element={<EditChallenge />} /> */}
          <Route
            path="/user/profile/edit"
            element={
              <RequireAuth>
                <EditUserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <RequireAuth>
                <UserDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/user/settings"
            element={
              <RequireAuth>
                <UserSettings />
              </RequireAuth>
            }
          />

          <Route
            path="/admin-hub"
            element={
              <RequireAdminAuth>
                <AdminHub />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/challenges"
            element={
              <RequireAdminAuth>
                <AdminChallenges />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireAdminAuth>
                <AdminUsers />
              </RequireAdminAuth>
            }
          />
          <Route path="/stravaredirect/*" element={<StravaRedirect />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </LanguageContext.Provider>
    </BrowserRouter>
    // </div>
  );
};

export default App;
