import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import styles from "./home.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { publicRequest } from "../../requestMethods";
import parse from "html-react-parser";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

const reel = () => {
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });

  const state = {
    responsive: {
      0: {
        items: 2,
      },
      450: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  
  return (
    <section className={styles['reel']}>
      <Container className="mb-4">
        <Row>
          <Col lg={12}>
            <OwlCarousel
              className="owl-theme testimonials"
              responsive={state.responsive}
              loop
              nav
              autoplay={true}
              autoplayTimeout={5000}
              dots={false}
            >
              <div onClick={handleShow}>
                <Image src="/images/1.gif" alt="gif" unoptimized width={310} height={460} className={`${styles['video-wid']} shadow`}/>
              </div>
                <Modal centered show={show} size="sm" onHide={handleClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body className="text-center">
                      <video controls autoPlay muted width={250} height={460} className={styles['modal-vid']}>
                  <source src="/images/1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                      </Modal.Body>
                    </Modal>
           
              <div onClick={handleShow1}>
                <Image src="/images/2.gif" alt="gif" unoptimized width={310} height={460} className={`${styles['video-wid']} shadow`}/>
              </div>
                <Modal centered show={show1} size="sm" onHide={handleClose1}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body className="text-center">
                      <video controls autoPlay muted width={250} height={460} className={styles['modal-vid']}>
                  <source src="/images/2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                      </Modal.Body>
                    </Modal>

              <div onClick={handleShow2}>
                <Image src="/images/3-1.gif" alt="gif" unoptimized width={310} height={460} className={`${styles['video-wid']} shadow`}/>
              </div>
                <Modal centered show={show2} size="sm" onHide={handleClose2}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body className="text-center">
                      <video controls autoPlay muted width={250} height={460} className={styles['modal-vid']}>
                  <source src="/images/3-1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                      </Modal.Body>
                    </Modal>

              <div onClick={handleShow3}>
                <Image src="/images/4.gif" alt="gif" unoptimized width={310} height={460} className={`${styles['video-wid']} shadow`}/>
              </div>
                <Modal centered show={show3} size="sm" onHide={handleClose3}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body className="text-center">
                      <video controls autoPlay muted width={250} height={460} className={styles['modal-vid']}>
                  <source src="/images/4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                      </Modal.Body>
                    </Modal>

                    <div onClick={handleShow4}>
                <Image src="/images/5.gif" alt="gif" unoptimized width={310} height={460} className={`${styles['video-wid']} shadow`}/>
              </div>
                <Modal centered show={show4} size="sm" onHide={handleClose4}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body className="text-center">
                      <video controls autoPlay muted width={250} height={460} className={styles['modal-vid']}>
                  <source src="/images/5.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                      </Modal.Body>
                    </Modal>
            </OwlCarousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default reel;
