import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { me } from "./store";
import Homepage from "./components/Homepage";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    const user = await dispatch(me());
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routes>
          {/* Examples */}

          <Route path="/" element={<Homepage />} />

          {/* <Route
            path="my-account"
            element={
                <RequireAuth>
                <MyAccount />
              </RequireAuth>
            }
          /> */}

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
