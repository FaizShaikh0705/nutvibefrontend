import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "react-scroll-to-top";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import styles from "./footer.module.scss";

const Footer = () => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsapp(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <Container fluid className="px-5 py-5">
          <Row className="align-items-start">
            {/* Logo and Tagline */}
            <Col md={3} sm={12} className="mb-4">
              <Image src="/images/logo.png" alt="Logo" width={100} height={50} unoptimized />
              <p className="mt-3">
                Healthy Snacking Begins with the Natural Goodness of NutsVibe.
              </p>
            </Col>

            {/* Navigation */}
            <Col md={3} sm={6} className="mb-4">
              <ul className="list-unstyled">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#shop">Products</Link></li>
                <li><Link href="/aboutus">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md={4} sm={6} className="mb-4">
              <p>
                <FaPhone className="me-2" />
                <strong>Contact No :-</strong> <Link href="tel:+918976270971">+91 8976270971</Link>
              </p>
              <p>
                <IoMail className="me-2" />
                <strong>Email id :-</strong>{" "}
                <Link href="mailto:enterprisescrystal046@gmail.com">
                  enterprisescrystal046@gmail.com
                </Link>
              </p>
              <p>
                <FaLocationDot className="me-2" />
                <strong>Address :-</strong> F-44, A.P.M.C. Masala Market,
                Phase-2, Vashi, Navi Mumbai – 400 703
              </p>
            </Col>

            {/* Social Icons */}
            <Col md={2} sm={12} className="mb-4 text-md-start text-center">
              <p className="fw-bold mb-2">FOLLOW US ON :</p>
              <div className={`justify-content-md-start justify-content-center ${styles.socialIcons} `}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Bottom Promo Bar */}
        <div className={styles.promoBar}>
          <Container fluid>
            <Row className="text-center">
              <Col>
                <p className="text-light">
                  Use Code <strong>"NUTSVIBE"</strong> Free shipping for orders over{" "}
                  <strong>INR1500</strong>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>

      {/* Scroll to Top */}
      <ScrollToTop
        smooth
        color="#9F6D00"
        style={{
          backgroundColor: "#fff",
          border: "2px solid #9F6D00",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default Footer;
