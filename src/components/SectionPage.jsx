import React,{useState, useEffect, useContext} from 'react';
import Section from './Section';
import Dialog from './Dialog';
import { makeStyles, fade } from '@material-ui/core/styles';
import styles from '../styles/MainPageStyle';
import GlobalSnackbar from './GlobalSnackbar';
import UserContext from '../../lib/UserContext';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}))

export default function MainPage(props) {
    const {
      imgSrc_blur, 
      imgSrc,
      fetchMovies,
    } = props;
    const [isOpen, setIsOpen]=useState("close");
    const [details, setDetails]=useState(null);
    const [record, setRecord]=useState(null);
    const [img, setImg]=useState("");
    const [loaded, setLoaded]=useState(false);
    const classes = useStyles();
    const { isLogIn } = useContext(UserContext);
    const [snackMessage, setSnackMessage] = useState({});
    const sections = ['watchlist','like','comment']

    function toggleWatchlist(id, details, status) {
      return new Promise(async (resolve, reject)=> {
        fetch('/api/update',{
          method:'post',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')).token:''}`,
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              type: 'watch',
              status,
              id,
              details,
          })
        }).then(res=>{
          if (res.status===200) resolve(true)
          else resolve(false)
        }).catch((e)=>reject(false))
      })
    }

    function toggleLike(id, details, status) {
      return new Promise(async (resolve, reject)=> {
        fetch('/api/update',{
          method:'post',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')).token:''}`,
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              type: 'like',
              status,
              id,
              details,
          })
        }).then(res=>{
          if (res.status===200) resolve(true)
          else resolve(false)
        }).catch((e)=>reject(false))
      })
    }

    function expandDetails(obj, type) {
      setDetails(obj);
      setIsOpen(type);
    }

    function switchType() {
      setIsOpen(isOpen==='details'?'comments':'details')
    }
    
    function handleClose() {
      setIsOpen("close");
    }

    function finishLoad() {
      setLoaded(true);
    }

    function showSnackbar(message, type) {
      setSnackMessage({message, type});
    }

    useEffect(()=>{
      setLoaded(false);
      setImg(imgSrc);
    },[imgSrc])

    useEffect(() => {
      let isMount = true;
      if (isLogIn){
        showSnackbar("Log in success", "success");
        fetch('/api/getlist',{
          method: 'get',
          headers: new Headers({ Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}` })
        }).then((res)=>res.json())
          .then((data)=>{
            console.log(data)
            if (isMount) setRecord(data)
        })
      }else {
        showSnackbar("Log in to enjoy more features!", "info");
        setRecord(null)
      }
      return ()=>{
        isMount = false;
      }
    },[isLogIn])
    
    return (
        <main>
          <div className={classes.nobackground}></div>
          <div className={classes.backgroundRoot}>
            <img src={imgSrc_blur} className={classes.background} {...loaded && {style: { opacity: "0" }}}/>
            <img src={img} className={`${classes.background} ${loaded && classes.progressive}`} onLoad={finishLoad} {...!loaded && {style: { opacity: "0" }}}/>
          </div>
          <div className={classes.withImg}>
            {sections.map(section=>(
                <Section 
                    key={section}
                    title={section}
                    fetchMovies={fetchMovies.bind(null,section)}
                    record={record}
                    expandDetails={expandDetails}
                    toggleWatchlist={toggleWatchlist}
                    toggleLike={toggleLike}
                    showSnackbar={showSnackbar}
                />
            ))}
          </div>
          {details && <Dialog open={isOpen} data={details} toggleWatchlist={toggleWatchlist} toggleLike={toggleLike} switchType={switchType} onClose={handleClose}/>}
          <GlobalSnackbar message={snackMessage}/>
        </main>
    );
}