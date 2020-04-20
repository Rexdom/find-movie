import React,{useState, useEffect, useCallback, useRef} from 'react';
import MovieCard from '../components/MovieCard';
import fetch from 'isomorphic-unfetch';


const IndexPage = () => {
  const [movies, setMovies]=useState([]);
  const [isloading, setIsloading]=useState(true);
  const [page, setPage]=useState(0);
  const [num,setNum]=useState(0);
  const lazyNode=useRef(null);
  const observer=useRef(null);

  // const [result, setResult]=useState();
  // const [input, setInput]=useState('');
  // const [year, setYear]=useState('');
  // const [length, setLength]=useState('');
  
  // function changeInput(e,func) {
  //   e.preventDefault();
  //   func(e.target.value);
  // }
  
  function fetches(num) {
    setIsloading(false);
    fetch("api/popular")
      .then(async (res)=>{
        let data = await res.json();
        setMovies([...movies, data.result]);
        setPage(num+1);
        setIsloading(true);
      })


    // setIsloading(false);
    // console.log(num)
    // document.getElementById("page-bottom-boundary").setAttribute("style","border:100px solid blue; height:"+10*page+"px");
    
    // setTimeout(()=>{
    //   setPage(num+1);
    //   setIsloading(true);
    // },2000);
  }

  // function prefetch() {
  //   fetch("api/prefetch/"+input+"/"+year+"/"+length)
  //    .then(async (res)=>{
  //       let content = await res.json();
  //       console.log(content);
  //       setResult(content.results.url?content.results.url:'Not found');
  //    })
  // }

  // function fetchTest() {
  //   fetch("api/find-movie").then(async (res)=>{
  //     let text = await res.text();
  //     console.log(text);
  //   });
  // }

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries,observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          setTimeout(()=>fetches(page),2000)
          
          observer.unobserve(entry.target);
        }
      });
    })

    const {current:currentObserver}=observer;

    if (lazyNode) currentObserver.observe(lazyNode.current);

    return ()=>currentObserver.disconnect();
  }, [observer, lazyNode, page]);

  return (
    <main>
      {movies.map((movie, index)=>{return(
        <MovieCard key={index} status={index}/>
      )})}
      {<MovieCard status={isloading?"Loading":page}/>}
      <div id='page-bottom-boundary' style={{ height:'10px',border: '100px solid red' }} ref={lazyNode}>AAA</div>
      {/* <div>
        <h2>
          Hello, you can find any movie you want here! 
        </h2>
        <p>Have a wonderful day.</p>
        <input type="text" value={input} onChange={e=>changeInput(e,setInput)} placeholder="name"/>
        <input type="text" value={year} onChange={e=>changeInput(e,setYear)} placeholder="year"/>
        <input type="text" value={length} onChange={e=>changeInput(e,setLength)} placeholder="length"/>
        <button onClick={prefetch}>Fetch</button>
        <div>
          {result!="Not found"?<a href={result}>{result}</a>:<div>Not available on itunes</div>}
        </div>
        <button onClick={fetchTest}>Test</button>
      </div> */}
    </main>
  );
};

export default IndexPage;
