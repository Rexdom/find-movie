import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Dialog from "./Dialog";
import { makeStyles, fade } from "@material-ui/core/styles";
import styles from "../styles/MainPageStyle";
import GlobalSnackbar from "./GlobalSnackbar";
import UserContext from "../../lib/UserContext";

const useStyles = makeStyles((theme) => ({
  ...styles(theme, fade),
}));

export default function MainPage(props) {
  const { imgSrc_blur, imgSrc, path, fetchMovies } = props;
  const [prevPath, setPrevPath] = useState(null);
  const [isOpen, setIsOpen] = useState("close");
  const [details, setDetails] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [record, setRecord] = useState(null);
  const [status, setStatus] = useState("Not loading");
  const [img, setImg] = useState("");
  const [loaded, setLoaded] = useState(false);
  const lazyNode = useRef(null);
  const observer = useRef(null);
  const classes = useStyles();
  const { isLogIn } = useContext(UserContext);
  const [snackMessage, setSnackMessage] = useState({});

  function getMovies() {
    return new Promise(async (resolve, reject) => {
      fetchMovies()
        .then((movies) => {
          if (movies.length > 0) resolve(movies);
          else resolve(null);
        })
        .catch((err) => {
          reject("Error");
        });
    });
  }

  function handleResults(movies) {
    if (movies) {
      setShownMovies([...shownMovies, ...movies]);
      setStatus("Not loading");
    } else setStatus("End");
  }

  function toggleWatchlist(id, details, status) {
    return new Promise(async (resolve, reject) => {
      fetch("/api/update", {
        method: "post",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("login")
              ? JSON.parse(localStorage.getItem("login")).token
              : ""
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "watch",
          status,
          id,
          details,
        }),
      })
        .then((res) => {
          if (res.status === 200) resolve(true);
          else resolve(false);
        })
        .catch((e) => reject(false));
    });
  }

  function toggleLike(id, details, status) {
    return new Promise(async (resolve, reject) => {
      fetch("/api/update", {
        method: "post",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("login")
              ? JSON.parse(localStorage.getItem("login")).token
              : ""
          }`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "like",
          status,
          id,
          details,
        }),
      })
        .then((res) => {
          if (res.status === 200) resolve(true);
          else resolve(false);
        })
        .catch((e) => reject(false));
    });
  }

  // Update average score when receive a new one
  function updateScores(score, index, id) {
    let temp = [...shownMovies];
    if ((temp[index].id = id)) temp[index].score = score;
    setShownMovies(temp);
    setDetails({ ...details, score });
  }

  function expandDetails(obj, type) {
    setDetails(obj);
    setIsOpen(type);
  }

  function switchType() {
    setIsOpen(isOpen === "details" ? "comments" : "details");
  }

  function handleClose() {
    setIsOpen("close");
  }

  function finishLoad() {
    setLoaded(true);
  }

  function showSnackbar(message, type) {
    setSnackMessage({ message, type });
  }

  useEffect(() => {
    setLoaded(false);
    setImg(imgSrc);
  }, [imgSrc]);

  useEffect(() => {
    let isMount = true;
    if (isLogIn && path === prevPath) {
      showSnackbar("Log in success", "success");
      fetch("/api/info/getlist", {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("login")).token
          }`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isMount) setRecord(data);
        });
    } else if (isLogIn && path !== prevPath) {
      setPrevPath(path);
      setShownMovies([]);
      setStatus("Not loading");
      fetch("/api/info/getlist", {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("login")).token
          }`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isMount) setRecord(data);
        });
    } else if (path !== prevPath) {
      setPrevPath(path);
      setShownMovies([]);
      setStatus("Not loading");
    } else if (prevPath !== null) {
      showSnackbar("Log in to enjoy more features!", "info");
      setRecord(null);
    }

    return () => {
      isMount = false;
    };
  }, [isLogIn, path]);

  useEffect(() => {
    let isMount = true;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setStatus("Loading");
            getMovies()
              .then((movies) => {
                if (isMount) handleResults(movies);
              })
              .catch((err) => {
                if (isMount) setStatus("Error");
              });
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 1000px 0px",
        threshold: [0.1],
      }
    );

    const { current: currentObserver } = observer;

    if (status !== "End" && lazyNode) currentObserver.observe(lazyNode.current);

    return () => {
      isMount = false;
      currentObserver.disconnect();
    };
  }, [observer, lazyNode, shownMovies]);

  const movieCards = useMemo(
    () =>
      shownMovies.map((movie, index) => {
        return (
          <MovieCard
            key={index}
            index={index}
            id={movie.id}
            name={movie.title}
            date={movie.release_date}
            poster={movie.poster_path}
            description={movie.overview}
            score={movie.score}
            inWatchlist={record ? record.watch.includes(movie.id) : null}
            isLiked={record ? record.like.includes(movie.id) : null}
            toggleWatchlist={toggleWatchlist}
            toggleLike={toggleLike}
            onClick={expandDetails}
            showSnackbar={showSnackbar}
          />
        );
      }),
    [shownMovies, record]
  );

  return (
    <main>
      <div className={classes.nobackground}></div>
      {imgSrc_blur && (
        <>
          <div className={classes.backgroundRoot}>
            <img
              src={imgSrc_blur}
              className={classes.background}
              {...(loaded && { style: { opacity: "0" } })}
            />
            <img
              src={img}
              className={`${classes.background} ${
                loaded && classes.progressive
              }`}
              onLoad={finishLoad}
              {...(!loaded && { style: { opacity: "0" } })}
            />
          </div>
          <div className={classes.title}>
            <h1 className={classes.h1}>{path.replace("_", " ")}</h1>
          </div>
        </>
      )}
      <div
        className={`${classes.root} ${
          imgSrc_blur ? classes.withImg : classes.withoutImg
        }`}
      >
        {movieCards}
      </div>
      <Loading loading={status} />
      {status != "End" && (
        <div
          key={path}
          id="page-bottom-boundary"
          className={classes.checkLoading}
          ref={lazyNode}
        ></div>
      )}
      {details && (
        <Dialog
          open={isOpen}
          data={details}
          updateScore={updateScores}
          switchType={switchType}
          onClose={handleClose}
        />
      )}
      <GlobalSnackbar message={snackMessage} />
    </main>
  );
}
