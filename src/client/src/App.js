import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import AuthOutlet from '@auth-kit/react-router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Layout from "./scenes/layout";
import Login from "./scenes/auth/login";
import Register from "./scenes/auth/register";
import Home from "./scenes/home";
import Round from "./scenes/round";
import NewRound from "./scenes/round/NewRound";
import RoundHistory from "./scenes/round history";
import MyBag from "./scenes/my bag";
import Account from "./scenes/account/Account";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const theme = createTheme({
  palette: {
    background: {
      default: "#f8fafb",
      hover: "#F2F4F5",
      active: "#e8eef2",
    },
    text: {
      default: "#121B20",
      secondary: "#57788F",
    },
    accent: {
      default: "#36AB45",
    },
  },
});

function App() {

  const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<RequireAuth fallbackPath='/login'><Layout /></RequireAuth>}>
            <Route path="/" element={<Home />} />
            <Route path="/round/:id" element={<Round />} />
            <Route path="/round/create/single" element={<NewRound />} />
            <Route path="/history" element={<RoundHistory />} />
            <Route path="/bag" element={<MyBag />} />
            <Route path="/account" element={<Account />} />
          </Route>

        </Routes>
      </BrowserRouter>
      </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
