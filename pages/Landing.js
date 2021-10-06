import Head from 'next/head'
import Image from 'next/image'
import { useState,useRef, useEffect } from "react";
// import Formpopup from './FormPopup';
// import useHook from './hook';

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

   const [isActive, setActive] = useState(false);
     const handleClick = () =>{
        setActive(!isActive);
      }
      const [hiddenClass, setActiveClass] = useState(false);
      const handleFormClick = (e) =>{
         setActiveClass(!hiddenClass);
        console.log("Form Handled");
        e.preventDefault();
      }
  return (
    <div>
        <div className="landing" >
            <section className={`landing_seaction_1 ${isActive ? "danger" : "hidden"}`}>
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
         <div  className="form_popup " id={isActive ? "danger" : "hidden"}>
            <div className="form_popup_container">
                <div className="form_popup_container_wrapper">
                    <div className="form_popup_container_wrapper_side_1">

                    </div>
                    <div className="form_popup_container_wrapper_side_2">
                        <span className="form_popup_container_wrapper_side_2_hello">
                            Hello!
                        </span>
                        <span className="form_popup_container_wrapper_side_2_hello1">
                            We are glad to see you :)
                            </span>
                            <form className="form_popup_container_wrapper_side_2_form" >
                                <label className="form_popup_container_wrapper_side_2_label fidst">Firstname</label>
                                <input type="text" placeholder="Enter Firstname..." name="fullname" className="form_popup_container_wrapper_side_2_input fdirst" />

                                <label className="form_popup_container_wrapper_side_2_label">Lastname</label>
                                <input type="text" placeholder="Enter Lastname..." name="fullname" className="form_popup_container_wrapper_side_2_input" />
                                <br></br>
                                <label className="form_popup_container_wrapper_side_2_label">Email Adress</label>
                                <input type="email" placeholder="Enter Email address..." name="fullname" className="form_popup_container_wrapper_side_2_input" />

                                <label className="form_popup_container_wrapper_side_2_label">Gender</label>
                                <select className="form_popup_container_wrapper_side_2_select">
                                    <option value>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <br></br>
                                <label className="form_popup_container_wrapper_side_2_label ladst">Phone Number</label>
                                <input type="text" placeholder="07xxxxxxx" name="phone_number" className="form_popup_container_wrapper_side_2_input ladst" />
                                <button className="form_popup_container_wrapper_side_2_btn" onClick={handleFormClick}> Register / Book </button>
                                
                            </form>
                            <div className="form_popup_container_wrapper_footer">
                            Would you give us a chance to train YOU and/or YOUR Domestic 
                          Manager to transform and sparkle up your space like pro ? 
                            </div>

                            <div className="form_popup_container_wrapper_sub"  id={hiddenClass ? "danger" : "hidden"}>
                                <div className="form_popup_container_wrapper_sub_wrapper">
                                    <h1 className="form_popup_container_wrapper_sub_wrapper_h1">Proceed to Payment</h1>

                                    <p className="form_popup_container_wrapper_sub_wrapper_span"> 
                                        Would you give us a chance to train YOU and/or YOUR Domestic 
                                        Manager to transform and sparkle up your space like pro ?  
                                    </p>
                                    <form>
                                    <label className="form_popup_container_wrapper_side_2_label ladst">Phone Number</label>
                                <input type="text" placeholder="07xxxxxxx" name="phone_number" className="form_popup_container_wrapper_side_2_input ladst" />
                                <button className="form_popup_container_wrapper_side_2_btn"> Register / Book </button>
                                        
                                    </form>
                                </div>
                            </div>
                        
                    </div>
                </div>
        </div>
    </div>
    </div>
    
  )
}
