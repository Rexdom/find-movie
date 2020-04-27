import React,{useState, useEffect, useRef, useMemo, useContext} from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Dialog from './Dialog';
import { makeStyles, fade } from '@material-ui/core/styles';
import styles from '../styles/MainPageStyle';
import UserContext from '../../lib/UserContext';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}))

export default function MainPage(props) {
    const {
      imgSrc_blur, 
      imgSrc, 
      path,
      fetchMovies,
    } = props;
    const [isOpen, setIsOpen]=useState("close");
    const [details, setDetails]=useState(null);
    const [shownMovies, setShownMovies]=useState([]);
    const [record, setRecord]=useState(null);
    const [status, setStatus]=useState("Not loading");
    const [img, setImg]=useState("");
    const [loaded, setLoaded]=useState(false);
    const lazyNode=useRef(null);
    const observer=useRef(null);
    const classes = useStyles();
    const { isLogIn } = useContext(UserContext);

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
      if (movies) {
        setShownMovies([...shownMovies, ...movies]);
        setStatus("Not loading");
      } else setStatus("End");
    }

    function toggleWatchlist(id, details, status) {
      fetch('/api/update',{
        method:'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'watch',
            status,
            id,
            details,
        })
      })
    }

    function toggleLike(id, details, status) {
      fetch('/api/update',{
        method:'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'like',
            status,
            id,
            details,
        })
      })
    }

    function expandDetails(obj, comments=null) {
      if (comments) {
        setDetails({...obj, comments});
        setIsOpen("comments");
      } else {
        setDetails(obj);
        setIsOpen("details");
      }
    }
    
    function handleClose() {
        setIsOpen("close");
    }

    function finishLoad() {
        setLoaded(true);
    }

    useEffect(()=>{
      setLoaded(false);
      setImg(imgSrc);
    },[imgSrc])

    useEffect(() => {
      if (isLogIn){
        let isMount = true;
        setShownMovies([]);
        setStatus("Not loading");
        fetch('/api/getlist')
          .then((res)=>res.json())
          .then((data)=>{
            console.log(data)
            if (isMount) setRecord(data)
        })
        return ()=>{
          isMount = false;
        }
      }else setRecord(null)
    },[path, isLogIn])


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

    const movieCards = useMemo(()=>shownMovies.map((movie, index)=>{
      return(
        <MovieCard 
          key={index} 
          id={movie.id}
          name={movie.title} 
          date={movie.release_date}
          poster={movie.poster_path}
          inWatchlist={record ? record.watch.indexOf(movie.id) : null}
          isLiked={record ? record.like.indexOf(movie.id) : null}
          toggleWatchlist={toggleWatchlist}
          toggleLike={toggleLike}
          onClick={expandDetails}
        />
      )
    }),[shownMovies, record])
    
    return (
        <main>
          <div className={classes.nobackground}></div>
          {imgSrc_blur &&
            <>
              <div className={classes.backgroundRoot}>
                <img src={imgSrc_blur} className={classes.background} {...loaded && {style: { opacity: "0" }}}/>
              </div>  
              <div className={classes.backgroundRoot}>
                <img src={img} className={`${classes.background} ${loaded && classes.progressive}`} onLoad={finishLoad} {...!loaded && {style: { opacity: "0" }}}/>
              </div>
            </>   
          }
          <div className={`${classes.root} ${imgSrc_blur?classes.withImg:classes.withoutImg}`}>
            {movieCards}
          </div>
          <Loading loading={status}/>
          {status!="End" && <div key={path} id='page-bottom-boundary' className={classes.checkLoading} ref={lazyNode}></div>}
          {details && <Dialog open={isOpen} data={details} onClose={handleClose}/>}
        </main>
    );
}