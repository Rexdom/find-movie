import React ,{useState} from 'react';
import fetch from 'isomorphic-unfetch';

const WritePage = () => {

  const [status, setStatus]=useState('waiting');
  const [input, setInput]=useState('');

  function handleSubmit(event) {
    event.preventDefault();
    let data = {input};
    console.log(data);
    fetch('api/test', {
      method: 'POST',
      body: null,
    })
    .then(async res=>{
        if (res.ok===true){
          data=await res.json();
          setStatus(data.input);
        }
    })
  }

  function retrieveData() {
    fetch('api/test')
      .then(fetchdata=>fetchdata.json())
      .then(res=>{
          if (res.nok){
            setStatus('true');
            console.log(res);
          } else {
            setStatus('false');
            console.log(res);
          }
      })
  }

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
        `}
      </style>
      <div>
        <h2>
          Please click the button
        </h2>
        <form method="get" action="api/test" onSubmit={handleSubmit}>
          <input type="text" name="input" placeholder="anything" value={input} onChange={e => setInput(e.target.value)}/>
          <button type="submit">Click here</button>
        </form>
        <button onClick={retrieveData}>Get data from Database</button>
        <p>{status}</p>
      </div>
    </>
  );
};

export default WritePage;
  