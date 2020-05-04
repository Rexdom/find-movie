import React,{useState} from 'react';
import SectionPage from '../src/components/SectionPage';
import fetch from 'isomorphic-unfetch';

const IndexPage = () => {
  const [movies, setMovies]=useState({
    watchlist:[],
    like:[],
    comment:[]
  });
  const [first, setFirst]=useState({
    watchlist:true,
    like:true,
    comment:true
  })

  function fetchMovies(type) {
    return new Promise((resolve, reject)=> {
      if (first[type]) {
        fetch(`/api/discover/${type}`)
        .then(res=>res.json())
        .then(data=>{
          let movies_arr = data.results;
          if (movies_arr.length>10) {
            setMovies({...movies,[type]:movies_arr.splice(10)});
            resolve(movies_arr);
          }else resolve(movies_arr)
        }).catch(err=>reject(err))
        setFirst({...first, [type]:false})
      } else if (movies[type].length>0) {
        resolve(movies[type].slice(0,10));
        setMovies({...movies, [type]:movies[type].slice(10)});
      } else {
        resolve([]);
      }
    })
  }

  return (
    <SectionPage 
      fetchMovies={fetchMovies}
      path='discover'
      imgSrc='/discover.jpg'
      imgSrc_blur='/discover_blur.jpg'
    />
  )
};

export default IndexPage;
