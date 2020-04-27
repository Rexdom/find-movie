import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import styles from '../styles/ErrorStyle';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}))

export default function Error(props) {
    const classes = useStyles();
    
    return(
        <>
            <div className={classes.headerBackground}></div>
            <div className={classes.message}>
                <h1>Error!!</h1>
                <h2>Status Code: {props.statusCode||'404'}</h2>
            </div>
        </>
    )   
}