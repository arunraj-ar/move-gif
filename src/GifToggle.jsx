import React, { useEffect, useRef, useState } from 'react';

const GifToggle = ({ gifUrl }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = gifUrl;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const handleDeviceMotion = (event) => {
      alert("device moved")
      const acceleration = event.accelerationIncludingGravity;
      const movementThreshold = 2;

      if (
        Math.abs(acceleration.x) > movementThreshold ||
        Math.abs(acceleration.y) > movementThreshold ||
        Math.abs(acceleration.z) > movementThreshold
      ) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    } else {
      alert('DeviceMotionEvent is not supported on your device.');
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [gifUrl]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        style={{ display: isPlaying ? 'none' : 'block' }}
      />
      <img
        src={gifUrl}
        alt="GIF"
        style={{ display: isPlaying ? 'block' : 'none', width: '300px', height: '300px' }}
      />
    </div>
  );
};

export default GifToggle;
