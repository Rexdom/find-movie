import React,{useState, useEffect, useRef} from 'react';
import MovieCard from '../src/components/MovieCard';
import Loading from '../src/components/Loading';
import Dialog from '../src/components/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles((theme) => ({
  background: {
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressive: {
    animation: `$blur 500ms steps(5, end)` 
  },
  "@keyframes blur": {
    "0%": {
      filter: 'blur(15px)',
    },
    "100%": {
      filter: 'blur(0)',
    }
  },
  root: {
    marginTop: 'calc(100vw * 0.5625 - 128px)',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      [theme.breakpoints.up('xs')]: {
        margin: theme.spacing(1),
        width: theme.spacing(13),
        height: theme.spacing(19.5),
      },
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2),
        width: theme.spacing(19),
        height: theme.spacing(28.5),
      },
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(3),
        width: theme.spacing(26),
        height: theme.spacing(39),
      },
      [theme.breakpoints.up('lg')]: {
        margin: theme.spacing(4),
        width: theme.spacing(30),
        height: theme.spacing(45),
      },
    }
  }
}))

const IndexPage = () => {
  const [movies, setMovies]=useState();
  const [shownMovies, setShownmovies]=useState([]);
  const [status, setStatus]=useState("Not loading");
  const [page, setPage]=useState(1);
  const [imageSrc, setImageSrc]=useState("");
  const [loaded, setLoaded]=useState(false);
  const [isOpen, setIsOpen]=useState(false);
  const [details, setDetails]=useState(null);
  const lazyNode=useRef(null);
  const observer=useRef(null);
  const classes = useStyles();
  
  function fetchMovies(num) {
    return new Promise((resolve, reject)=> {
      if (movies) resolve(movies)
      else {
        fetch(`/api/popular/${num}`)
        .then(res=> res.json())
        .then(data=>resolve(data.results))
        .catch(err=>reject(err))
      }
    })
  }

  function handleResults(results, page) {
    if (results) {
      let newMovies = results;
      if (results.length/10 > 1) setMovies(results.splice(Math.floor(results.length/2)));
      else setMovies();
      setShownmovies([...shownMovies, ...newMovies])
      setStatus("Not loading");
      setPage(page+1);
      
    } else setStatus("End");
  }

  function finishLoad() {
      setLoaded(true)
  }

  function expandDetails(obj) {
    setDetails(obj);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(()=>{
    setImageSrc("/popular.jpg");
  },[])

  useEffect(() => {
    let isMount = true;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries,observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > 0.4) {
            observer.unobserve(entry.target);
            setStatus("Loading");
            fetchMovies(page)
              .then((results)=>{
                if (isMount) handleResults(results, page);
              }).catch((err)=>{
                if (isMount) setStatus("Error");
            });
          }
        }
      });
    },{
      root:null,
      rootMargin:"0 0 50px 0",
      threshold:[0.05,0.5]
    })

    const {current:currentObserver}=observer;

    if (lazyNode) currentObserver.observe(lazyNode.current);

    return ()=>{
      isMount = false;
      currentObserver.disconnect();
    }
  }, [observer, lazyNode, page]);

  return (
    <main>
      <img src="/popular_blur.jpg" className={classes.background} {...loaded && {style: { opacity: "0" }}}/>
      <img src={imageSrc} className={`${classes.background} ${loaded && classes.progressive}`} onLoad={finishLoad} {...!loaded && {style: { opacity: "0" }}}/>
      <div className={classes.root}>
        {shownMovies.map((movie, index)=>{
          const obj = {
            name: movie.title, 
            year: movie.release_date.slice(0,4), 
            overview: movie.overview, 
            poster: movie.poster_path,
            backdrop: movie.backdrop_path,
          }
          return(
            <MovieCard 
              key={index} 
              movie={obj} 
              onClick={expandDetails}
            />
          )
        })}
      </div>
      <Loading loading={status}/>
      {status!="End" && <div id='page-bottom-boundary' style={{ height:'60px',border: '10px solid red' }} ref={lazyNode}>Check Loading Area</div>}
      {details && <Dialog open={isOpen} data={details} onClose={handleClose}/>}
    </main>
  );
};

export default IndexPage;
