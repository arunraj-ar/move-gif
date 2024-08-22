import { useEffect, useRef } from "react";
import "./App.css";
export const Card = ({ data = {}, isMoving = true, setIsMoving, onClick }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const { url, alt } = data;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = url;
    const imgTag = imgRef.current;

    img.onload = () => {
      canvas.width = imgTag.clientWidth;
      canvas.height = imgTag.clientHeight;
      ctx.drawImage(img, 0, 0, imgTag.clientWidth, imgTag.clientHeight);
      setIsMoving(false);
    };
  }, []);

  return (
    <div onClick={onClick} className={`border p-4`}>
      <img
        ref={imgRef}
        src={url}
        alt={alt}
        className={`${isMoving ? "visible" : "hidden"}`}
      />
      <canvas
        ref={canvasRef}
        className={`${isMoving ? "hidden" : "visible"}`}
      />
    </div>
  );
};
