import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  me,
  getAllChallenges,
  getConnections,
  getUserChallenges,
} from "./store";
import Homepage from "./components/Homepage";
import AuthForm from "./components/Auth/AuthForm";
import Navbar from "./components/Navbar";
import BrowsePeople from "./components/People/BrowsePeople";
import PersonProfileDetails from "./components/People/PersonProfileDetails";
import CreateChallenge from "./components/Challenge/CreateChallenge";
import BrowseChallenges from "./components/Challenge/BrowseChallenges";
import ChallengeDetails from "./components/Challenge/ChallengeDetails";
import EditChallenge from "./components/Challenge/EditChallenge";
import UserProfile from "./components/User/UserProfile";
import UserSettings from "./components/User/UserSettings";
import UserDashboard from "./components/User/UserDashboard";
import AdminChallenges from "./components/Admin/AdminChallenges";
import AdminUsers from "./components/Admin/AdminUsers";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    const user = await dispatch(me());
    const challenges = await dispatch(getAllChallenges());
    const userChallenges = await dispatch(getUserChallenges());
    const connections = await dispatch(getConnections());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthForm path={"/"} />} />
          <Route path="/signup" element={<AuthForm path={"/"} />} />
          <Route path="/people" element={<BrowsePeople />} />
          <Route path="/people/:id" element={<PersonProfileDetails />} />
          <Route
            path="/challenges/create"
            element={<CreateChallenge method={"create"} />}
          />
          <Route path="/challenges" element={<BrowseChallenges />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />
          <Route path="/challenges/:id/edit" element={<EditChallenge />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          {/* NOTE: Should /userdashboard be /home??
          When a user logs in they get directed straight to their dashboard? */}

          <Route path="/user/settings" element={<UserSettings />} />

          <Route path="/admin/challenges" element={<AdminChallenges />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* <Route
            path="my-account"
            element={
                <RequireAuth>
                <MyAccount />
              </RequireAuth>
            }
          /> */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
