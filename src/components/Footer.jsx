import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/FooterStyle';

const useStyles = makeStyles(theme => ({
    ...styles(theme)
}));

export default function Header(props) {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography
                align='center'
                color='inherit'
            >This product uses the TMDb API but is not endorsed or certified by TMDb.</Typography>
        </footer>
    )
}