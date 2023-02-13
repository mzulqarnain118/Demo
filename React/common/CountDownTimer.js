import React, { useEffect } from "react";

const CountDownTimer = ({
  minutes = 0,
  seconds = 0,
  over,
  setOver,
  again,
  setAgain
}) => {
  const [time, setTime] = React.useState({
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  });

  const tick = () => {
    if (over) return;

    if (time.minutes == 0 && time.seconds == 0) setOver(true);
    else if (time.minutes == 0 && time.seconds == 0)
      setTime({
        minutes: 59,
        seconds: 59
      });
    else if (time.seconds == 0)
      setTime({
        minutes: time.minutes - 1,
        seconds: 59
      });
    else
      setTime({
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
  };
  useEffect(() => {
    if (again && !over) {
      setTime({
        minutes: 1,
        seconds: 30
      });
      setAgain(false);
    }
  }, [over, again]);

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      {over ? (
        <p
          style={{ fontFamily: "roboto-regular", fontSize: 16, marginLeft: 10 }}
        >
          {" "}
          Time's up!{" "}
        </p>
      ) : (
        <p
          style={{ fontFamily: "roboto-regular", fontSize: 16, marginLeft: 10 }}
        >{`${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
      )}
    </div>
  );
};

export default CountDownTimer;

//**TODO CALLING WAY*/
{/* 
<div
        style={{
          marginTop: 15,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          gridTemplateColumns: "auto"
        }}
      >
        <img
          src="images/clockk.svg"
          style={{ textAlign: "center" }}
          alt="Demo"
        />{" "}
        <CountDown
          minutes={0}
          seconds={5}
          over={over}
          setOver={setOver}
          disableNextLesson={disableNextLesson}
          again={again}
          setAgain={setAgain}
        />
      </div>
    */}
