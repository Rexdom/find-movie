import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import styles from '../src/headerStyle';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
    ...styles,
    appBar: {
        //   display: "flex",
        //   border: "0",
        //   borderRadius: "3px",
        //   padding: "0.625rem 0",
        //   marginBottom: "20px",
        //   color: "#555",
        //   width: "100%",
        //   backgroundColor: "#fff",
        //   boxShadow:
        //     "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 500ms ease",
        //   alignItems: "center",
        //   flexFlow: "column nowrap",
        //   justifyContent: "flex-start",
        //   position: "relative",
        //   zIndex: "unset"
    },
    transparent: {
        backgroundColor: "transparent !important",
        color: "#FFFFFF",
        boxShadow: 'none',
    },
    opaque: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        boxShadow:
          "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
    },
    toolbar: {
        borderBottom: `1px solid `,
        minHeight: '64px'
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSpacing: {
        marginRight: `2rem`,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        minHeight: '64px'
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title} = props;

  function AppBarScroll(props) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 120,
    });
    React.useEffect(() => {
        window.scrollTo(0, window.scrollY-1);
    },[]);
  
    return (
        <AppBar 
            color='transparent'
            className={`${trigger?classes.opaque:classes.transparent} ${classes.appBar}`}
        >
            {props.children}
        </AppBar>
    )
  }

  return (
    <React.Fragment>
        <AppBarScroll>
            <Toolbar className={classes.toolbar}>
                <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="left"
                noWrap
                className={classes.toolbarTitle}
                >
                {title}
                </Typography>
                <Button color='inherit' size="small" className={classes.toolbarSpacing}>
                    Search
                </Button>
                <Button color='inherit' variant="outlined" size="small">
                Sign up
                </Button>
            </Toolbar>
            <Toolbar component="nav" className={classes.toolbarSecondary}>
                {sections.map(section => (
                <Link
                    key={section.title}
                    href="/about"
                    passHref
                >
                    <Button 
                        component="a"
                        color="inherit"
                        className={classes.toolbarLink}
                    >{section.title}</Button>
                </Link>
                ))}
                <Link href='/'><a>Home</a></Link>
            </Toolbar>
        </AppBarScroll> 
    </React.Fragment>
  );
}