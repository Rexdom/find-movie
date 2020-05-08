import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/StarRatingStyle';

const useStyles = makeStyles((theme) => ({
    ...styles(theme),
}));

export default function StarRating(props) {
    const {rating, precision, rateMovie}=props;
    const [hover, setHover] = useState(-1);
    const [loading, setLoading]=useState(false);
    const classes = useStyles();
    
    function giveRate(value) {
        setLoading(true);
        rateMovie(value);
    }

    return(
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={rating}
                max={10}
                precision={precision}
                size="small"
                readOnly={rating!==null||loading?true:false}
                onChange={(event, newValue) => {
                    giveRate(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            <Typography className={classes.description}>{rating!==null ? rating : loading?'Rating is uploading...':hover!==-1 ? hover : 'Rate this movie'}</Typography>
        </div>    
    )   
}