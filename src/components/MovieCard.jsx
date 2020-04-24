import React,{useState, useEffect} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
    main: {
        height: '100%',
        color: theme.palette.text.secondary,
    },
    action: {
        height: '100%',
        '&:hover picture + p': {
            opacity: '0',
            transition: 'opacity 500ms',
        }
    },
    media: {
        height: '100%',
        width: '100%',
    },
    showName: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: fade(theme.palette.background.paper, 0.7)
    }
}));

export default function MovieCard(props) {
    const classes = useStyles();
    const {movie, showName} = props;
    let detail = {...movie};
    const [urls,setUrls]=useState({})

    function onclick() {
        props.onClick(detail);
    };

    function prefetch() {
        fetch("api/prefetch/"+movie.name+"/"+movie.year)
         .then(async (res)=>{
            let content = await res.json();
            setResult(content.results.url?content.results.url:'Not found');
         })
    }

    useEffect((()=>{
        setUrls({
            large:`https://image.tmdb.org/t/p/w500${movie.poster}`,
            medium:`https://image.tmdb.org/t/p/w300${movie.poster}`,
            small: `https://image.tmdb.org/t/p/w154${movie.poster}`
        })
    }
    ),[])

    return (
        <Zoom in={true}>
            <Paper elevation={6}>
                <Card 
                    className={classes.main}
                >
                    <CardActionArea className={classes.action} onClick={onclick}>
                        {movie.poster && <picture>
                            <source
                                media="(min-width: 1280px)"
                                srcSet={urls.large||''}
                            />
                            <source
                                media="(min-width: 600px)"
                                srcSet={urls.medium||''}
                            />
                            <img className={classes.media} src={urls.small||''} alt={movie.name} />
                        </picture>}
                        <Typography
                            align='center'
                            color='inherit'
                            className={classes.showName}
                        >
                            {movie.name}
                        </Typography>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Add to Watchlist
                        </Button>
                        <Button size="small" color="primary">
                            Comments
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Zoom>  
    )
}