import { useEffect, useRef, useState } from "react";
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
  const isMovingRef = useRef(isMoving);

  useEffect(() => {
    isMovingRef.current = isMoving;
  }, [isMoving]);
  useEffect(() => {
    const handleDeviceMotion = (e) => {
      const acceleration = e.acceleration;
      const movementThreshold = 1;

      let timeoutId;
      if (
        !isMovingRef.current &&
        (parseInt(acceleration.x) > movementThreshold ||
          parseInt(acceleration.y) > movementThreshold ||
          parseInt(acceleration.z) > movementThreshold)
      ) {
        clearTimeout(timeoutId);
        setIsMoving(true);

        timeoutId = setTimeout(() => {
          setIsMoving(false);
        }, 3860);
      }
    };

    const throttledMotion = throttle(handleDeviceMotion, 3860);


    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", throttledMotion);
    } else {
      console.log("DeviceMotion API is not supported in this browser.");
    }

    return () => {
      window.removeEventListener("devicemotion", throttledMotion);
    };
  }, []);

  return (
    <>
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
