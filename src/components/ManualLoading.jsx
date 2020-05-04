import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import styles from '../styles/LoadingStyle';

const useStyles = makeStyles(theme => ({
    ...styles(theme)
}));

export default function ManualLoading(props) {
    const classes = useStyles();
    
    function loadMore() {
        if (props.loading==="not loading") props.onClick();
    }

    return (
        <Zoom in={true}>
            <Paper elevation={10}>
                <Card className={classes.main}>
                    <CardActionArea className={classes.action} onClick={loadMore}>
                        <Typography
                            align='center'
                            color='inherit'
                        >{props.loading=="End"?
                            "That's all we can find":
                            props.loading=="not loading"?
                            "Click to load more":
                            props.loading}</Typography>
                    </CardActionArea>
                </Card>
            </Paper>
        </Zoom>  
    )
}