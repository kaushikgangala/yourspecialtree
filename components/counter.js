// "use client"; // Ensure this runs client-side
// import { useState, useEffect } from "react";

// export default function DiscountCounter() {
//   // State variables for hours, minutes, and seconds
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(15);
//   const [seconds, setSeconds] = useState(5);

//   // Load values from localStorage or set default values
//   useEffect(() => {
//     const storedHours = localStorage.getItem("hours");
//     const storedMinutes = localStorage.getItem("minutes");
//     const storedSeconds = localStorage.getItem("seconds");

//     setHours(Number(storedHours) || 0);
//     setMinutes(Number(storedMinutes) || 29);
//     setSeconds(Number(storedSeconds) || 53);
//   }, []);

//   // Timer logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds > 0) {
//           return prevSeconds - 1;
//         } else {
//           setMinutes((prevMinutes) => {
//             if (prevMinutes > 0) {
//               return prevMinutes - 1;
//             } else {
//               setHours((prevHours) => {
//                 if (prevHours > 0) {
//                   setMinutes(59); // Reset minutes to 59
//                   return prevHours - 1;
//                 } else {
//                   // Reset the timer when it reaches 0:0:0
//                   setMinutes(29);
//                   setSeconds(53);
//                   return 0;
//                 }
//               });
//               return 59; // Reset seconds to 59 if minutes are reduced
//             }
//           });
//           return 59; // Reset seconds to 59 when transitioning
//         }
//       });
//     }, 1000);

//     // Cleanup on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   // Save to localStorage whenever the state changes
//   useEffect(() => {
//     localStorage.setItem("hours", hours);
//     localStorage.setItem("minutes", minutes);
//     localStorage.setItem("seconds", seconds);
//   }, [hours, minutes, seconds]);

//   // Format time for display
//   const formatTime = (value) => (value < 10 ? `0${value}` : value);

//   return (
//     <div
//       className="bg-white text-center pt-2 sticky top-0 z-10 pb-2 pl-8 pr-8  w-full "
//       style={{ color: "red" }}
//     >
//       {hours === 0 && minutes === 0 && seconds === 0 ? (
//         <h1 id="counter1" className="text-xl font-semibold">
//           COUPON RE-APPLIED
//         </h1>
//       ) : (
//         <h1 id="counter1" className="text-sm font-medium">
//           50% OFF - DISCOUNT ENDS IN:{" "}
//           <span className="text-xl font-semibold">
//             {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
//           </span>
//         </h1>
//       )}
//     </div>
//   );
// }

"use client"; // Ensure this runs client-side
import { useReducer, useEffect } from "react";

// Initial timer state
const initialState = {
  hours: 0,
  minutes: 15,
  seconds: 9,
};

// Reducer function to handle timer logic
function timerReducer(state, action) {
  switch (action.type) {
    case "TICK":
      if (state.seconds > 0) {
        return { ...state, seconds: state.seconds - 1 };
      } else if (state.minutes > 0) {
        return { ...state, minutes: state.minutes - 1, seconds: 59 };
      } else if (state.hours > 0) {
        return { hours: state.hours - 1, minutes: 59, seconds: 59 };
      } else {
        // Reset timer when it reaches 0:0:0
        return { hours: 0, minutes: 29, seconds: 53 };
      }
    default:
      return state;
  }
}

export default function DiscountCounter() {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Load timer state from localStorage or set defaults
  useEffect(() => {
    const storedHours = localStorage.getItem("hours");
    const storedMinutes = localStorage.getItem("minutes");
    const storedSeconds = localStorage.getItem("seconds");

    if (storedHours || storedMinutes || storedSeconds) {
      dispatch({
        type: "LOAD",
        payload: {
          hours: Number(storedHours) || 0,
          minutes: Number(storedMinutes) || 29,
          seconds: Number(storedSeconds) || 53,
        },
      });
    }
  }, []);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("hours", state.hours);
    localStorage.setItem("minutes", state.minutes);
    localStorage.setItem("seconds", state.seconds);
  }, [state]);

  // Format time for display
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div
      className="bg-white text-center pt-2 sticky top-0 z-10 pb-2 pl-8 pr-8 w-full"
      style={{ color: "red" }}
    >
      {state.hours === 0 && state.minutes === 0 && state.seconds === 0 ? (
        <h1 id="counter1" className="text-xl font-semibold">
          COUPON RE-APPLIED
        </h1>
      ) : (
        <h1 id="counter1" className="text-sm font-medium">
          50% OFF - DISCOUNT ENDS IN:{" "}
          <span className="text-xl font-semibold">
            {formatTime(state.hours)}:{formatTime(state.minutes)}:
            {formatTime(state.seconds)}
          </span>
        </h1>
      )}
    </div>
  );
}
