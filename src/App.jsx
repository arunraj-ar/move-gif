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
    let count = 0;
    const handleDeviceMotion = (e) => {
      document.getElementsByTagName(
        "h1"
      )[0].innerHTML = `hello ${count++}, ${JSON.stringify(e)}`;
      // const acceleration = e.accelerationIncludingGravity;
      // const movementThreshold = 5;

      let timeoutId;
      if (
        !isMovingRef.current //&&
        // (Math.abs(acceleration.x) > movementThreshold ||
        //   Math.abs(acceleration.y) > movementThreshold ||
        //   Math.abs(acceleration.z) > movementThreshold)
      ) {
        clearTimeout(timeoutId);
        setIsMoving(true);

        timeoutId = setTimeout(() => {
          setIsMoving(false);
        }, 3860);
      }
    };

    const throttledMotion = throttle(handleDeviceMotion, 3860);

    const dummyFunction = (e) => {
      document.getElementsByTagName(
        "h1"
      )[0].innerHTML = `hello Acceleration (X): ${e?.acceleration?.x}<br>
        Acceleration (Y): ${e?.acceleration?.y}<br>
        Acceleration (Z): ${e?.acceleration?.z}<br>
        Acceleration including Gravity (X): ${e?.accelerationIncludingGravity?.x}<br>
        Acceleration including Gravity (Y): ${e?.accelerationIncludingGravity?.y}<br>
        Acceleration including Gravity (Z): ${e?.accelerationIncludingGravity?.z}<br>
        Rotation Rate (Alpha): ${e?.rotationRate?.alpha}<br>
        Rotation Rate (Beta): ${e?.rotationRate?.beta}<br>
        Rotation Rate (Gamma): ${e?.rotationRate?.gamma}<br>
        Interval: ${e?.interval}`;
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", dummyFunction);
    } else {
      console.log("DeviceMotion API is not supported in this browser.");
    }

    return () => {
      window.removeEventListener("devicemotion", dummyFunction);
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
