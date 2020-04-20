import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: '20px',
        color: theme.palette.text.disabled,
    },
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