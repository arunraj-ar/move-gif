import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./Card";

const throttle = (func, limit) => {
  let flag = true;
  return (e) => {
    if (flag) {
      func(e);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

function App() {
  const [isMoving, setIsMoving] = useState(false);
  const [movement, setMovement] = useState({});

  const handleGifPlay = (a) => {
    const movementThreshold = 2;
    let intervalId;
    if (!isMoving&& (parseInt(a?.x) > movementThreshold ||
    parseInt(a?.y) > movementThreshold ||
    parseInt(a?.z) > movementThreshold)) {
      clearTimeout(intervalId);
      setIsMoving(true);
      intervalId = setTimeout(() => {
        setIsMoving(false);
      }, 3860);
    }
  }

  useEffect(() => {
    throttle(handleGifPlay,3860)(movement)
  }, [movement])
  useEffect(() => {
    const updateMovements = (e) => {
      setMovement({x:e?.acceleration?.x, y:e?.acceleration?.y, z:e?.acceleration?.z})
    }
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
    <p></p>
      <h1>hello</h1>
      <Card
        data={{
          url: "https://europe1.discourse-cdn.com/figma/original/3X/7/1/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",
          alt: "Jake The Dog Dancing",
        }}
        isMoving={isMoving}
      />
    </>
  );
}

export default App;
