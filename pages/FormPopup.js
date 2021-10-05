import Head from 'next/head'
import Image from 'next/image'
import React, { useRef, useState }  from 'react';
import useHook from './hook';

export default function Formpopup() {
  const {handleClick,isActive, setActive} = useHook();
    return(
    <div  className="form_popup " id={isActive ? "hidden" : "active"}>
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
                                <button className="form_popup_container_wrapper_side_2_btn"> Register / Book </button>
                                
                            </form>
                            <div className="form_popup_container_wrapper_footer">
                            Would you give us a chance to train YOU and/or YOUR Domestic 
                          Manager to transform and sparkle up your space like pro ? 
                            </div>

                            <div className="form_popup_container_wrapper_sub hidden_inn " className={isActive ? "hidden" : "active"}>
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
    )
}