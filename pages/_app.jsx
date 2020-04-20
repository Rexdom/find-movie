import React,{useState, useEffect} from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import themeObj from '../src/theme';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    background: {
        height: '1000px',
        backgroundColor: 'grey',
    },
}));

export default function MyApp ({ Component, pageProps }) {

    const classes = useStyles();
    const [theme, setTheme] = useState(themeObj);
    const sections = [
        { title: 'Technology', url: '/Technology' },
        { title: 'Design', url: '#' },
        { title: 'Culture', url: '#' },
        { title: 'Business', url: '#' },
        { title: 'Politics', url: '#' },
        { title: 'Opinion', url: '#' },
        { title: 'Science', url: '#' },
        { title: 'Health', url: '#' },
        { title: 'Style', url: '#' },
        { title: 'Travel', url: '#' }
    ];

    function toggleDarkMode() {
        let {palette:{type}} = theme;
        type = type==='light'?'dark':'light';
        setTheme({
            ...theme,
            palette: {type}
        });
    }

    useEffect(()=> {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
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
                title="Movie" 
                sections={sections}
            /> 
            <div className={classes.background}></div>
            <Container maxWidth='lg'>
                <button onClick={toggleDarkMode}>Click to change mode</button>
                <Component {...pageProps} />
                <Footer />
            </Container>
        </ThemeProvider>
      </React.Fragment>
    );
}