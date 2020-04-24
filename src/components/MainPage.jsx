import React,{useState, useEffect, useRef, useContext} from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import DetailDialog from '../components/DetailDialog';
import { makeStyles, fade } from '@material-ui/core/styles';
import styles from '../styles/MainPageStyle';
import UserContext from '../../lib/UserContext';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}))

export default function MainPage(props) {
    const { showMovieName } = useContext(UserContext);
    const {
      imgSrc_blur, 
      imgSrc, 
      path,
      fetchMovies,
    } = props;
    const [isOpen, setIsOpen]=useState(false);
    const [details, setDetails]=useState(null);
    const [shownMovies, setShownMovies]=useState([]);
    const [status, setStatus]=useState("Not loading");
    const [img, setImg]=useState("");
    const [loaded, setLoaded]=useState(false);
    const lazyNode=useRef(null);
    const observer=useRef(null);
    const classes = useStyles();

    function getMovies() {
      return new Promise(async (resolve, reject)=> {
        try{
          let movies = await fetchMovies();
          if (movies.length>0) resolve(movies);
          else resolve(null);
        } catch(err) {
          reject("Error");
        }
      })
    }

    function handleResults(movies) {
      if (movies) {
        setShownMovies([...shownMovies, ...movies])
        setStatus("Not loading");
      } else setStatus("End");
    }

    if (imgSrc) {
      useEffect(()=>{
        setLoaded(false);
        setImg(imgSrc);
      },[imgSrc])
    }

    function expandDetails(obj) {
        setDetails(obj);
        setIsOpen(true);
    }
    
    function handleClose() {
        setIsOpen(false);
    }

    function finishLoad() {
        setLoaded(true);
    }

    useEffect(() => {
      setShownMovies([]);
      setStatus("Not loading");
    },[path])

    useEffect(() => {
        let isMount = true;
        if (observer.current) observer.current.disconnect();
    
        observer.current = new IntersectionObserver((entries,observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              setStatus("Loading");
              getMovies()
                .then((movies)=>{
                  if (isMount) handleResults(movies);
                }).catch((err)=>{
                  if (isMount) setStatus("Error");
              });
            }
          });
        },{
          root:null,
          rootMargin:"0 0 1000px 0",
          threshold:[0.1]
        })
    
        const {current:currentObserver}=observer;
    
        if (status!=="End" && lazyNode) currentObserver.observe(lazyNode.current);
    
        return ()=>{
          isMount = false;
          currentObserver.disconnect();
        }
    }, [observer, lazyNode, shownMovies]);
    
    return (
        <main>
          {imgSrc_blur 
            ?
            <>
              <div className={classes.backgroundRoot}>
                <img src={imgSrc_blur} className={classes.background} {...loaded && {style: { opacity: "0" }}}/>
              </div>  
              <div className={classes.backgroundRoot}>
                <img src={img} className={`${classes.background} ${loaded && classes.progressive}`} onLoad={finishLoad} {...!loaded && {style: { opacity: "0" }}}/>
              </div>
            </>  
            :
            <div className={classes.nobackground}></div>      
          }
          <div className={`${classes.root} ${imgSrc_blur?classes.withImg:classes.withoutImg}`}>
            {shownMovies.map((movie, index)=>{
              const obj = {
                name: movie.title, 
                year: movie.release_date, 
                overview: movie.overview, 
                poster: movie.poster_path,
                backdrop: movie.backdrop_path,
              }
              return(
                <MovieCard 
                  key={index} 
                  movie={obj} 
                  onClick={expandDetails}
                  showName={showMovieName}
                />
              )
            })}
          </div>
          <Loading loading={status}/>
          {status!="End" && <div key={path} id='page-bottom-boundary' className={classes.checkLoading} ref={lazyNode}></div>}
          {!!details && <DetailDialog open={isOpen} data={details} onClose={handleClose}/>}
        </main>
    );
}