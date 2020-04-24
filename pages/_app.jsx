import React,{ useState, useEffect} from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeObj from '../src/styles/theme';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Router from 'next/router';
import UserContext from '../lib/UserContext';

export default function MyApp ({ Component, pageProps }) {
    const [theme, setTheme] = useState(themeObj);
    const [showName, setShowName] = useState(false);
    const sections = [
        { title: 'Discover', url:'/[name]', url_as: '/about' },
        { title: 'Popular', url: '/' },
        { title: 'Top Rated', url:'/[name]', url_as: '/top_rated' },
        { title: 'New', url:'/[name]', url_as: '/new' },
        { title: 'Recommend', url: '/' },
    ];

    function toggleDarkMode() {
        console.log("Changed mode")
        let {palette:{type}} = theme;
        type = type==='light'?'dark':'light';
        setTheme({
            ...theme,
            palette: {type}
        });
    }

    function toggleShowName() {
        let toogle = showName==="false"?"true":"false"
        localStorage.setItem('showMovieName', toogle);
        setShowName(toogle);
    }

    useEffect(()=> {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        };

        const showMovieName = localStorage.getItem('showMovieName');
        if (showMovieName) {
            setShowName(showMovieName);
        } else {
            localStorage.setItem('showMovieName', "false");
        };
    },[])

    return (
      <React.Fragment>
        <Head>
          <title>Find Movie</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={createMuiTheme(theme)}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header 
                title="Find Movie" 
                sections={sections}
                router={Router}
                mode={theme.palette.type}
                toggleMode={toggleDarkMode}
                showName={showName}
                toggleShowName={toggleShowName}
            /> 
            <Container maxWidth='lg'>
                <UserContext.Provider value={{ showMovieName: showName}}>
                    <Component {...pageProps} />
                </UserContext.Provider>
            </Container>
            <Footer />
        </ThemeProvider>
      </React.Fragment>
    );
}