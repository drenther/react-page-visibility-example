import React, { Component } from "react";

class Video extends Component {
  videoRef = React.createRef();

  componentDidMount() {
    // video autoplay without user interaction throws error in Safari
    try {
      this.videoRef.current.play();
    } catch (err) {
      console.error(err);
    }
  }

  componentDidUpdate(prevProps) {
    const video = this.videoRef.current;
    if (this.props.active) video.play();
    if (!this.props.active) video.pause();
  }

  render() {
    return (
      <video ref={this.videoRef}>
        <source type="video/mp4" src={this.props.src} />
      </video>
    );
  }
}

export default Video;
