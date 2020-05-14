import React, { useState } from "react";
import Button from "@material-ui/core/Button";

export default function YoutubeVideo(props) {
  const { img, video } = props;
  const [isplay, setIsplay] = useState(false);

  function playVideo() {
    setIsplay(true);
  }

  return (
    <>
      {!isplay ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} style={{ width: "70vw", height: "39.5vw" }} />
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={playVideo}
            style={{ position: "absolute" }}
          >
            Load video
          </Button>
        </div>
      ) : (
        <div style={{ width: "70vw", height: "39.5vw" }}>
          <iframe
            src={video}
            width="100%"
            height="100%"
            frameBorder="0"
            autoPlay
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen *"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
}
