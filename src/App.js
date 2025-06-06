import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import ServiceRequest from "scenes/ServiceRequest";
import Calender from "scenes/Calender";
import UserDetail from "scenes/UserDetails";
import LiveGPS from "scenes/LiveGPS";
import AllRequest from "scenes/AllRequest";
import SyncTelegrambot from "scenes/syncTelegrambot.jsx";
import Home from "homepage/components/Home";
import SignIn from "homepage/components/SignIn";
import SignUp from "homepage/components/SignUp";
import About from "homepage/components/AboutUs/About";
import NearByComp from "scenes/NearBycomp";
import HowItWorks from "homepage/components/HowItWorks";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/howitworks" element={<HowItWorks />} /> */}
          
          {/* Themed Dashboard Routes */}
          <Route
            element={
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
              </ThemeProvider>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userdetail" element={<UserDetail />} />
            <Route path="/live_gps" element={<LiveGPS />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/service_request" element={<ServiceRequest />} />
            <Route path="/all_request" element={<AllRequest />} />
            <Route path="/sync-telegrambot" element={<SyncTelegrambot />} />
            <Route path="/nearby-competitor" element={<NearByComp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
