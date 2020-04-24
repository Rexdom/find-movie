import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import styles from '../styles/LoadingStyle';

const useStyles = makeStyles(theme => ({
    ...styles(theme)
}));

export default function Loading(props) {
    const classes = useStyles();
    
    return (
        <Zoom in={props.loading!=="Not loading"?true:false}>
            <Paper elevation={10}>
                <Card className={classes.main}>
                    <Typography
                        align='center'
                        color='inherit'
                    >{props.loading=="End"?
                        "That's all we can find":
                        props.loading}</Typography>
                </Card>
            </Paper>
        </Zoom>  
    )
}