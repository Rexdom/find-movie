import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import styles from '../styles/DialogStyle';
import UserContext from '../../lib/UserContext';
import YoutubeVideo from '../components/YoutubeVideo';
import StarRating from '../components/StarRating';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    ...styles(theme),
}));

function TabPanel(props) {
  const { children, value, index, className } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={className}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

export default function DetailDialog(props) {
  const {data, open, switchType, updateScore}=props;
  const [prev, setPrev]=useState({type:'detail', id:''});
  const [comments, setComments]=useState(null);
  const [details, setDetails]=useState(null);
  const [userRating, setUserRating]=useState(null);
  const [tab1, setTab1]=useState(0);
  const [tab2, setTab2]=useState(0);
  const [videoIndex, setVideoIndex]=useState(0);
  const [imgIndex, setImgIndex]=useState(0);
  const [error, setError]=useState(null);
  const [loading, setLoading]=useState(false);
  const [input, setInput]=useState('');
  const classes = useStyles();
  const { isLogIn } = useContext(UserContext);
  const [prevIsLogIn, setPrevIsLogin] = useState(isLogIn);

  const handleClose = () => {
    props.onClose();
    setInput('');
    setTab1(0);
    setTab2(0);
    setVideoIndex(0);
    setImgIndex(0);
  };

  function handleTab1Change(event, newTab) {
      setTab1(newTab);
  }

  function handleTab2Change(event, newTab) {
    setTab2(newTab);
  }

  function videoBack() {
    if (videoIndex>0) setVideoIndex(videoIndex-1)
  }
  function videoForward() {
    if (details.videos && videoIndex<details.videos.length-1) setVideoIndex(videoIndex+1)
  }
  function imgBack() {
    if (imgIndex>0) setImgIndex(imgIndex-1)
  }
  function imgForward() {
    if (details.photos && imgIndex<details.photos.length-1) setImgIndex(imgIndex+1)
  }

  function fetchDetails() {
    fetch(`/api/details`,{
      method:'post',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')).token:''}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: data.name,
          id: data.id,
      })
    }).then((res)=>res.json())
        .then((obj)=>{
          if (obj.status==="ok") setDetails(obj.results)
          else setDetails("fail")
        })
  }

  //function to get user's rating
  function fetchUserRating() {
    fetch(`/api/getuserRate?id=${data.id}`,{
      method:'get',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')).token:''}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      }
    }).then((res)=>res.json())
        .then((obj)=>{
          setUserRating(obj.score);
        })
  }

  //functions to call when user rate the movie
  function rateMovie(value) {
    fetch(`api/rateMovie`,{
      method:'post',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')).token:''}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: data.id,
        score:value
      })
    }).then(res=>res.json())
    .then(json=>{
      if (json.status==="ok") {
        //pass the score and its index in list view for update
        updateScore(json.new_score, data.index, data.id)
        setUserRating(value)
      }
    }) 
  }

  function changeInput(e) {
    setInput(e.target.value)
  }

  function addComments(e) {
    e.preventDefault();
    if (input.length===0) setError("Comment cannot be empty")
    else {
      const now = new Date();
      const time = now.toLocaleString();
      setError(null);
      setLoading(true);
      fetch(`/api/comments/${data.id}`,{
        method:'post',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: input,
            time: time,
            info: {
              id: data.id,
              poster_path: data.poster,
              release_date: data.date,
              title: data.name,
            }
        })
      }).then(res=>res.json())
      .then(json=>{
        if (json.status==="ok") {
          setInput('');
          setComments(json.comments);
        }
        else setError("Comment upload fail");
        setLoading(false);
      })
    }
  }

  useEffect(()=>{
    if (prev.id !== data.id || prevIsLogIn!==isLogIn){
      setPrevIsLogin(isLogIn);
      setComments(null);
      setDetails(null);
      setUserRating(null);
      setPrev({open:open, id:data.id});
      if (open==='details') {
        fetchDetails();
        // Get user's rating if logged in
        if (isLogIn) fetchUserRating();
      } else {
        fetch(`/api/comments/${data.id}`)
            .then((res)=>res.json())
            .then((json)=>{
              setComments(json.results);
            })
      }
    } else if (prev.open !== open){
      if (open==='details'){
        if (!details) {
          fetchDetails()
          // Get user's rating if logged in
          if (isLogIn) fetchUserRating();
        }
      } else if (open==='comments'){
        if (!comments) {
          fetch(`/api/comments/${data.id}`)
            .then((res)=>res.json())
            .then((json)=>{
              setComments(json.results);
            })
        }
      }
    }
  },[data.id, open, isLogIn])

  return (
    <div>
      <Dialog
        open={open!=="close"}
        TransitionComponent={Transition}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='xl'
        scroll='paper'
      >
        <DialogTitle>
          <Typography className={classes.movieName}>{data.name}</Typography>
          <Typography color="textSecondary">{data.date}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {open==='details' && 
            <div className={classes.content}>           
              {details
                ?
                details!=="fail"
                  ? 
                  <>
                    <TextField
                      label="Description"
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                      multiline
                      defaultValue={details.description||data.description||`Can't find description`}
                      className={classes.description}
                    />
                    {details.score && 
                    <div className={classes.scoreWrapper}>
                      <Typography>Score:{details.score.length==0?' No score found':' '}</Typography>
                      {details.score.map((obj,index)=>(
                        <div key={index} className={classes.score}>
                          <img src={obj.provider_type.includes('imdb')?'https://img.icons8.com/color/48/000000/imdb.png':'https://img.icons8.com/color/48/000000/tomato.png'} className={classes.scoreIcon}/>
                          <Typography>{obj.value}</Typography>
                        </div>
                      ))}
                    </div>}

                    {/* Display user rating and average rating */}
                    <div className={classes.rating}> 
                      <Typography>Your Rating</Typography>
                      {isLogIn ? <StarRating rateMovie={rateMovie} rating={userRating} precision={1}/> : <Typography color="textSecondary">Log in to rate the movie</Typography>}
                      <Typography>Average User Rating</Typography>
                      <StarRating rating={data.score||0} precision={0.1}/>
                    </div>

                    {(details.videos||details.photos) && 
                      <div className={classes.contentBackground}>
                        <Paper variant='outlined' square>
                          <Tabs
                            value={tab1}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleTab1Change}
                            aria-label="Photos and trailers"
                          >
                            <Tab label="Trailers" disabled={details.videos?false:true}/>
                            <Tab label="Photos" disabled={details.photos?false:true}/>
                          </Tabs>
                        </Paper>
                        <TabPanel value={tab1} index={0} className={classes.mediaContainer}>
                          <div className={classes.outerWrapper}>
                            <div className={classes.innerWrapper} style={details.videos && {transform:`translateX(-${videoIndex/details.videos.length*100}%)`}}>
                              {details.videos?
                                details.videos.map((video,index)=>(
                                  <YoutubeVideo 
                                    key={index}
                                    img={video.preview} 
                                    video={video.url}
                                  />
                                )):
                                'N/A'}
                            </div>
                          </div> 
                          {details.videos && 
                          <>
                            <IconButton className={classes.arrowBack} color='primary' disabled={videoIndex<=0} onClick={videoBack}>
                              <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton className={classes.arrowForward} color='primary' disabled={videoIndex>=details.videos.length-1} onClick={videoForward}>
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </>}
                        </TabPanel>
                        <TabPanel value={tab1} index={1} className={classes.mediaContainer}>
                          <div className={classes.outerWrapper}>
                            <div className={classes.innerWrapper} style={details.photos && {transform:`translateX(-${imgIndex/details.photos.length*100}%)`}}>
                              {details.photos?                        
                              details.photos.map((photo,index)=>(<img key={index} src={photo} style={{width:"70vw", height:"39.5vw"}}/>)):
                              'N/A'}
                            </div>
                          </div>
                          {details.photos && 
                          <>
                            <IconButton className={classes.arrowBack} color='primary' disabled={imgIndex<=0} onClick={imgBack}>
                              <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton className={classes.arrowForward} color='primary' disabled={imgIndex>=details.photos.length-1} onClick={imgForward}>
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </>}
                        </TabPanel>
                      </div>
                    }
                    <div className={classes.contentBackground}>
                      <Paper variant='outlined' square>
                        <Tabs
                          value={tab2}
                          indicatorColor="primary"
                          textColor="primary"
                          onChange={handleTab2Change}
                          aria-label="rent and buy details"
                        >
                          <Tab label="Rent" />
                          <Tab label="Buy" />
                        </Tabs>
                      </Paper>
                      <TabPanel value={tab2} index={0} className={classes.offerContainer}> 
                        {details.offers?
                        Object.keys(details.offers).map((key,index)=>(<Typography key={index}>{details.offers[key].url?<Link href={details.offers[key].url} color="primary">{key}:</Link>:`${key}:`}{details.offers[key].rent?` From USD ${details.offers[key].rent}`:` Not available`}</Typography>)):
                        <Typography variant="body1" color="textPrimary">No offers found</Typography>}
                      </TabPanel>
                      <TabPanel value={tab2} index={1} className={classes.offerContainer}>
                        {details.offers?
                        Object.keys(details.offers).map((key,index)=>(<Typography key={index}>{details.offers[key].url?<Link href={details.offers[key].url} color="primary">{key}:</Link>:`${key}:`}{details.offers[key].buy?` From USD ${details.offers[key].buy}`:` Not available`}</Typography>)):
                        <Typography variant="body1" color="textPrimary">No offers found</Typography>}
                      </TabPanel>
                    </div>
                    {!isLogIn && 
                    <Typography color="textSecondary" variant='caption'>
                      Want to find out other online video services available for this movie? Be a member now!
                    </Typography>}
                  </>
                  :
                    <Typography variant="body1" color="textPrimary">Database connection fail</Typography>
                :
                'Searching Online...'}
            </div>}
          {open==='comments' && 
            <div className={classes.content}>
              {comments
                ?
                comments.length>0
                  ?
                  <List>
                    {comments.map(((comment,index)=>(
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={<>
                              <Typography className={classes.commentUser} variant="subtitle1" color="textPrimary">{comment.user}</Typography>
                              <Typography variant="caption" color="textSecondary">{comment.time}</Typography>
                            </>}
                            secondary={<Typography variant="body1" color="textPrimary">{comment.comment}</Typography>}
                          />
                        </ListItem>
                        <Divider variant='middle'/>
                      </React.Fragment>
                    )))}
                  </List>
                  :
                  <div>No comments yet, be the first people to comment this movie!</div>
                :
                'Loading Database'}
              </div>}
        </DialogContent>
        <DialogActions>
          {(open==='comments' && comments) && 
            <form className={classes.commentInput} onSubmit={addComments}>
               <TextField
                  size="small"
                  name="comments"
                  label="Comments"
                  margin="none"
                  variant="outlined"
                  fullWidth
                  disabled={!isLogIn||loading?true:false}
                  helperText={!isLogIn?'Log in to comment':error?error:''}
                  error={error?true:false}
                  value={input}
                  onChange={changeInput}
                />
            </form>}
          <Button onClick={switchType} color="primary">
            {open==='details'?'Comments':'Details'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}