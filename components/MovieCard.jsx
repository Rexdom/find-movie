import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    main: {
        height: '50px',
        marginTop: '20px',
        color: theme.palette.text.disabled,
    },
}));

export default function MovieCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.main}>
            <Typography
                align='center'
                color='inherit'
            >{props.status}</Typography>
        </Card>
    )
}