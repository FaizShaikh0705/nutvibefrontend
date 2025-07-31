import React, { useEffect } from 'react'
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { publicRequest } from '../../requestMethods';
import parse from 'html-react-parser';
import { FaStar } from "react-icons/fa";
import styles from "./product.module.scss";


var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

const productTestimony = (category) => {

  const prdCtgry =  category?.category;
  const [testimonial, setTestimonial] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/reviews?category=${prdCtgry}`);
        // console.log("testinomail data", res.data)
        setTestimonial(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error as needed, e.g., set an error state
      }
    };

    getProduct();
  }, []);


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

  return (
    <>
      <section className={styles["testimony-main"]}>
        <Container>
          <Row className="">
            <Col lg={12}>
              <OwlCarousel
                className="owl-theme testimonials"
                responsive={state.responsive}
                loop
                nav
                autoplay={false}
                autoplayTimeout={5000}
                dots={false}
              >
                {testimonial &&
                  Object.entries(testimonial)
                    .filter(([key, value]) => value.status === 1 && value.category === prdCtgry)
                    .map(([key, value], index) => (
                      <div className="card item h-100 mx-2" key={index}>
                        <div className={`${styles['testimonial-body']} card-body`}>
                          <div className='d-flex'>
                            <div>
                              <img src='/images/user.png' alt='user' className={styles['user-img']} />
                            </div>
                            <div className='ms-3'>
                              <p>{value.UserName} <span className={styles['verify-badge']}>Verified</span></p>
                              <span style={{ color: "#d7b56d" }} className='float-start'>
                                {/* <FaStar className="me-2" /><FaStar className="me-2" /><FaStar className="me-2" /><FaStar className="me-2" /> */}
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={star <= value.rating ? "star-filled" : "star-empty"}
                                    style={{ fontSize: "24px", color: star <= value.rating ? "#FFD700" : "#D3D3D3" }}
                                  >
                                    &#9733;
                                  </span>
                                ))}
                              </span>
                            </div>
                          </div>
                          <p className='text-start mt-3'>{parse(`${value.postLongDetail.substring(0, 50)}...`)}</p>
                        </div>

                      </div>
                    ))
                }
              </OwlCarousel>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default productTestimony
