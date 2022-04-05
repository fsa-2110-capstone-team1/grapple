import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import {
  me,
  getAllChallenges,
  getConnections,
  getUserChallenges,
  getPublicUsers,
} from './store';
import Homepage from './components/Home/Homepage';
import AuthForm from './components/Auth/AuthForm';
import Navbar from './components/Navbar';
import BrowseUsers from './components/Users/BrowseUsers';
import UserProfileDetails from './components/Users/UserProfileDetails';
import CreateChallenge from './components/Challenge/CreateChallenge';
import BrowseChallenges from './components/Challenge/BrowseChallenges/BrowseChallenges';
import ChallengeDetails from './components/Challenge/ChallengeDetails/Main';
import EditChallenge from './components/Challenge/EditChallenge';
import UserProfile from './components/User/UserProfile';
import EditUserProfile from './components/User/EditUserProfile';
import UserSettings from './components/User/UserSettings';
import UserDashboard from './components/User/UserDashboard';
import AdminChallenges from './components/Admin/AdminChallenges';
import AdminUsers from './components/Admin/AdminUsers';
import AdminHub from './components/Admin/AdminHub'
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import TestChallengeTracking from './components/_Archive/TEST_ChallengeTracking';
import StravaAPI from './components/Auth/StravaAPI';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    const user = await dispatch(me());
    const challenges = await dispatch(getAllChallenges());
    const userChallenges = await dispatch(getUserChallenges());
    const users = await dispatch(getPublicUsers());
    // const userConnections = await dispatch(getConnections(user.id));
  }, []);

  useEffect(async () => {
    if (user.id) {
      const userConnections = await dispatch(getConnections(user.id));
    }
  }, [user?.id]);

  return (
    // <div>
    <BrowserRouter>
      <div className="nav">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<AuthForm path={'/'} />} />
        <Route path="/signup" element={<AuthForm path={'/'} />} />
        <Route path="/users" element={<BrowseUsers />} />
        <Route path="/users/:userGroup" element={<BrowseUsers />} />
        <Route
          path="/users/profile/:username"
          element={<UserProfileDetails />}
        />
        <Route
          path="/challenges/create"
          element={<CreateChallenge />}
        />
        <Route path="/challenges" element={<BrowseChallenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />
        <Route path="/challenges/:id/edit" element={<EditChallenge />} />
        <Route path="/user/profile/edit" element={<EditUserProfile />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        {/* NOTE: Should /userdashboard be /home??
          When a user logs in they get directed straight to their dashboard? */}

        <Route
          path="/challenges/sort/:diff/:cat"
          element={<BrowseChallenges />}
        />
     <Route
          path="/challenges/filter/:num/:cat"
          element={<BrowseChallenges />}
        />



  <Route
          path="/challenges/sort/:x/:y/:z/:a/:b"
          element={<BrowseChallenges />}
        />

        <Route
          path="/challenges/sortby/:attr/:dir"
          element={<BrowseChallenges />}
        />
        <Route
          path="/challenges/filter/:diff/:cat/filter/:num/:cat"
          element={<BrowseChallenges />}
        />
          <Route
          path="/challenges/filter/:diff/:cat/filter/:num/:cat/filter/:num/:cat"
          element={<BrowseChallenges />}
        />
             <Route
          path="/challenges/filter/:num/:cat/filter/physical/category"
          element={<BrowseChallenges />}
        />
    

        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/admin-hub" element={<AdminHub />} />
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

        <Route
          path="/test/challenges/:challengeId"
          element={<TestChallengeTracking />}
        />

        <Route path="/strava" element={<StravaAPI />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    // </div>
  );
};

export default App;
