import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card } from "./Card";

function App() {
  const [isMoving, setIsMoving] = useState(false);
  const isMovingRef = useRef(isMoving);

  useEffect(() => {
    isMovingRef.current = isMoving;
  }, [isMoving]);
  useEffect(() => {
    const handleDeviceMotion = (e) => {
      window.alert(">>>handling device motion")
      const acceleration = e.accelerationIncludingGravity;
      const movementThreshold = 2;

      if (
        !isMovingRef.current &&
        (Math.abs(acceleration.x) > movementThreshold ||
          Math.abs(acceleration.y) > movementThreshold ||
          Math.abs(acceleration.z) > movementThreshold)
      ) {
        setIsMoving(true);

        setTimeout(() => {
          setIsMoving(true);
        }, 5000);
      }
    };

    if(window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleDeviceMotion);
    } else {
      console.log("DeviceMotion API is not supported in this browser.");
    }

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
    }
  }, []);

  return (
    <>
      <Card
        data={{
          url: "https://europe1.discourse-cdn.com/figma/original/3X/7/1/7105e9c010b3d1f0ea893ed5ca3bd58e6cec090e.gif",
          alt: "Jake The Dog Dancing",
        }}
        isMoving
      />
    </>
  );
}

export default App;
