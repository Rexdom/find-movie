import React, { useState, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import themeObj from "../src/styles/theme";
import { createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Router from "next/router";
import UserContext from "../lib/UserContext";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(themeObj);
  const [showName, setShowName] = useState(false);
  const [isLogIn, setIsLogIn] = useState(null);
  const sections = [
    { title: "Home", url: "/" },
    { title: "Popular", url: "/[name]", url_as: "/popular" },
    { title: "Top Rated", url: "/[name]", url_as: "/top_rated" },
    { title: "New", url: "/[name]", url_as: "/new" },
  ];

  function changeLogIn(token = null) {
    if (token) {
      let date = new Date();
      localStorage.setItem(
        "login",
        JSON.stringify({
          token: token,
          expire: date.setDate(date.getDate() + 1),
        })
      );
      setIsLogIn(true);
    } else {
      localStorage.removeItem("login");
      setIsLogIn(false);
    }
  }

  function toggleDarkMode() {
    let toggle = theme.palette.type === "dark" ? "light" : "dark";
    localStorage.setItem(
      "darkMode",
      JSON.stringify(theme.palette.type !== "dark")
    );
    setTheme({
      ...theme,
      palette: {
        ...theme.palette,
        type: toggle,
      },
    });
  }

  function toggleShowName() {
    let toggle = !showName;
    localStorage.setItem("showMovieName", JSON.stringify(toggle));
    setShowName(toggle);
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) setIsLogIn(false);
    else if (Date() > login.expire) {
      localStorage.removeItem("login");
      setIsLogIn(false);
    } else {
      fetch("/api/auth", {
        method: "get",
        headers: new Headers({ Authorization: `Bearer ${login.token}` }),
      })
        .then((res) => {
          if (res.status === 200) {
            setIsLogIn(true);
          } else {
            setIsLogIn(false);
            localStorage.removeItem("login");
          }
        })
        .catch(() => {
          setIsLogIn(false);
          localStorage.removeItem("login");
        });
    }

    const stored_showMovieName = JSON.parse(
      localStorage.getItem("showMovieName")
    );
    const stored_isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (stored_isDarkMode !== null) {
      setTheme({
        ...theme,
        palette: {
          ...theme.palette,
          type: stored_isDarkMode ? "dark" : "light",
        },
      });
    } else localStorage.setItem("darkMode", JSON.stringify(true));

    if (stored_showMovieName !== null) setShowName(stored_showMovieName);
    else localStorage.setItem("showMovieName", JSON.stringify(showName));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Find Movie</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={createMuiTheme(theme)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header
          title="Find Movie"
          sections={sections}
          router={Router}
          mode={theme.palette.type === "dark"}
          toggleMode={toggleDarkMode}
          isLogIn={isLogIn}
          changeLogIn={changeLogIn}
          showName={showName}
          toggleShowName={toggleShowName}
        />
        <Container maxWidth="lg">
          <UserContext.Provider value={{ showName, isLogIn }}>
            <Component {...pageProps} />
          </UserContext.Provider>
        </Container>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}
