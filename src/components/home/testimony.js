import React, { useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import styles from "./home.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaStar } from "react-icons/fa";
import { publicRequest } from "../../requestMethods";
import parse from "html-react-parser";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// import InstaVideo1 from '../../../public/images/InstaVideo1';

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

const testimony = () => {
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  };

  // const [showModal, setShowModal] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  const [show8, setShow8] = useState(false);
  const [show9, setShow9] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const handleClose7 = () => setShow7(false);
  const handleShow7 = () => setShow7(true);

  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  const [review, setReview] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/testimonails");
        console.log("testinomail data", res.data);
        setTestimonials(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error as needed, e.g., set an error state
      }
    };

    getProduct();
  }, []);


  const handleShowModal = (testimony) => {
    setSelectedTestimony(testimony);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTestimony(null);
    setShowModal(false);
  };


  //
  const handleClose = () => {
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleShow = (testimonials) => {
    setSelectedPost(testimonials);
    setShowModal(true);
  };

  return (
    <section className={styles.testimonial}>
      {/* Background Image */}
      <div className={styles.overlay}>
        <div className={styles.bgImage}>
          <Image
            src="/images/testi.jpg" // Change to your background image
            alt="Customer Testimonial"
            layout="fill"
            objectFit="cover"
            quality={80}
          />
          <div className={styles.overlay}></div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h2>WHAT OUR CUSTOMER SAY</h2>
          <p>
            <em>
              The quality definitely deserves a great rating and review—that’s why
              I’m here! Absolutely delicious—my whole family loves it. Can’t wait
              to see how the taste develops over the next few days.
            </em>
          </p>
          <p>
            <em>
              Also, the packaging deserves special appreciation—everything arrived
              safely and neatly packed. Really impressed!
            </em>
          </p>

          {/* Star Rating */}
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color="#FFD700" size={22} />
            ))}
          </div>

          {/* Customer Name */}
          <h4>ARYAN</h4>
        </div>
      </div>
    </section>
  );
};

export default testimony;
