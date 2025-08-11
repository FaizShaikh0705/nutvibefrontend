import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaLocationDot, FaPhone, FaSquareInstagram } from "react-icons/fa6";
import { Formik, Field, ErrorMessage } from "formik";
import { publicRequest } from '../../requestMethods';
import { useSelector } from 'react-redux';
import * as Yup from "yup";
import { IoMail } from "react-icons/io5";
import styles from './contact.module.scss'
import Banner from '../home/banner'
import Intro from '../home/intro'
import Special from '../home/special'
import Premium from '../home/premium'
import Intro1 from '../home/intro1'
import Testimony from '../home/testimony'

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}


const Contact = () => {

  const user = useSelector((state) => state.user);

  const handleFormSubmit = async (values, actions) => {
    try {
      await publicRequest.post("/contacts", {
        userId: user.currentUser._id,
        UserName: values.name,
        email: values.email,
        number: values.number,
        message: values.message,
        position: 0,
        status: 1,
      });
      alert("Contact Details submitted successfully.");
      console.log('Form submitted:', values);
      actions.resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };


  return (
    <>
      <Banner />
      <section className={styles.contactSection}>
        <Container>
          <div className={styles.container}>
            {/* Left Info Box */}
            <div className={styles.infoBox}>
              <h3>Contact Information</h3>
              <p>Say something to start a live chat!</p>
              <div className={styles.infoItem}>
                <span>📞</span> +91 8976270971
              </div>
              <div className={styles.infoItem}>
                <span>📧</span> enterprisescrystal046@gmail.com
              </div>
              <div className={styles.infoItem}>
                <span>📍</span> F-44, A.P.M.C, Masala Market,<br />
                Phase-2, Vashi, Navi Mumbai - 400703
              </div>
            </div>

            {/* Right Form */}
            <div className={styles.formBox}>
              <form>
                <div className={styles.row}>
                  <input type="text" placeholder="First Name" />
                  <input type="text" placeholder="Last Name" />
                </div>
                <div className={styles.row}>
                  <input type="email" placeholder="Email" />
                  <input type="tel" placeholder="+91 99999 99999" />
                </div>
                <div className={styles.radioGroup}>
                  <label><input type="radio" name="subject" /> General Inquiry</label>
                  <label><input type="radio" name="subject" /> General Inquiry</label>
                  <label><input type="radio" name="subject" /> General Inquiry</label>
                </div>
                <textarea placeholder="Write your message..."></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </Container>
      </section>
      <Intro />
      <Special />
      <Intro1 />
      <Premium />
      <Testimony />
    </>
  )
}

export default Contact
