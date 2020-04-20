import React from 'react';

const AboutPage = () => {
  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          footer {
            position: absolute;
            bottom: 0;
          }
        `}
      </style>
      <div>
        <h2>
          About page
        </h2>
        <p>About this page:</p>
      </div>
      <footer>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </footer>
    </>
  );
};

export default AboutPage;
