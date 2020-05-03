import React,{useState, useEffect,} from 'react';
import MainPage from '../src/components/MainPage';
import fetch from 'isomorphic-unfetch';
import path from '../src/path';

const IndexPage = () => {
  const [movies, setMovies]=useState([]);
  const [page, setPage]=useState(1);

  function fetchMovies() {
    return new Promise((resolve, reject)=> {
      if (movies.length>0 && movies.length<10) {
        resolve(movies);
        setMovies([]);
      } else {
        fetch('/api/popular/'+page)
        .then(res=>res.json())
        .then(data=>{
          setPage(page+1);
          let movies = data.results;
          if (movies.length>10) {
            setMovies(movies.splice(10));
            resolve(movies);
          }else resolve(movies)
        })
        .catch(err=>reject(err))
      }
    })
  }

  return (
    <MainPage 
      fetchMovies={fetchMovies}
      path='discover'
      imgSrc='/discover.jpg'
      imgSrc_blur='/discover_blur.jpg'
    />
  )
};

export default IndexPage;
