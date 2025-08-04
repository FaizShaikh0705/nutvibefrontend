import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest, isTokenSet } from "../../requestMethods";
import { useRouter } from "next/router";
import { placeOrder } from "../../redux/apiCalls";
import { resetCart, removeCoupon } from '../../redux/cartRedux';
import styles from './checkout.module.scss'
// import axios from "axios";
import { placeOrderStart, placeOrderSuccess, resetOrder, placeOrderFailure } from "../../redux/orderRedux";
// const KEY = process.env.NEXT_PUBLIC_REACT_APP_STRIPE;
// import * as fbq from '../../../lib/fpixel';



const Placeorder = ({ className, onNext, onBack }) => {

  const pixelCalled = useRef(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [delCharge, setdelCharge] = useState(0);
  const [couponDisc, setcouponDisc] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState({});
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch();


  // if (!isTokenSet) {
  //   window.location.reload();
  // }

  // console.log(user);
  const selectPostalCode = order.shippingAddress ? order.shippingAddress[0].shippingpostalCode : 4000050;
  console.log(selectPostalCode);

  const couponUsed = useSelector((state) => state.cart.coupon)

  const calcDisc = (couponUsed) => {

    if (couponUsed) {

      var itemCupnDisc = {};
      var cupnDiscTot = 0;
      let itemSel = (couponUsed.SelectedProduct == "All Products") ? "all" : couponUsed.SelectedProduct;
      if (couponUsed.discountPercentage) {
        itemCupnDisc[itemSel] = { "percent": couponUsed.discountPercentage, "flat": 0, "max": couponUsed.maximumDiscount };
      } else {
        itemCupnDisc[itemSel] = { "percent": 0, "flat": couponUsed.flatAmount, "max": couponUsed.maximumDiscount };
      }

      for (let i = 0; i < cart?.products.length; i++) {
        const elem = cart.products[i];


        // let prPric = elem["selectedVariantName"] == dbObj.postVariantName1 ? parseInt(dbObj.postPriceName) : parseInt(dbObj.postPriceName2);
        let prPric = elem.selectedVariantPrice;


        if (itemCupnDisc[elem.postTopicName] || itemCupnDisc["all"]) {
          let itmDisc = 0;
          let obj = itemCupnDisc["all"] ? itemCupnDisc["all"] : itemCupnDisc[elem.postTopicName];
          if (obj["percent"]) {
            let perc = obj["percent"] * (prPric / 100);
            let max = obj["max"];
            perc >= max ? itmDisc = max : itmDisc = perc;

          } else {
            itmDisc = obj["flat"];
          }
          // itmDisc = parseInt(elem.quantity) * parseInt(itmDisc);
          prPric -= parseFloat(itmDisc);
          cupnDiscTot += parseFloat(elem.quantity) * parseFloat(itmDisc);
          // console.log("here--------",itmDisc);
        }
      }

      return cupnDiscTot > couponUsed.maximumDiscount ? couponUsed.maximumDiscount : cupnDiscTot;

    } else {
      return 0;
    }
  }

  useEffect(() => {
    if (cart?.coupon) {
      setcouponDisc(calcDisc(cart.coupon));
    }
  }, [couponDisc]);

  // console.log(cart);
  // const [stripeToken, setStripeToken] = useState(null);
  const history = useRouter();

  // const onToken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/complete/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  //       history.push("/success", { data: res.data });
  //     } catch { }
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, history]);

  // console.log(stripeToken);

  // const DeliveryComponent = ({ postalCode }) => {
  //   const [deliveryCharge, setDeliveryCharge] = useState('');

  //   useEffect(() => {
  //     const calculateDeliveryCharge = (postalCode) => {
  //       const mumbaiRate = 80;
  //       const allIndiaRate = 120;
  //       const northeastRate = 150;

  //       if (!postalCode) {
  //         return 'Postal code not available';
  //       }

  //       if (String(postalCode).startsWith('400')) {
  //         return `₹${mumbaiRate}`;
  //       } else if (String(postalCode).startsWith('700')) {
  //         return `₹${northeastRate}`;
  //       } else {
  //         return `₹${allIndiaRate}`;
  //       }
  //     };

  //     const charge = calculateDeliveryCharge(postalCode);

  //     if (String(selectPostalCode).startsWith('400')) {
  //       setdelCharge(80);
  //     } else if (String(selectPostalCode).startsWith('700')) {
  //       setdelCharge(150);
  //     } else {
  //       setdelCharge(120);
  //     }


  //     setDeliveryCharge(charge);
  //   }, [postalCode]);

  //   return <div>{deliveryCharge && <p>{deliveryCharge}</p>}</div>;
  // };

  useEffect(() => {
    // Fetch delivery charges from the API
    const fetchDeliveryCharges = async () => {
      try {
        const response = await userRequest.get('/dlvry'); // Update with your API endpoint
        // console.log('Response data:', response.data[0]);
        setDeliveryCharges(response.data[0]);
      } catch (error) {
        console.error('Error fetching delivery charges:', error);
      }
    };

    fetchDeliveryCharges();
  }, []);

  useEffect(() => {
    const calculateDeliveryCharge = (postalCode) => {
      if (!postalCode) {
        return 'Postal code not available';
      }

      if (String(postalCode).startsWith('400')) {
        // console.log("mumbaiCharges 2", deliveryCharges.mumbaiRate)
        return `₹${deliveryCharges.mumbaiRate}`;
      } else if (String(postalCode).startsWith('79')) {
        // console.log("northCharges 2", deliveryCharges.northeastRate)
        return `₹${deliveryCharges.northeastRate}`;
      } else {
        // console.log("AllIndiaCharges 2", deliveryCharges.allIndiaRate)
        return `₹${deliveryCharges.allIndiaRate}`;
      }
    };

    const charge = calculateDeliveryCharge(selectPostalCode);
    setdelCharge(charge);

    if (String(selectPostalCode).startsWith('400')) {
      setdelCharge(deliveryCharges.mumbaiRate);
    } else if (String(selectPostalCode).startsWith('79')) {
      setdelCharge(deliveryCharges.northeastRate);
    } else {
      setdelCharge(deliveryCharges.allIndiaRate);
    }
  }, [selectPostalCode, deliveryCharges]);


  const handlePlaceOrder = async () => {

    const contentIds = cart.products.map((product) => product._id);
    const contentNames = cart.products.map((product) => product.postTopicName);
    const totalAmount = cart.total;
    const numItems = cart.products.length;

    const orderData = {
      userId: user.currentUser._id,
      firstName: user.currentUser.firstName,
      lastName: user.currentUser.lastName,
      email: user.currentUser.email,
      products: cart.products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        postImage: product.postImage,
        postTopicName: product.postTopicName,
        postLongDetail: product.postLongDetail,
        selectedVariantName: product.selectedVariantName,
        selectedVariantPrice: product.selectedVariantPrice,
        gstNumber: product.gstNumber,
        productCode: product.productCode,
        ...(product.productCode1 ? { productCode1: product.productCode1 } : {}),
        length: product.length || 0,
        breadth: product.breadth || 0,
        height: product.height || 0,
        weight: product.weight || 0,
      })),
      amount: cart.total,
      discount: Math.round(couponDisc),
      couponCode: cart.coupon ? cart.coupon.couponCode : "",
      contact: user.currentUser.contact,
      quantity: cart.quantity,
      billingAddress: user.currentUser.billingAddress,
      shippingAddress: order.shippingAddress,
      deliveryCharge: delCharge,
      mop: "COD",
      status: 'pending',
    };
    dispatch(placeOrderStart());
    // console.log(orderData, "placeOrder")
    // Dispatch the placeOrder action
    // dispatch(placeOrder(orderData));

    try {
      // Dispatch the placeOrder action
      // console.log("Token", user.currentUser.accessToken)
      await dispatch(placeOrder(orderData));
      dispatch(placeOrderSuccess(orderData));
      // After successfully placing the order, reset the cart
      // dispatch(removeCoupon());
      // dispatch(resetCart());
      // dispatch(resetOrder());

      // Redirect to the success page or handle it as needed
      history.push("/success");

      if (cart.products && Array.isArray(cart.products) && cart.products.length > 0 && !pixelCalled.current) {
        const contentIds = cart.products.map((product) => product._id);
        const contentNames = cart.products.map((product) => product.postTopicName);
        const contentQuantities = cart.products.map((product) => product.quantity); // Get quantity of each product
        const totalQuantity = contentQuantities.reduce((sum, qty) => sum + qty, 0); // Calculate total quantity
        const totalAmount = cart.total;

        // Trigger the Facebook Pixel InitiateCheckout event
        fbq.purchased({
          content_ids: contentIds,
          content_names: contentNames,
          content_quantities: contentQuantities, // Pass individual product quantities
          total_quantity: totalQuantity, // Pass total quantity of all products
          value: totalAmount.toFixed(2), // Ensure value is a string or number in proper format
          currency: 'INR',
        });
      } else if (cart.quantity && cart.total) {
        // Handle fallback case where products array is empty
        fbq.purchased({
          content_ids: ['N/A'], // Placeholder
          content_names: ['N/A'], // Placeholder
          content_quantities: [cart.quantity], // Fallback quantity
          total_quantity: cart.quantity, // Total quantity fallback
          value: cart.total.toFixed(2), // Ensure proper format
          currency: 'INR',
        });
      }

      pixelCalled.current = true;

    } catch (error) {
      // Handle the error if needed
      // history.push("/home", { error });
      dispatch(placeOrderFailure(error.message));
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

  // const calcGST = (pinCode, product) => {

  // //   var delChrgs = 120;
  // //   (qNew.address.String(postalCode)).startsWith('400') ? delChrgs = 80 : false;
  //  //  (qNew.address.String(postalCode)).startsWith('700') ? delChrgs = 150 : false;

  //   if (String(pinCode).startsWith('400')) {
  //     const amount = Math.round(parseInt(product.gstNumber ? product.gstNumber * (product.selectedVariantPrice / 100) * product.quantity : 0) / 2);
  //     return "CGST Rs. " + amount + " SGST Rs. " + amount;
  //   } else {
  //     return "IGST Rs. " + Math.round(parseInt(product.gstNumber ? product.gstNumber * (product.selectedVariantPrice / 100) * product.quantity : 0));
  //   }

  // }


  const calcGst = (gstPercnt, totPric) => {
    let gstAmount = totPric - totPric / (gstPercnt / 100 + 1);
    return Math.round(gstAmount);
  }

  const calcGST = (pinCode, product) => {
    let totalGst = calcGst(product.gstNumber, product.selectedVariantPrice * product.quantity);

    if (String(pinCode).startsWith('400')) {
      const amount = Math.round(totalGst / 2);
      return `CGST Rs. ${amount} SGST Rs. ${amount}`;
    } else {
      return `IGST Rs. ${totalGst}`;
    }
  }




  return (
    <>
      <h5 className="mb-3">
        <a className="text-body"
          onClick={onBack}>
          <i className="fas fa-long-arrow-alt-left me-2"></i>
          Back
        </a>
      </h5>
      <Container className={className}>
        <Row className='justify-content-center mt-5'>
          <Col lg={6}>
            <h3>Name</h3>
            {order.shippingAddress ? <p>{order.shippingAddress[0].shippingfirstName} {order.shippingAddress[0].shippinglastName}</p>
              :
              <p>{user.currentUser.userName}</p>
            }
            <hr />
            <h3>Shipping Address</h3>
            {order.shippingAddress ?
              <p>{order.shippingAddress[0].shippingline1},{order.shippingAddress[0].shippingline2}, {order.shippingAddress[0].shippingcity}, {order.shippingAddress[0].shippingstate}, {order.shippingAddress[0].shippingpostalCode}</p>
              :
              <p>{user.currentUser.address.address}, {user.currentUser.address.city}, {user.currentUser.address.state}, {user.currentUser.address.postalCode}</p>
            }
            <hr />
            <h3>GSTIN/UIN</h3>
            <p>{user.currentUser.gst ? user.currentUser.gst : "Null"}</p>
            <hr />
            <h3>Contact Number</h3>
            {order.shippingAddress ?
              <p>+91-{order.shippingAddress[0].shippingcontact}</p>
              :
              <p>+91-{user.currentUser.contact}</p>
            }
            <hr />
            <h3>Payment Method</h3>
            <p>COD</p>
            <hr />
            <h3>Delivery Charges</h3>
            {/* <DeliveryComponent postalCode={selectPostalCode} /> */}
            {delCharge}
            <hr />
            <h3>Order Items</h3>
            {cart.products.map((product) => {
              return (
                <>
                  <div className='d-flex justify-content-between'>
                    {/* <p>{product.postTopicName} {product.selectedVariantName} ({product.quantity})</p> */}
                    <p>{product.postTopicName} ({product.quantity})</p>
                    <p>₹{product.selectedVariantPrice}</p>
                  </div>
                  {product.productCode1 ? (<><span className={styles['gst']}>HSN #{product.productCode} #{product.productCode1}</span> <br /></>) : (<><span className={styles['gst']}>HSN #{product.productCode}</span> <br /></>)}
                  <span className={styles['gst']}>GST ({product.gstNumber}%)</span> <br />
                  {/* <span className={styles['gst']}> {calcGST(user.currentUser.address.postalCode, product)}</span> */}
                  <hr />
                </>
              )
            })}
          </Col>
          <Col lg={{ span: 4, offset: 2 }}>
            <div className='border box shadow rounded-3 p-4 mt-4'>
              <h3>Order Summary</h3>
              <hr />
              <div className='d-flex justify-content-between'>
                <p>Items ({cart.quantity})</p>
                <p>₹{cart.total}.00</p>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <p>Discount</p>
                <p>- {couponDisc ? "₹" + Math.round(couponDisc) : "No Coupon"}</p>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <p>Shipping</p>
                + ₹{delCharge}
                {/* <DeliveryComponent postalCode={selectPostalCode} /> */}
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <p>Total</p>
                <p>₹{cart.total - Math.round(couponDisc) + delCharge}.00</p>
              </div>
              <hr />
              <div className='text-center'>
                {/* <StripeCheckout
                  name="Nutsvibe Test"
                  image='https://m.media-amazon.com/images/I/51vwDpwSeDL._SL1024_.jpg'
                  billingAddress
                  shippingAddress
                  description={`Your total is Rs${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button className='w-100' variant='outline-dark' href=''>Place Order</Button>
                </StripeCheckout> */}

                <Button onClick={handlePlaceOrder} className='w-100' variant='outline-dark'>Place Order</Button>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Placeorder
