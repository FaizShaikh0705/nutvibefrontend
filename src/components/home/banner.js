import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import Carousel from 'react-bootstrap/Carousel';
import styles from "./home.module.scss";
import { motion } from "framer-motion";

const HomeBanner = () => {

  return (
    <>
      <section className={styles["home-slidebanner"]}>
        <Carousel fade controls={true} indicators={false}>
          <Carousel.Item interval={3000}>
            <div className={`${styles.slide} ${styles.slide1}`}>
              <div className={styles.overlay}>
                <motion.div
                  className={styles.contentWrapper}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className={styles.title}>OUR FINEST SELECTION</h1>
                  <h5 className={styles.subtitle}>EVERY BITE, A BURST OF WELLNESS.</h5>
                  <p className={styles.description}>
                    FROM CRUNCHY ALMONDS TO RICH CASHEWS AND JUICY RAISINS, DISCOVER A
                    CAREFULLY CURATED RANGE OF DRY FRUITS THAT BRING NATURE’S NUTRITION
                    STRAIGHT TO YOU.
                  </p>
                  <br />
                  <Link href="/products" className={`${styles.buyButton}`}>
                    BUY NOW
                  </Link>
                </motion.div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <div className={`${styles.slide} ${styles.slide2}`}>
              <div className={styles.overlay}>
                <div className={styles.contentWrapper}>
                  <h1 className={styles.title}>OUR FINEST SELECTION</h1>
                  <h5 className={styles.subtitle}>EVERY BITE, A BURST OF WELLNESS.</h5>
                  <p className={styles.description}>
                    FROM CRUNCHY ALMONDS TO RICH CASHEWS AND JUICY RAISINS, DISCOVER A
                    CAREFULLY CURATED RANGE OF DRY FRUITS THAT BRING NATURE’S NUTRITION
                    STRAIGHT TO YOU.
                  </p>
                  <br />
                  <Link href="/products" className={`${styles.buyButton}`}>
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <div className={`${styles.slide} ${styles.slide3}`}>
              <div className={styles.overlay}>
                <div className={styles.contentWrapper}>
                  <h1 className={styles.title}>OUR FINEST SELECTION</h1>
                  <h5 className={styles.subtitle}>EVERY BITE, A BURST OF WELLNESS.</h5>
                  <p className={styles.description}>
                    FROM CRUNCHY ALMONDS TO RICH CASHEWS AND JUICY RAISINS, DISCOVER A
                    CAREFULLY CURATED RANGE OF DRY FRUITS THAT BRING NATURE’S NUTRITION
                    STRAIGHT TO YOU.
                  </p>
                  <br />
                  <Link href="/products" className={`${styles.buyButton}`}>
                    BUY NOW
                  </Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section >
    </>
  );
};

export default HomeBanner;
