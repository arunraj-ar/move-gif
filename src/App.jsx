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
  const [movement, setMovement] = useState({});
  const isMovingRef = useRef(isMoving);

  const handleGifPlay = (a) => {
    console.log("trying to play gif: ",a)
    const movementThreshold = 10;
    if(parseInt(a?.x) > movementThreshold ||
    parseInt(a?.y) > movementThreshold ||
    parseInt(a?.z) > movementThreshold) {
      setIsMoving(true);
    }
  }

  // useEffect(() => {
  //   isMovingRef.current = isMoving;
  // }, [isMoving]);

  useEffect(() => {
    console.log("trying to play gif: ",movement)
    // document.getElementsByTagName(
    //   "p"
    // )[0].innerHTML = `${JSON.stringify(movement)}`;
    throttle(handleGifPlay,3860)(movement)
  }, [movement])
  useEffect(() => {
    // const handleDeviceMotion = (e) => {
    //   const acceleration = e.acceleration;
    //   const movementThreshold = 10;



    //   // document.getElementsByTagName(
    //   //   "p"
    //   // )[0].innerHTML = `hello Acceleration (X): ${e?.acceleration?.x}<br>
    //   //   Acceleration (Y): ${e?.acceleration?.y}<br>
    //   //   Acceleration (Z): ${e?.acceleration?.z}<br>
    //   //   Acceleration including Gravity (X): ${e?.accelerationIncludingGravity?.x}<br>
    //   //   Acceleration including Gravity (Y): ${e?.accelerationIncludingGravity?.y}<br>
    //   //   Acceleration including Gravity (Z): ${e?.accelerationIncludingGravity?.z}<br>
    //   //   Rotation Rate (Alpha): ${e?.rotationRate?.alpha}<br>
    //   //   Rotation Rate (Beta): ${e?.rotationRate?.beta}<br>
    //   //   Rotation Rate (Gamma): ${e?.rotationRate?.gamma}<br>
    //   //   Interval: ${e?.interval}`;


    //   let timeoutId;
    //   if (
    //     !isMovingRef.current &&
    //     (parseInt(acceleration.x) > movementThreshold ||
    //       parseInt(acceleration.y) > movementThreshold ||
    //       parseInt(acceleration.z) > movementThreshold)
    //   ) {
    //     clearTimeout(timeoutId);
    //     setIsMoving(true);

    //     timeoutId = setTimeout(() => {
    //       setIsMoving(false);
    //     }, 3860);
    //   }
    // };

    // const throttledMotion = throttle(handleDeviceMotion, 3860);

    const updateMovements = (e) => {
      document.getElementsByTagName(
        "p"
      )[0].innerHTML = `${e?.acceleration?.x}`;
      setMovement({...e?.acceleration})
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
