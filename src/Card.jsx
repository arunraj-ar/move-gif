import { useEffect, useRef, useState } from "react";
import "./App.css";
export const Card = ({ data = {}, isMoving = false }) => {
  const [imgDimensions, setImgDimensions] = useState({ w: 300, h: 300 });
  const canvasRef = useRef(null);
  const { url, alt } = data;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = url;

    img.onload = () => {
      setImgDimensions({ w: img.width, h: img.height });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }, []);
  return (
    <div className={`border p-10`}>
      <img src={url} alt={alt} className={`${isMoving? 'visible': 'hidden'}`} />
      <canvas
        ref={canvasRef}
        className={`${isMoving? 'hidden': 'visible'}`}
      />
    </div>
  );
};
