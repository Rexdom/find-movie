import React,{useState, useEffect, useMemo, useContext} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';
import UserContext from '../../lib/UserContext';
import styles from '../styles/MovieCardStyle';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade)
}));

export default function MovieCard(props) {
    const classes= useStyles();
    const { index, id, name, date, poster, description, score, inWatchlist ,isLiked ,toggleWatchlist, toggleLike, showSnackbar } = props;
    const [watchlist, setWatchlist] = useState(inWatchlist);
    const [like, setLike] = useState(isLiked);
    const [urls, setUrls]=useState({large:'',medium:'',small:''});
    const {showName} = useContext(UserContext);

    function watchDetail() {
        props.onClick({ index, id, name, date, poster, description, score }, 'details');
    };

    function openComments() {
        props.onClick({ index, id, name, date, poster, description, score }, 'comments');
    }

    function changeWatchlist() {
        toggleWatchlist(id, {id, title:name, release_date:date, poster_path:poster}, !watchlist).then(res=>{
            if (res) {
                showSnackbar(`"${name}" is ${!watchlist?'added to watchlist':'removed from watchlist'}`,'success')
                setWatchlist(!watchlist)
            }
            else showSnackbar(`Unable to ${!watchlist?`added "${name}"`:`removed "${name}"`}`,'error')
        })   
    }

    function changeLike() {
        toggleLike(id, {id, title:name, release_date:date, poster_path:poster}, !like).then(res=>{
            if (res) {
                showSnackbar(`You've ${!like?'liked':'unliked'} "${name}"`,'success')
                setLike(!like);
            }
            else showSnackbar(`Failed to ${!like?`like "${name}"`:`unlike "${name}"`}`,'error')
        })
    }

    useEffect(()=>{
        setWatchlist(inWatchlist);
        setLike(isLiked);
    },[inWatchlist])

    useEffect((()=>{
        setUrls({
            large:`https://image.tmdb.org/t/p/w342${poster}`,
            medium:`https://image.tmdb.org/t/p/w185${poster}`,
            small: `https://image.tmdb.org/t/p/w154${poster}`
        })
    }),[poster])

    return (
        useMemo(()=>(
        <Paper elevation={10}>
            <Card className={classes.main}>
                <CardActionArea className={classes.actionArea} onClick={watchDetail}>
                    {poster && <picture>
                        <source
                            media="(min-width: 1900px)"
                            srcSet={urls.large}
                        />
                        <source
                            media="(min-width: 960px)"
                            srcSet={urls.medium}
                        />
                        <img src={urls.small} alt={name} className={classes.media}/>
                    </picture>}
                    <Typography
                        align='center'
                        color='inherit'
                        className={!poster||showName?classes.showName:classes.hideName}
                    >
                        {name.length>34?name.slice(0,31)+"...":name}
                    </Typography>
                    {/* show rating in list view */}
                    <Typography className={classes.rating}>
                        Rating:{score?
                            <><Rating size='small' max={1} precision={0.1} value={score/10} readOnly />{score}</>:
                            'N/A'}
                    </Typography>
                </CardActionArea>
                <CardActions disableSpacing className={classes.actions}>
                    {watchlist!==null && <IconButton onClick={changeWatchlist} aria-label='Add to Watchlist'>
                        {watchlist ? <BookmarkIcon fontSize="small"/> : <BookmarkBorderIcon fontSize="small"/>}
                    </IconButton>}
                    {like!==null && <IconButton onClick={changeLike} aria-label='Like'>
                        {like ? <ThumbUpAltIcon fontSize="small" color="secondary"/> : <ThumbUpAltOutlinedIcon fontSize="small"/>}
                    </IconButton>}
                    <IconButton onClick={openComments} className={classes.buttonLeft} aria-label='Comments'>
                        <CommentIcon fontSize="small"/>
                    </IconButton>
                </CardActions>
            </Card>
        </Paper>
        ),[watchlist, like, classes, urls, score])
    )
}