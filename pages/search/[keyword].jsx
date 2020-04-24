import React,{useState, useEffect} from 'react';
import MainPage from '../../src/components/MainPage';
import fetch from 'isomorphic-unfetch';

const SearchPage = ({query, api_url, reject}) => {
  const [movies, setMovies]=useState([]);
  const [page, setPage]=useState(1);

  useEffect(()=>{
    setPage(1)
  },[query])

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
    <>
      {!!reject
        ?
        <p>Invalid search request</p>
        :
        <MainPage 
          fetchMovies={fetchMovies}
          path={query}
          imgSrc=""
          imgSrc_blur=""
        />
      }
    </>
  )
};

export async function getServerSideProps({params}) {
  let query=decodeURIComponent(params.keyword);
  let reject=false;
  let api_url=`/api/search/${query}/`
  if (!query.match(/^[\d\w\s\-+*?$&()"']+$/)) {
    reject=true;
  }
  return {
    props: {query, api_url, reject}, // will be passed to the page component as props
  }
}

export default SearchPage;
