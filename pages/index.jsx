import React,{useState, useEffect} from 'react';
import SectionPage from '../src/components/SectionPage';
import fetch from 'isomorphic-unfetch';

const IndexPage = () => {
  const [movies, setMovies]=useState(null);
  const [ready, setReady]=useState(false)

  function fetchMovies(type) {
    return new Promise((resolve, reject)=> {
      if (movies[type].length>0) {
        resolve(movies[type].slice(0,10));
        setMovies({...movies, [type]:movies[type].slice(10)});
      } else {
        resolve([]);
      }
    })
  }

  useEffect(()=>{
    fetch(`/api/discover`)
        .then(res=>res.json())
        .then(data=>{
          let movies_arr = data.results;
          setMovies({watchlist:movies_arr[0], like:movies_arr[1], comment:movies_arr[2]});
          setReady(true);
        })
  },[])

  return (
    <SectionPage 
      ready={ready}
      fetchMovies={fetchMovies}
      path='discover'
      imgSrc='/discover.jpg'
      imgSrc_blur='/discover_blur.jpg'
    />
  )
};

export default IndexPage;
