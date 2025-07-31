import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "react-scroll-to-top";
import { FaLocationDot, FaPhone, FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
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
      <footer className="bg-white border-top pt-5 pb-3" id={styles["footer"]}>
        <Container fluid>
          <Row className="text-start text-md-left">
            {/* Logo & Tagline */}
            <Col lg={4} sm={12} className="mb-4  align-middle">
              <Image src="/images/logo.jpg" alt="Logo" width={90} height={40} />
              <p className="mt-1 small">
                Healthy snacking begins with the natural goodness of Nutsvibe.
              </p>
            </Col>

            {/* Navigation */}
            <Col lg={2} sm={6} className="mb-4">
              {/* <h6 className="fw-bold mb-3">Quick Links</h6> */}
              <ul className="list-unstyled small">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#shop">Products</Link></li>
                <li><Link href="/aboutus">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col lg={4} sm={6} className="mb-4">
              {/* <h6 className="fw-bold mb-3">Contact</h6> */}
              <p className="small mb-2">
                <FaPhone />{" "}
                <span style={{ fontWeight: "800" }}>Contact No : - </span>
                <Link href="tel:+918976270971"> +91 8976270971</Link>
              </p>
              <p className="small mb-2">
                <IoMail />{" "}
                <span style={{ fontWeight: "800" }}>Email id : - </span>
                <Link href="mailto:enterprisescrystal046@gmail.com">enterprisescrystal046@gmail.com</Link>
              </p>
              <p className="small mb-2">
                <FaLocationDot />
                <span style={{ fontWeight: "800" }}> Address : - </span>
                F-44, A.P.M.C. Masala Market, Phase-2, Vashi, Navi Mumbai - 400 703
              </p>
            </Col>

            {/* Social Icons */}
            <Col lg={2} sm={12} className="mb-4">
              <h6 className="fw-bold mb-3">Follow Us</h6>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF size={30} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram size={30} /></a>
              </div>
            </Col>
          </Row>

          <hr />

          {/* Promo Bar */}
          <Row className="text-center">
            <Col>
              <p className="small text-muted mb-1" style={{ backgroundColor: "#DFB760" }}>
                Use Code <strong style={{ color: "#fff" }}>"NUTSVIBE"</strong> – Free shipping for orders over <strong style={{ color: "#000" }}>INR1500</strong>
              </p>
              <p className="small text-muted mb-0">
                © {new Date().getFullYear()} All rights reserved | Developed by <strong>EliteCipher</strong>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Floating WhatsApp Icon */}
      {/* {showWhatsapp && (
        <Link
          href="https://wa.me/+918104583429"
          target="_blank"
          className="whatsapp-icon"
          aria-label="Chat with us on WhatsApp"
        >
          <Image src="/images/whatsapp.png" width={50} height={50} alt="WhatsApp" />
        </Link>
      )} */}

      {/* Scroll To Top */}
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
