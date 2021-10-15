import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const io = require('socket.io-client');
const socket = io.connect('https://talk-event.vercel.app/');
const transformPhoneNumber = require('../lib/transformPhone');

const baseURL = './api/user/';

function Countet() {
  const countDownDate = new Date('Oct 1, 2021 15:37:25').getTime();

  var now = new Date().getTime();
  let difference = countDownDate - now;
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var Timer =
    days + 'Days' + hours + 'Hours' + minutes + 'Minutes' + seconds + 'Seconds';

  // console.log(Timer)
  // return <h1> {Timer}</h1>;
  // }, 1000);
  const [count, setCount] = useState(0);
  useInterval(() => {
    // Your custom logic here
    setCount(seconds, minutes);
  }, 1000);
  return (
    <h1>
      {' '}
      {days + ' days'} {hours + ' hrs'} {minutes + ' min'} {seconds + ' s'}{' '}
    </h1>
  );

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
  // POPUP BOXES HIDE/SHOW
  const [isActive, setActive] = useState(false);
  const [hideSpinner, setSpinner] = useState('hidden');
  const [hideSucess, setSuccess] = useState('hidden');

  const [erros, setErrors] = useState({});
  const handleClick = () => {
    setActive(!isActive);
  };
  const [hiddenClass, setActiveClass] = useState(false);

  // POPUP BOXES HIDE/SHOW
  //FORM HANDLING

  const handleFormClick = (e) => {
    setActiveClass(!hiddenClass);
    console.log('Form Handled');
    e.preventDefault();
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
  });
  // const handleBlur = evt =>{
  //   const {name, value} =evt.target;
  // }

  const updateFormData = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  //FORM VALIDATION
  const validate = (values) => {
    const errors = {};
    //FIRSTNAME VALIDATION
    if (!values.firstName) {
      errors.firstName = 'Firstname is required';
    } else if (values.firstName.length < 4) {
      errors.firstName = 'Must me more than 4chars';
    }
    // LAST NAME VALIDATION
    if (!values.lastName) {
      errors.lastName = 'Lastname is required';
    } else if (values.lastName.length < 4) {
      errors.lastName = 'Must me more than 4chars';
    }
    // EMAIL VALIDATION
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (values.email.length < 4) {
      errors.email = 'Email Must me more than 4chars';
    }
    // PHONE NUMBER
    // EMAIL VALIDATION
    if (!values.phone_number) {
      errors.phone_number = 'Phone Number is required';
    } else if (values.email.length < 4) {
      errors.phone_number = 'Phone Number Must me more than 4chars';
    }
    return errors;
  };
  const [post, setPost] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone_number: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      console.log(values);
      setActiveClass(!hiddenClass);
    },
  });

  const [btntext, setBtnText] = useState('Make Payment');
  const pushStk = async (e) => {
    setBtnText('Processing, please wait...');
    setSpinner('active');
    e.preventDefault();
    console.log(formik);
    try {
      const response = await axios.post('/api/lnm', {
        phone: transformPhoneNumber(formik.values.phone_number),
      });
      if (response.status === 200) {
        socket.on('CONNECTION_STATUS', (message) => {
          console.log(message);
        });
        // Listen to callback
        socket.on(
          transformPhoneNumber(formik.values.phone_number),
          async (data) => {
            console.log(data);
            const registerResponse = await axios.post('/api/user', {
              ...formik.values,
              phone_number: transformPhoneNumber(formik.values.phone_number),
              transactionReceipt: data.receiptNumber[0].Value,
            });

            const respData = registerResponse.data;
            setBtnText('Make Payment');
            if (respData.success) {
              // Notify client of success and close the modal;
              setSpinner('hidden');
              setSuccess('active');
            } else {
              // Notify client of failure and ask them to retry
            }
          }
        );

        socket.on('TRANSACTION_STATUS', (message) => {
          console.log(message);
        });
      } else {
        console.log(response);
      }
    } catch (error) {
      ;
    }
  };
  const handleClose = (e) =>{
    e.preventDefault();
    setActiveClass(!hiddenClass);
    setActive(!isActive);
    setSpinner('hidden');
  }
  

  // POPUP BOXES HIDE/SHOW
  return (
    <div>
      <div className="landing">
        <section
          className={`landing_seaction_1 ${isActive ? 'danger' : 'hidden'}`}
        >
          {/* <video autoPlay muted loop className="V">
              <source src="../assets/video/Vid1.mp4" type="video/mp4"/>
            </video> */}
          <h1 className="landing_seaction_1_title">Cleaning Time !!</h1>
          <span className="landing_seaction_1_span">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s{' '}
          </span>
          <div className="landing_seaction_1_sub_sect">
            <div className="landing_seaction_1_sub_sect_wrapper">
              <span className="landing_seaction_1_sub_sect_heading">
                {' '}
                How clean is your home ?
              </span>
              <p className="landing_seaction_1_sub_sect_p">
                Would you give us a chance to train YOU and/or YOUR Domestic
                Manager to transform and sparkle up your space like pro ?{' '}
              </p>
              <span className="landing_seaction_1_sub_sect_b_text">
                {' '}
                For only 300/- Join us on the 15th Oct From 9:30 am from
                transformative session{' '}
              </span>
              <span className="landing_seaction_1_sub_sect_footer_text">
                {' '}
                Get Value for you money...{' '}
              </span>
              <button
                className="landing_seaction_1_sub_sect_register"
                onClick={handleClick}
              >
                {' '}
                REGISTER NOW
              </button>
            </div>
          </div>
        </section>
        <section className="landing_section_2">
          <div className="landing_section_2_wrapper_1">
            <span className="landing_section_2_wrapper_1_heading">
              {' '}
              About Event{' '}
            </span>
            <p className="landing_section_2_wrapper_1_p">
              Would you give us a chance to train YOU and/or YOUR Domestic
              Manager to transform and sparkle up your space like pro ?
            </p>
          </div>
          <div className="landing_section_2_wrapper_1">
            <span className="landing_section_2_wrapper_1_heading">
              {' '}
              Where ?{' '}
            </span>
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
            <button
              className="landing_seaction_1_sub_sect_register"
              onClick={handleClick}
            >
              {' '}
              BOOK NOW
            </button>
          </div>
        </section>
      </div>
      <button onClick={handleClose} id={isActive ? 'danger' : 'hidden'} className="close">X</button>
      <div className="loading_container" id={hideSpinner}>
        <div className="loading_container_wrapper">
          <span>Loading</span>
        <div className="loader">Loading ...</div>
        </div>
      </div>
      <div className="form_popup " id={isActive ? 'danger' : 'hidden'}>
        <div className="form_popup_container">
          <div className="form_popup_container_wrapper">
            <div className="form_popup_container_wrapper_side_1"></div>
            <div className="form_popup_container_wrapper_side_2">
              <span className="form_popup_container_wrapper_side_2_hello">
                Hello!
              </span>
              <span className="form_popup_container_wrapper_side_2_hello1">
                We are glad to see you :)
              </span>
              <form
                className="form_popup_container_wrapper_side_2_form"
                onSubmit={formik.handleSubmit}
              >
                <div className="form_popup_container_wrapper_side_2_form_form_container">
                  <label className="form_popup_container_wrapper_side_2_label fidst">
                    Firstname
                  </label>
                  {/* {firstNameRrr} */}
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Firstname..."
                    name="firstName"
                    className="form_popup_container_wrapper_side_2_input fdirst"
                  />
                  {formik.errors.firstName ? (
                    <div className="form_error"> {formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="form_popup_container_wrapper_side_2_form_form_container">
                  <label className="form_popup_container_wrapper_side_2_label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    placeholder="Enter Lastname..."
                    name="lastName"
                    className="form_popup_container_wrapper_side_2_input"
                  />
                  {formik.errors.lastName ? (
                    <div className="form_error"> {formik.errors.lastName}</div>
                  ) : null}
                </div>
                <br></br>
                <div className="form_popup_container_wrapper_side_2_form_form_container">
                  <label className="form_popup_container_wrapper_side_2_label">
                    Email Adress
                  </label>
                  <input
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Email address..."
                    name="email"
                    className="form_popup_container_wrapper_side_2_input"
                  />
                  {formik.errors.email ? (
                    <div className="form_error"> {formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form_popup_container_wrapper_side_2_form_form_container">
                  <label className="form_popup_container_wrapper_side_2_label">
                    Gender
                  </label>
                  <select className="form_popup_container_wrapper_side_2_select">
                    <option value>Gender</option>
                    <option value="">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <br></br>
                <div className="form_popup_container_wrapper_side_2_form_form_container">
                  <label className="form_popup_container_wrapper_side_2_label ladst">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    onBlur={formik.handleBlur}
                    placeholder="07xxxxxxx"
                    name="phone_number"
                    className="form_popup_container_wrapper_side_2_input ladst"
                  />
                  {formik.errors.phone_number ? (
                    <div className="form_error">
                      {' '}
                      {formik.errors.phone_number}
                    </div>
                  ) : null}
                </div>
                <button className="form_popup_container_wrapper_side_2_btn">
                  {' '}
                  Next{' '}
                </button>
              </form>
              <div className="form_popup_container_wrapper_footer">
                Would you give us a chance to train YOU and/or YOUR Domestic
                Manager to transform and sparkle up your space like pro ?
              </div>
              

              <div
                className="form_popup_container_wrapper_sub"
                id={hiddenClass ? 'danger' : 'hidden'}
              >
                <div className="form_popup_container_wrapper_sub_wrapper">
                  <h1 className="form_popup_container_wrapper_sub_wrapper_h1">
                    Payment details
                  </h1>

                  <p className="form_popup_container_wrapper_sub_wrapper_span">
                    Please click make payment to complete your registration.{' '}
                    <br />
                    Check on your phone for an mpesa popup(STK) requesting to
                    pay an amount of KES 300. <br />
                    Do not exit page until you see a payment successful message.
                  </p>
                  <form>
                    <label className="form_popup_container_wrapper_side_2_label ladst">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.phone_number}
                      placeholder="07xxxxxxx"
                      name="phone_number"
                      className="form_popup_container_wrapper_side_2_input ladst"
                    />
                    {formik.errors.phone_number ? (
                      <div className="form_error_no">
                        {' '}
                        {formik.errors.phone_number}
                      </div>
                    ) : null}
                    <button
                      onClick={pushStk}
                      className="form_popup_container_wrapper_side_2_btn"
                    >
                      {btntext}
                    </button>
                  </form>
                </div>
              </div>
            
            </div>
            
          </div>
        </div>
      </div>
      <div className="success_dialog" id={hideSucess}>
              <div className="success_dialog_wrapper">
                Sucess
              </div>
            </div>
    </div>
  );
}
