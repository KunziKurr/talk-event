import Head from 'next/head'
import Image from 'next/image'
import { useState,useRef, useEffect } from "react";
import Formpopup from './FormPopup';
import useHook from './hook';

function Countet() {
    const countDownDate = new Date("Oct 1, 2021 15:37:25").getTime();
     
      var now = new Date().getTime();
      let difference = countDownDate - now;
      let days = Math.floor(difference/(1000*60*60*24));
      let hours = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);
      var Timer = days  + 'Days' + hours + "Hours" + minutes + "Minutes" + seconds + 'Seconds';

      // console.log(Timer)
      // return <h1> {Timer}</h1>;
    // }, 1000);
    const [count, setCount] = useState(0);
      useInterval(() => {
        // Your custom logic here
        setCount(seconds, minutes );
      }, 1000);
  return <h1>   {days + ' days'} {hours +' hrs'} {minutes + ' min'} {seconds + " s"} </h1>;
  


  function useInterval(callback, delay) {
      const savedCallback = useRef();
      // Remember the latest function.
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);

      // Set up the interval.
      useEffect(() => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
  }, [delay]);
}
      
}

export default function Landing() {
  const {handleClick,isActive, setActive} = useHook();
     
  return (
    <div>
        <div className="landing" >
            <section className="landing_seaction_1">
            {/* <video autoPlay muted loop className="V">
              <source src="../assets/video/Vid1.mp4" type="video/mp4"/>
            </video> */}
                    <h1 className="landing_seaction_1_title">Cleaning Time !!</h1>
                    <span className="landing_seaction_1_span"> 
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s </span>
                    <div className="landing_seaction_1_sub_sect"> 
                      <div className="landing_seaction_1_sub_sect_wrapper">
                      <span className="landing_seaction_1_sub_sect_heading"> How clean is your home ?</span>
                        <p className="landing_seaction_1_sub_sect_p"> 
                          Would you give us a chance to train YOU and/or YOUR Domestic 
                          Manager to transform and sparkle up your space like pro ? </p>
                        <span className="landing_seaction_1_sub_sect_b_text"> For only 300/- Join us on the 15th Oct From 9:30 am from transformative session </span>
                        <span className="landing_seaction_1_sub_sect_footer_text"> Get Value for you money... </span>
                        <button className="landing_seaction_1_sub_sect_register" onClick={handleClick}> REGISTER NOW</button>
                      </div>
                    </div>
            </section>
            <section className= "landing_section_2">
              <div className={isActive ? "hidden" : "active"}></div>

            <div className="landing_section_2_wrapper_1">
            <span className="landing_section_2_wrapper_1_heading"> About Event </span>
            <p className="landing_section_2_wrapper_1_p">  
              Would you give us a chance to train YOU and/or YOUR Domestic 
                          Manager to transform and sparkle up your space like pro ?
            </p>
            </div> 
              <div className="landing_section_2_wrapper_1">
            <span className="landing_section_2_wrapper_1_heading"> Where ? </span>
            <p className="landing_section_2_wrapper_1_p">  
             Would you give us a chance to train YOU and/or YOUR Domestic 
                          Manager to transform and sparkle up your space like pro ?500s
            </p>
            </div> 
              <div className="landing_section_2_wrapper_1">
            <span className="landing_section_2_wrapper_1_heading">Date </span>
              <p className="landing_section_2_wrapper_1_p">  
            <Countet />
            </p>
               <button className="landing_seaction_1_sub_sect_register" onClick={handleClick}> BOOK NOW</button>
          
            </div> 
            
        
               
            </section>
        </div>
        <Formpopup />/
    </div>
    
  )
}
