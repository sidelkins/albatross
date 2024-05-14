import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./scenes/layout";
import Home from "./scenes/home";
import Round from "./scenes/round";
import NewRound from "./scenes/round/NewRound";
import RoundHistory from "./scenes/round history";
import MyBag from "./scenes/my bag";

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
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/test")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/round" element={<Round />} />
            <Route path="/round/create/single" element={<NewRound />} />
            <Route path="/history" element={<RoundHistory />} />
            <Route path="/bag" element={<MyBag />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
