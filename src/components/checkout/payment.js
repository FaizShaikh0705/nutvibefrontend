import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from './checkout.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { razorPost } from "../../redux/apiCalls";
import { resetCart, removeCoupon } from '../../redux/cartRedux';
import { userRequest, isTokenSet } from '../../requestMethods';
import { logout } from '../../redux/userRedux'
import { setDeliveryCharges, setMop } from "../../redux/orderRedux";
import Loading from "../loading";

const Payment = ({ className, onNext, onBack, }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [delCharge, setdelCharge] = useState(0);
  // const selectPostalCode =  order.shippingAddress[0].shippingpostalCode ?  user.currentUser.address ? user.currentUser.address.postalCode : 400055;
  const [selectPostalCode, setselectPostalCode] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [showLoading, setshowLoading] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState({});

  // if (!isTokenSet) {
  //   dispatch(logout());
  //   window.location.href = "/login";
  // }

  if (!isTokenSet) {
    window.location.reload();
  }


  // console.log(user, "placeOrder")

  const razorPayPost = async () => {
    // ; 
    // return "";
    const orderData = {
      userId: user.currentUser._id,
      contact: user.currentUser.contact,
      firstName: user.currentUser.firstName,
      lastName: user.currentUser.lastName,
      email: user.currentUser.email,
      products: cart.products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        // postImage: product.postImage,
        postTopicName: product.postTopicName,
        // postLongDetail: product.postLongDetail,
        selectedVariantName: product.selectedVariantName,
        selectedVariantPrice: product.selectedVariantPrice,
        length: product.length,
        breadth: product.breadth,
        height: product.height,
        weight: product.weight,
      })),
      amount: cart.total,
      couponCode: cart.coupon ? cart.coupon.couponCode : "",
      quantity: cart.quantity,
      billingAddress: user.currentUser.billingAddress,
      shippingAddress: order.shippingAddress[0],
      deliveryCharge: delCharge,
      mop: "Online",
      status: 'pending',
    };
    // Dispatch the placeOrder action
    // dispatch(placeOrder(orderData));

    try {
      // Dispatch the placeOrder action
      // await dispatch(razorPost(orderData));

      // After successfully placing the order, reset the cart
      // dispatch(resetCart());
      document.getElementById("payOnlineBtn").setAttribute("disabled", "disabled");
      setshowLoading(1);

      var temp = await dispatch(razorPost(orderData));

      if (temp.payload) {
        if (temp.payload.short_url) {
          window.open(temp.payload.short_url, '_blank').focus();
          dispatch(removeCoupon());
          dispatch(resetCart());
          window.location = "/success";
        } else {
          alert("Please check cart items.");
        }
      }
      setshowLoading(0);
      // document.getElementById("payOnlineBtn").removeAttribute("disabled");
      // Redirect to the success page or handle it as needed
      // history.push("/success", { data: orderData });
    } catch (error) {
      // Handle the error if needed
      // history.push("/home", { error });
    }

    // const url = "http://localhost:5002/api/orders";

    // try {
    //   axios.post(url, orderData, {
    //     headers: {
    //       'token': `Basic ${user.currentUser._id}`
    //     },
    //   });
    //   history.push("/success", (orderData));
    // } catch (error) {
    //   history.push("/failure", { error })
    // }
  };


  useEffect(() => {

    const fetchDeliveryCharges = async () => {
      try {
        const response = await userRequest.get('/dlvry'); // Update with your API endpoint
        // console.log('Response data---------------------:', response.data[0]);
        setDeliveryCharges(response.data[0]);
      } catch (error) {
        console.error('Error fetching delivery charges:', error);
      }
    };

    fetchDeliveryCharges();

    // const calculateDeliveryCharge = (postalCode) => {

    //   const mumbaiRate = deliveryCharges.mumbaiRate || 80;
    //   const allIndiaRate = deliveryCharges.allIndiaRate || 100;
    //   const northeastRate = deliveryCharges.northeastRate || 120;

    //   if (!postalCode) {
    //     return 'Postal code not available';
    //   }

    //   console.log(postalCode);


    //   if (String(postalCode).startsWith('400')) {
    //     return `₹${mumbaiRate}`;
    //   } else if (String(postalCode).startsWith('700')) {
    //     return `₹${northeastRate}`;
    //   } else {
    //     return `₹${allIndiaRate}`;
    //   }      
    // };
    // const charge = calculateDeliveryCharge(selectPostalCode);

    try {
      if (order.shippingAddress.length) {
        setselectPostalCode(order.shippingAddress[0].shippingpostalCode)
      } else {
        setselectPostalCode(user.currentUser.address.postalCode)
      }
    } catch (error) {
      setselectPostalCode("700001")
    }

    if (String(selectPostalCode).startsWith('400')) {

      setdelCharge(deliveryCharges.mumbaiRate || 80);
    } else if (String(selectPostalCode).startsWith('700')) {
      setdelCharge(deliveryCharges.northeastRate || 120);
    } else {
      setdelCharge(deliveryCharges.allIndiaRate || 100);
    }
  }, [selectPostalCode]);

  const CodOrder = () => {
    // Assuming user.currentUser.address.postalCode holds the postal code value
    // const postalCode = user.currentUser.address.postalCode;
    // // Define the range of postal codes for Mumbai
    // const mumbaiPostalCodeRange = {
    //     start: 400001,
    //     end: 400104
    // };

    // Check if the postal code is in the Mumbai range
    // if (postalCode >= mumbaiPostalCodeRange.start && postalCode <= mumbaiPostalCodeRange.end) {
    // If the postal code is in the range, proceed with the next step
    onNext();
    // } else {
    //     // If the postal code is not in the range, display an error message or handle it accordingly
    //     alert("COD only available in Mumbai");
    //     // You might want to display an error message to the user or handle it in another way
    // }
  }



  // const delMop = async (modeOfPayment) => {
  //   try {
  //     const orderId = order.currentOrder._id;
  //     // const response = await userRequest.put(`/orders/checkout/${orderId}`, { deliveryCharge: delCharge, mop: modeOfPayment });
  //     dispatch(setDeliveryCharges(delCharge));
  //     dispatch(setMop(modeOfPayment));
  //   } catch (error) {
  //     console.error("Error setting delivery Charges:", error);
  //   }
  // }


  return (
    <>
      {showLoading ? <Loading /> : ""}
      <h5 className="mb-3">
        <a className="text-body"
          onClick={onBack}>
          <i className="fas fa-long-arrow-alt-left me-2"></i>
          Back
        </a>
      </h5>
      <Container className={className}>
        <Row className="justify-content-center mt-5">
          <Col lg={12}>
            <h3 className="mb-4">Payment Method</h3>
            <Button
              id="payOnlineBtn"
              variant="outline-dark mx-2 mb-3"
              className={styles.paymentButton}
              onClick={() => razorPayPost()}
            >
              Pay Online
            </Button>
            <Button
              variant="outline-dark mx-2 mb-3"
              className={styles.paymentButton}
              onClick={() => CodOrder()}
            >
              COD (Cash On Delivery)
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
