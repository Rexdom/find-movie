import React,{useState, useEffect, useMemo} from 'react';
import MovieCard from '../components/MovieCard';
import ManualLoading from '../components/ManualLoading';
import { makeStyles, fade } from '@material-ui/core/styles';
import styles from '../styles/MainPageStyle';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}))

export default function Section(props) {
    const {
      title,
      fetchMovies,
      update,
      record,
      expandDetails,
      toggleWatchlist,
      toggleLike,
      showSnackbar,
    } = props;
    const [shownMovies, setShownMovies]=useState([]);
    const [status, setStatus]=useState("loading");
    const classes = useStyles();

    function getMovies() {
      return new Promise(async (resolve, reject)=> {
        fetchMovies()
          .then((movies)=>{
            if (movies.length>0) resolve(movies);
            else resolve(null);
          }).catch((err)=>{
            reject("Error");
          })
      })
    }

    function handleResults(movies) {
      if (movies.length===10) {
        setShownMovies([...shownMovies, ...movies]);
        setStatus("not loading");
      } else {
        setShownMovies([...shownMovies, ...movies]);
        setStatus("End");
      }
    }

    function manualLoad() {
        setStatus("loading");
    }

    useEffect(()=>{
        let isMount=true;
        if (status==="loading") {
            getMovies()
            .then((movies)=>{
                if (isMount) handleResults(movies);
            }).catch((err)=>{
                if (isMount) setStatus("Error");
            });
        }
        return ()=>{
            isMount = false;
          }
    },[status])

    useEffect(()=>{
      if (update) {
        let temp=[...shownMovies];
        if (temp[update.index]&&temp[update.index].id===update.id){
          temp[update.index].score=update.score;
          setShownMovies(temp);
        }else{
          for (let i in temp) {
            if (temp[i].id===update.id) {
              temp[i].score=update.score;
              setShownMovies(temp);
            }
          }
        }  
      }
    },[update])

    const movieCards = useMemo(()=>shownMovies.map((movie, index)=>{
      return(
        <MovieCard 
          key={index} 
          index={index}
          id={movie.id}
          name={movie.title}
          date={movie.release_date}
          poster={movie.poster_path}
          score={movie.score}
          inWatchlist={record ? record.watch.includes(movie.id) : null}
          isLiked={record ? record.like.includes(movie.id) : null}
          toggleWatchlist={toggleWatchlist}
          toggleLike={toggleLike}
          onClick={expandDetails}
          showSnackbar={showSnackbar}
        />
      )
    }),[shownMovies, record])
    
    return (
        <div className={classes.section}>
          <h1>{title==="watchlist"?`Movies that in most people's watchlist`:`Movies that has most ${title}s`}</h1>
          <div className={classes.root}>
            {movieCards}
          </div>
          <ManualLoading loading={status} onClick={manualLoad}/>
        </div>
    );
}