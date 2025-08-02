import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./home.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { motion } from 'framer-motion';

const intro = () => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.overlay}></div> {/* Add overlay */}
      <Container fluid>
        <Row className="align-items-center">
          <Col md={5}>
            <div className={styles.imageWrapper}>
              <motion.img
                src="/images/about.jpg"
                alt="Dry Fruits"
                className={styles.image}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </Col>
          <Col md={6}>
            <h2 className={styles.heading}>
              Keep Your Favourite Dates, <br />
              Nuts & Dry Fruits Fresh
            </h2>
            <p className={styles.paragraph}>
              For short-term use, place them in sealed jars or containers and
              store in a cool, shaded area away from air, light, and dampness.
              Avoid warm temperatures—they can lead to spoilage or attract
              insects. <br />
              For extended freshness, refrigerate to maintain rich flavor and
              texture.
            </p>
          </Col>
          <Col md={1} className="d-none d-md-block" /> {/* Desktop-only empty column */}
        </Row>
      </Container>
    </div>
  );
};

export default intro;
