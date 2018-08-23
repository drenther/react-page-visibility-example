import React, { Component } from "react";

class Video extends Component {
  videoRef = React.createRef();

  // Safari won't allow playing the video without user interaction
  componentDidUpdate() {
    const video = this.videoRef.current;
    if (this.props.active) video.play();
    else video.pause();
  }

  render() {
    return (
      <video autoPlay ref={this.videoRef}>
        <source type="video/mp4" src={this.props.src} />
      </video>
    );
  }
}

export default Video;
