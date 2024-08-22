import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./Card";
import { throttle } from "./assets/helpers";
import { GIF_LENGTH } from "./assets/constants";

function App() {
  const [isMoving, setIsMoving] = useState(true);
  const [movement, setMovement] = useState({});

  const handleGifPlay = (a) => {
    const movementThreshold = 2;
    let intervalId;
    if (
      !isMoving &&
      (parseInt(a?.x) > movementThreshold ||
        parseInt(a?.y) > movementThreshold ||
        parseInt(a?.z) > movementThreshold)
    ) {
      clearTimeout(intervalId);
      setIsMoving(true);
      intervalId = setTimeout(() => {
        setIsMoving(false);
      }, GIF_LENGTH);
    }
  };

  useEffect(() => {
    throttle(handleGifPlay, GIF_LENGTH)(movement);
  }, [movement]);
  useEffect(() => {
    const updateMovements = (e) => {
      setMovement({
        x: e?.acceleration?.x,
        y: e?.acceleration?.y,
        z: e?.acceleration?.z,
      });
    };
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", updateMovements);
    } else {
      console.log("DeviceMotion API is not supported in this browser.");
    }

    return () => {
      window.removeEventListener("devicemotion", updateMovements);
    };
  }, []);

  return (
    <>
      <div className="w-dvw min-h-dvh align-middle flex flex-col justify-center items-center bg-black">
        <div className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({length:50},() => (<Card
            data={{
              url: "https://europe1.discourse-cdn.com/figma/original/3X/7/1/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",
              alt: "Jake The Dog Dancing",
            }}
            isMoving={isMoving}
            setIsMoving={setIsMoving}
            className="p-4"
          />))}
        </div>
      </div>
    </>
  );
}

export default App;
