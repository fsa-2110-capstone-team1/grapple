import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  me,
  getAllChallenges,
  getConnections,
  getUserChallenges,
  getPublicUsers,
} from "./store";
import Homepage from "./components/Homepage";
import AuthForm from "./components/Auth/AuthForm";
import Navbar from "./components/Navbar";
import BrowseUsers from "./components/Users/BrowseUsers";
import UserProfileDetails from "./components/Users/UserProfileDetails";
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
import _Filtered from './components/Challenge/_Filtered'


const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    const user = await dispatch(me());
    const challenges = await dispatch(getAllChallenges());
    const userChallenges = await dispatch(getUserChallenges());
    const users = await dispatch(getPublicUsers());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div className="nav">
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthForm path={"/"} />} />
          <Route path="/signup" element={<AuthForm path={"/"} />} />
          <Route path="/people" element={<BrowseUsers />} />
          <Route path="/people/:username" element={<UserProfileDetails />} />
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

          <Route path="/challenges/filter/:id" element={<_Filtered />} />

          {/* <Route path="/challenges/num" element={<Num />} />
          <Route path="/challenges/unit" element={<Unit />} />
          <Route path="/challenges/diff1" element={<Diff1 />} />
          <Route path="/challenges/diff2" element={<Diff2 />} />
          <Route path="/challenges/diff3" element={<Diff3 />} />
          <Route path="/challenges/diff4" element={<Diff4 />} />
          <Route path="/challenges/diff5" element={<Diff5 />} />

          <Route path="/challenges/cat1" element={<Cat1 />} />
          <Route path="/challenges/cat2" element={<Cat2 />} />
          <Route path="/challenges/cat3" element={<Cat3 />} />
          <Route path="/challenges/cat4" element={<Cat4 />} />
          <Route path="/challenges/cat5" element={<Cat5 />} />
           */}

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
