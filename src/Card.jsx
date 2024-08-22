import { useEffect, useRef, useState } from "react";
import "./App.css";
export const Card = ({ data = {}, isMoving = true, setIsMoving }) => {
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

  useEffect(() => {
    if (isMoving) {
      const canvas = canvasRef.current;
      const img = imgRef.current;
      console.log("img.clientwidth: ", img.clientWidth, img.clientHeight);
      document.getElementsByTagName(
        "p"
      )[0].innerHTML = `${img.clientWidth} ${img.clientHeight}`;

      canvas.width = img.clientWidth;
      canvas.height = img.clientHeight;
    }
  }, [isMoving]);
  return (
    <div className={`border p-10`}>
      <p></p>
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
