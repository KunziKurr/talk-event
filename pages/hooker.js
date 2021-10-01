import { useState,useRef } from "react";

const UseTimer = () =>{
    const countDownDate = new Date("Oct 3, 2021 15:37:25").getTime();
// UPDATE COUNTDOWN EVERY SECOND
const Timer = '';
    const x = setInterval(() => {
      var now = new Date().getTime();
      let difference = countDownDate - now;
      let days = Math.floor(difference/(1000*60*60*24));
      let hours = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);

      var Timer = days  + 'd' + hours + "Hours" + minutes + "Minutes" + seconds;

      // console.log(Timer)
      return Timer;
    }, 1000);
};
export default UseTimer;