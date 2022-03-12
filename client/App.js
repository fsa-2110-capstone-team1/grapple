import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { me } from './store';
import Homepage from './components/Homepage';
import AuthForm from './components/Auth/AuthForm';
import Navbar from './components/Navbar';
import BrowsePeople from './components/People/BrowsePeople';
import PersonProfileDetails from './components/People/PersonProfileDetails';
import CreateChallenge from './components/Challenge/CreateChallenge';
import BrowseChallenges from './components/Challenge/BrowseChallenges';
import ChallengeDetails from './components/Challenge/ChallengeDetails';
import EditChallenge from './components/Challenge/EditChallenge';
import UserProfile from './components/User/UserProfile';
import UserDashboard from './components/User/UserDashboard';
import AdminChallenges from './components/Admin/AdminChallenges';
import AdminUsers from './components/Admin/AdminUsers';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    const user = await dispatch(me());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Examples */}

          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthForm path={'/'} />} />
          <Route path="/signup" element={<AuthForm path={'/'} />} />
          <Route path="/browsepeople" element={<BrowsePeople />} />
          <Route
            path="/personprofiledetails"
            element={<PersonProfileDetails />}
          />
          {/* NOTE: The above /personprofiledetails page will most likely be /personprofiledetails/:id 
          or something like that in the future. For now it is a hard coded path and a to do page.  */}

          <Route path="/createchallenge" element={<CreateChallenge />} />
          <Route path="/browsechallenges" element={<BrowseChallenges />} />
          <Route path="/challengedetails" element={<ChallengeDetails />} />
          {/* NOTE: Another route that will probably use an id but its hardcoded for now.
          The above /challengedetails page will be /challangedetails/:id  */}

          <Route path="/editchallenge" element={<EditChallenge />} />
          {/* NOTE: /editchallenge will be editchallenge/:id  */}

          <Route path="/userprofile" element={<UserProfile />} />
          {/* NOTE: /userprofile could be userprofile/:id??
          Would we need the users id for the route if they're logged in?  */}

          <Route path="/userdashboard" element={<UserDashboard />} />
          {/* NOTE: Should /userdashboard be /home??
          When a user logs in they get directed straight to their dashboard? */}

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
