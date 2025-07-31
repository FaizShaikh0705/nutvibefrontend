import React, { useState, useEffect, useRef } from "react";
import styles from "./checkout.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col, Form, Tab, Tabs } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import parse from "html-react-parser";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import CheckoutLogin from './checkoutLogin'
import Shipping from "./shipping";
import Payment from "./payment";
import Placeorder from "./placeorder";
import { LinkContainer } from 'react-router-bootstrap'
import { useRouter } from "next/router";
import * as fbq from "../../../lib/fpixel";


const index = () => {

  const pixelCalled = useRef(false);
  const currentUser = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  // console.log(currentUser)
  const router = useRouter();


  // Initialize currentStep from localStorage or default to "shipping"
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("checkoutStep");
    return savedStep && ["shipping", "payment", "placeorder"].includes(savedStep)
      ? savedStep
      : "shipping";
  });

  // Update localStorage whenever currentStep changes
  useEffect(() => {
    localStorage.setItem("checkoutStep", currentStep);
  }, [currentStep]);

  // // Retrieve the step from localStorage when the component mounts
  // useEffect(() => {
  //   const savedStep = localStorage.getItem("checkoutStep");
  //   if (savedStep && ["shipping", "payment", "placeorder"].includes(savedStep)) {
  //     setCurrentStep(savedStep);
  //   }
  // }, []);


  const handleNext = () => {
    if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setCurrentStep("placeorder");
    }
    else if (currentStep === "placeorder") {
      setCurrentStep("sucess");
    }
  };


  const handleback = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping");
    } else if (currentStep === "placeorder") {
      setCurrentStep("payment");
    }
  }

  // useEffect(() => {
  //   if ((!currentUser || !currentUser.currentUser)) {
  //     router.push("/login"); // Redirect to login page if user is not logged in
  //   }
  // }, [currentUser]);


  useEffect(() => {
    if ((!cart.products.length)) {
      router.push("/");
    }
  }, [cart])


  const triggeredProductIds = useRef(new Set()); // Track triggered products

  useEffect(() => {
    if (cart.products && Array.isArray(cart.products) && cart.products.length > 0 && !pixelCalled.current) {
      const contentIds = cart.products.map((product) => product._id);
      const contentNames = cart.products.map((product) => product.postTopicName);
      const contentQuantities = cart.products.map((product) => product.quantity); // Get quantity of each product
      const totalQuantity = contentQuantities.reduce((sum, qty) => sum + qty, 0); // Calculate total quantity
      const totalAmount = cart.total;

      // Trigger the Facebook Pixel InitiateCheckout event
      fbq.initiateCheckout({
        content_ids: contentIds,
        content_names: contentNames,
        content_quantities: contentQuantities, // Pass individual product quantities
        total_quantity: totalQuantity, // Pass total quantity of all products
        value: totalAmount.toFixed(2), // Ensure value is a string or number in proper format
        currency: 'INR',
      });
    } else if (cart.quantity && cart.total) {
      // Handle fallback case where products array is empty
      fbq.initiateCheckout({
        content_ids: ['N/A'], // Placeholder
        content_names: ['N/A'], // Placeholder
        content_quantities: [cart.quantity], // Fallback quantity
        total_quantity: cart.quantity, // Total quantity fallback
        value: cart.total.toFixed(2), // Ensure proper format
        currency: 'INR',
      });
    }

    pixelCalled.current = true;
  }, [cart]);



  return (
    <section className={styles["checkout-section"]}>
      <Container>
        <Row>
          <Col lg={12}>
            {/* {currentUser && currentUser.currentUser ? ( */}
            <>
              {currentStep === "shipping" && (
                <Shipping
                  className={`${styles["shipping"]} ${currentStep === "shipping" ? "" : styles["hidden"]}`}
                  onNext={handleNext}
                />
              )}
              {currentStep === "payment" && (
                <Payment
                  className={`${styles["payment"]} ${currentStep === "payment" ? "" : styles["hidden"]}`}
                  onNext={handleNext}
                  onBack={handleback}
                />
              )}
              {currentStep === "placeorder" && (
                <Placeorder
                  className={`${styles["placeorder"]} ${currentStep === "placeorder" ? "" : styles["hidden"]}`}
                  onNext={handleNext}
                  onBack={handleback}
                />
              )}
            </>
            {/* ) : null} */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default index;
