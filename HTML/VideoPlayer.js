function VideoPlayer ({src,thumbnail,autoplay,loop,muted,controls,width}) {
  return (
    <div>
   <video
        poster={thumbnail}
        autoplay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        width={width}
        height={width}
      >
        <source src={src} />
      </video>
    </div>
  )
}

export default VideoPlayer

//**TODO CALLING WAY*/
{/* 
<video
        poster="thumbnail pic"
        autoplay="autoplay"
        loop="loop"
        muted="true"
        controls="controls"
        width="1280px"
        height="500px"
      >
        <source src="videos/home.mp4" />
      </video> 
    */}