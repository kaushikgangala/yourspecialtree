"use client"; // Ensure this runs client-side
import { useState, useEffect } from "react";

export default function DiscountCounter() {
  // State variables for hours, minutes, and seconds
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(29);
  const [seconds, setSeconds] = useState(53);

  // Load values from localStorage or set default values
  useEffect(() => {
    const storedHours = localStorage.getItem("hours");
    const storedMinutes = localStorage.getItem("minutes");
    const storedSeconds = localStorage.getItem("seconds");

    setHours(Number(storedHours) || 0);
    setMinutes(Number(storedMinutes) || 29);
    setSeconds(Number(storedSeconds) || 53);
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) return prevSeconds - 1;

        setMinutes((prevMinutes) => {
          if (prevMinutes > 0) return prevMinutes - 1;

          setHours((prevHours) => {
            if (prevHours > 0) return prevHours - 1;

            // Reset the timer when it reaches 0:0:0
            setHours(0);
            setMinutes(29);
            setSeconds(53);
            return 0;
          });

          return 59;
        });

        return 59;
      });
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  // Save to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("hours", hours);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
  }, [hours, minutes, seconds]);

  // Format time for display
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="bg-white text-red-600 text-center pt-2 sticky top-0 z-10 pb-2 pl-8 pr-8 rounded-lg shadow-lg w-full max-w-sm mx-auto">
      {hours === 0 && minutes === 0 && seconds === 0 ? (
        <h1 id="counter1" className="text-3xl font-semibold">
          COUPON RE-APPLIED
        </h1>
      ) : (
        <h1 id="counter1" className="text-sm font-semibold">
          50% OFF - DISCOUNT ENDS IN:{" "}
          <span className="text-3xl font-extrabold">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </span>
        </h1>
      )}
    </div>
  );
}
