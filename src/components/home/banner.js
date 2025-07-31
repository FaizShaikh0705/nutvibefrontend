import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import Carousel from 'react-bootstrap/Carousel';
import styles from "./home.module.scss";

// var $ = require("jquery");
// if (typeof window !== "undefined") {
//   window.$ = window.jQuery = require("jquery");
// }

const HomeBanner = () => {
  // const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  //   ssr: false,
  // });

  // const state = {
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     450: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     },
  //   },
  // };

  return (
    <>
      <section className={styles["home-slidebanner"]}>
{/*        
              <OwlCarousel
                className="owl-theme"
                responsive={state.responsive}
                loop
                nav
                autoplay={false}
                autoplayTimeout={5000}
                dots={false}
              > */}
               <Carousel fade indicators={false}>
               <Carousel.Item interval={3000}>
                  <div className={styles["learn-h-sec1"]}>
                    <Link href="#shop" className={styles["btn"]}>
                      Shop Now
                    </Link>
                  </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                  <div className={styles["learn-h-sec2"]}>
                    <Link href="#shop" className={styles["btn"]}>
                      Shop Now
                    </Link>
                  </div>
              </Carousel.Item>




          {/* <Carousel.Item interval={4000}>
                <div>
                  <Image
                    src="/images/bannerdesktopnew.png"
                    alt="Banner Image"
                    width="10"
                    height="10"
                    className={styles['ban-img']}
                    objectFit="cover"
                    layout="responsive"
                  />
                   <Image
                    src="/images/bannermobilenew.png"
                    alt="Banner Mobile Image"
                    width="10"
                    height="10"
                    className={styles['ban-mob-img']}
                    objectFit="cover"
                    layout="responsive"
                  />
                </div>
                </Carousel.Item>
                <Carousel.Item interval={4000}>
                <div>
                  <Image
                    src="/images/offerbannernew.png"
                    alt="Offer Image"
                    width="10"
                    height="10"
                    className={styles['ban-img']}
                    objectFit="cover"
                    layout="responsive"
                  />
                   <Image
                    src="/images/offermobilebannernew.png"
                    alt="Offer Mobile Image"
                    width="10"
                    height="10"
                    className={styles['ban-mob-img']}
                    objectFit="cover"
                    layout="responsive"
                  />
                </div>
                </Carousel.Item> */}
                </Carousel>
              {/* </OwlCarousel> */}
              
      </section>
    </>
  );
};

export default HomeBanner;
