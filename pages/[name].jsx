import React,{useState, useEffect} from 'react';
import MainPage from '../src/components/MainPage';
import fetch from 'isomorphic-unfetch';
import path from '../src/path';

const AboutPage = ({path_name, api_url, img_url}) => {
  const [movies, setMovies]=useState([]);
  const [page, setPage]=useState(1);

  useEffect(()=>{
    setPage(1)
  },[path_name])

  function fetchMovies() {
    return new Promise((resolve, reject)=> {
      if (movies.length>0 && movies.length<10) {
        resolve(movies);
        setMovies([]);
      } else {
        fetch(api_url+page)
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
      path={path_name}
      imgSrc={img_url.original}
      imgSrc_blur={img_url.blur}
    />
  )
};

export async function getStaticProps({params}) {
  let query = params.name;
  let obj={
    path_name: path[query].name,
    api_url: path[query].url,
    img_url: path[query].img_url,
  };
  return {
    props: {...obj}, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: {name: 'about'} },
      { params: {name: 'top_rated'} },
      { params: {name: 'new'} }
    ],
    fallback: false 
  };
}

export default AboutPage;
