import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { CiLock } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaPlus, FaArrowDown, FaMinus } from "react-icons/fa";
import styles from "./cart.module.scss";
import { publicRequest } from '../../requestMethods';
import {
  addProduct,
  addCoupon,
  removeCoupon,
  incrementProduct,
  decrementProduct,
  deleteProduct,
} from "../../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { Console } from "console";
// import { Route } from "react-router-dom";
// import * as fbq from '../../../lib/fpixel';



const index = () => {

  const pixelCalled = useRef(false);
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user);
  // const coupon = useSelector((state) => state.coupon);
  // currentUser._id
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [couponDisc, setcouponDisc] = useState(0);
  const [delRate, setdelRate] = useState(80);

  // const mumbaiRate = 80;
  // const allIndiaRate = 120;
  // const northeastRate = 150;


  // const couponDisc = 0;

  // const handleIncrement = (_id) => {
  //     setQuantity((prevQuantity) => ({
  //         ...prevQuantity,
  //         [_id]: (prevQuantity[_id] || 1) + 1,
  //     }));
  // };

  // const handleDecrement = (_id) => {
  //     setQuantity((prevQuantity) => ({
  //         ...prevQuantity,
  //         [_id]: (prevQuantity[_id] || 1) - 1,
  //     }));
  // };
  const cpnCodStyl = { backgroundColor: '#000', padding: "2% 5%", borderRadius: "15px", color: "#9f6d00" };
  const history = useRouter();

  useEffect(() => {
    if (cart.products && Array.isArray(cart.products) && cart.products.length > 0 && !pixelCalled.current) {
      const contentIds = cart.products.map((product) => product._id);
      const contentNames = cart.products.map((product) => product.postTopicName);
      const contentQuantities = cart.products.map((product) => product.quantity); // Get quantity of each product
      const totalQuantity = contentQuantities.reduce((sum, qty) => sum + qty, 0); // Calculate total quantity
      const totalAmount = cart.total;

      // Trigger the Facebook Pixel InitiateCheckout event
      fbq.addToCart({
        content_ids: contentIds,
        content_names: contentNames,
        content_quantities: contentQuantities, // Pass individual product quantities
        total_quantity: totalQuantity, // Pass total quantity of all products
        value: totalAmount.toFixed(2), // Ensure value is a string or number in proper format
        currency: 'INR',
      });
    } else if (cart.quantity && cart.total) {
      // Handle fallback case where products array is empty
      fbq.addToCart({
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

  const applyCoupon = async () => {
    const isLoggedIn = currentUser.currentUser
    if (isLoggedIn) {
      const cCode = document.getElementById("couponCodeInp").value;
      if (cCode) {
        try {
          document.getElementById("couponCodeInp").value = "";
          dispatch(removeCoupon());
          console.log(currentUser.currentUser._id, "-----------");
          const response = await publicRequest.get('/coupons/' + currentUser.currentUser._id + '/' + cCode);
          if (response.data !== null) {
            if (response.data.errMsg) {
              alert(response.data.errMsg);
              return;
            }
            const cpnAmnt = calcDisc(response.data);
            if (cpnAmnt) {
              dispatch(addCoupon(response.data));
              alert(`Coupon applied successfully.`);
            } else {
              alert('Coupon not applicaple');
            }
            setcouponDisc(cpnAmnt);
            // alert(`Coupon applied successfully. You saved ₹${couponDisc}`);
          } else {
            alert('Coupon not available');
            setcouponDisc(0);
          }
        } catch (error) {
          console.error('Error while fetching coupon:', error);
          alert('Error occurred while fetching coupon. Please try again later.');
        }
      }
    } else {
      alert('Please login to apply coupon.');
    }
  };

  const handleIncrement = (product) => {
    dispatch(incrementProduct(product));
    // setcouponDisc(calcDisc(cart.coupon));
  };

  const handleDecrement = (product) => {
    if (product.quantity == 1) {
      handleDelete(product);
    } else {
      dispatch(decrementProduct(product));
    }
    ;
  };

  const handleDelete = (product) => {
    const _id = product._id;
    const selectedVariantName = product.selectedVariantName;
    var updtProdLst = [];
    cart.products.forEach((v, k) => {
      if (v._id == _id) {
        selectedVariantName != v.selectedVariantName
          ? updtProdLst.push(v)
          : false;
      } else {
        updtProdLst.push(v);
      }
    });
    dispatch(deleteProduct(updtProdLst));
  };

  const calcDisc = (couponObj) => {

    if (couponObj) {
      console.log(cart);
      if (cart.total < couponObj.minimumOrderValue) {
        dispatch(removeCoupon());
        alert("Coupon is applicable for minimum cart total of " + couponObj.minimumOrderValue);
        return 0;
      }


      var itemCupnDisc = {};
      var cupnDiscTot = 0;
      let itemSel = (couponObj.SelectedProduct == "All Products") ? "all" : couponObj.SelectedProduct;
      if (couponObj.discountPercentage) {
        itemCupnDisc[itemSel] = { "percent": couponObj.discountPercentage, "flat": 0, "max": couponObj.maximumDiscount };
      } else {
        itemCupnDisc[itemSel] = { "percent": 0, "flat": couponObj.flatAmount, "max": couponObj.maximumDiscount };
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
          console.log("here--------", itmDisc);
        }
      }

      return cupnDiscTot > couponObj.maximumDiscount ? couponObj.maximumDiscount : cupnDiscTot;

    } else {
      return 0;
    }
  }

  // useState(() => {
  //   if (cart?.coupon) {
  //     setcouponDisc(calcDisc(cart.coupon));
  //   }
  //   console.log("useState called");
  // }, [couponDisc]);

  useEffect(() => {
    // console.log('Count has been updated to: ', cart.total);
    if (cart?.coupon) {
      setcouponDisc(calcDisc(cart.coupon));
    }
  }, [cart]);



  return (
    <>
      <section className={styles["breadcrumb"]}>
        <Container>
          <Row className={`text-center ${styles["content"]}`}>
            <h2>Cart</h2>
            <p>
              <span>
                <Link href="/">Home</Link>
              </span>{" "}
              <span>/</span>
              <span> Cart</span>
            </p>
          </Row>
        </Container>
      </section>
      <section className={styles["cart-section"]}>
        <Container className=" pb-5 h-100">
          <Row className="flex justify-content-center align-items-center h-100">
            <Col lg={12}>
              <div className={`${styles["mob-card"]} card`}>
                <div className="card-body p-4">

                  <h5 className="mb-3">
                    <a href="/" className="text-body">
                      <i className="fas fa-long-arrow-alt-left me-2"></i>
                      Continue shopping
                    </a>
                  </h5>
                  <hr />

                  <div
                    className={`${styles["box-head-mob"]} d-flex justify-content-between align-items-center mb-4`}
                  >
                    <div>
                      <p className="mb-1">Shopping cart</p>
                      <p className="mb-0">
                        You have {cart.quantity} items in your cart
                      </p>
                    </div>
                    {/* <div>
                      <p className={`${styles["box-p-mob"]} mb-0`}>
                        <span className="text-muted">Sort by:</span>{" "}
                        <a href="#!" className="text-body">
                          price <i className="fas fa-angle-down mt-1"></i>
                        </a>
                      </p>
                    </div> */}
                  </div>
                  {cart.products.map((product) => {
                    const firstImage =
                      product.postImage && product.postImage.length > 3
                        ? product.postImage[3]
                        : "";
                    return (
                      <div className="card mb-3">
                        <div className="card-body">
                          <div
                            className={`${styles["content-box-mob"]} d-flex justify-content-between`}
                          >
                            <div className="d-flex  align-items-center">
                              <div>
                                <Image
                                  className={styles["productcart-image"]}
                                  objectFit="containt"
                                  layout="responsive"
                                  height="80"
                                  width="81"
                                  alt="product_img"
                                  src={firstImage}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>{product.postTopicName}</h5>
                                <p className="small fw-bold mb-0">
                                  {product.selectedVariantName
                                    ? product.selectedVariantName
                                    : product.postVariantName1}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex  align-items-center">
                              <div
                                className={styles["product-quantity"]}
                                style={{ width: "110px" }}
                              >
                                <Button
                                  variant="outline-dark"
                                  // style={{ fontSize: "8px" }}
                                  className={styles['plus-minus']}
                                  size="sm"
                                  onClick={() => handleDecrement(product)}
                                >
                                  <FaMinus />
                                </Button>
                                <h5 className={`${styles['h5-size']} fw-bold ps-3 pe-3 mb-0`}>
                                  {product.quantity}
                                </h5>
                                <Button
                                  variant="outline-dark"
                                  // style={{ fontSize: "8px" }}
                                  className={styles['plus-minus']}
                                  size="sm"
                                  onClick={() => handleIncrement(product)}
                                >
                                  <FaPlus />
                                </Button>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className={`${styles['h5-size']} mb-0`}>
                                  ₹
                                  {product.selectedVariantPrice
                                    ? product.selectedVariantPrice *
                                    product.quantity
                                    : product.price * product.quantity}
                                </h5>
                              </div>
                              <a
                                href="#!"
                                style={{ color: "#9f6d00" }}
                                onClick={() => handleDelete(product)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </Col>

            {cart.quantity === 0 ? (
              ""
            ) : (
              <Col lg={12}>
                <div className={styles['coupon-chckout']}>
                  <div className="mt-4">
                    <Form.Label className="col-12" style={{ color: "#000" }}  >Coupon  {cart.coupon ? cart.coupon.couponCode ? <small style={cpnCodStyl}  > Applied {cart.coupon.couponCode} </small> : "not applied" : "not applied"}    </Form.Label>
                    <Form className="d-flex">
                      <Col>
                        <Form.Group className="mb-3" controlId="couponCodeInp">
                          <Form.Control
                            type="text"
                            placeholder="Enter Coupon Code Here"
                            className={styles['coupon-code']}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          className="ms-3"
                          onClick={applyCoupon}>
                          Apply
                        </Button>
                      </Col>


                      {/* <Row>
                    <Col>
                    Select Delivery
                    </Col>

                    <Col>
                      <select defaultValue={delRate} onChange={(e)=>setdelRate( parseInt(e.target.value))}>
                        <option value="80">Mumbai</option>
                        <option value="120">Noth East</option>
                        <option value="150">Rest of India</option>
                      </select>
                    </Col>
                  </Row> */}
                    </Form>

                    {/* <Form>
                      <Col>
                        <Form.Group controlId="formGridCity">
                          <Form.Label style={{ color: "#000" }}>Select Delivery</Form.Label>
                        </Form.Group></Col>
                      <Col>
                        <Form.Group controlId="formGridState">
                          <Form.Select defaultValue={delRate} onChange={(e) => setdelRate(parseInt(e.target.value))} className={styles['city-select']}>
                            <option value="80">Mumbai</option>
                            <option value="150">North East</option>
                            <option value="120">Rest of India</option>
                          </Form.Select>
                        </Form.Group></Col>
                    </Form> */}

                  </div>
                  <div className={`${styles["chckout-div"]}  mt-3`}>
                    <div className={styles['total-price-div']}>
                      <div className="d-flex justify-content-between mb-2">
                        <p>Item total</p>
                        <p className="">₹{cart.total}</p>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p>Discount</p>
                        <p className=""> {couponDisc ? "- ₹" + Math.round(couponDisc) : "No Coupon"}</p>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p>Delivery Charges</p>
                        <p className=''>&#43; ₹{delRate}</p>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p>Grand Total</p>
                        <p className="">₹{cart.total - Math.round(couponDisc) + delRate}</p>
                      </div>
                    </div>
                    {cart.quantity > 0 ? (
                      <Link href="/checkout" passHref>
                        <Button
                          style={{ margin: "10px 0px 10px" }}
                          className={`${styles["chckout-btn"]} `}
                          variant="outline-dark"
                          id="button-addon2"
                        >
                          <span className="pe-2" style={{ marginTop: "-2px" }}>
                            <CiLock />
                          </span>
                          <span className="pe-2">Checkout</span>
                          <span className="">Rs. {cart.total - Math.round(couponDisc) + delRate}.00</span>
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        style={{ margin: "10px 0px 10px", maxWidth: "250px" }}
                        className={`${styles["newsbtn"]} `}
                        variant="outline-dark"
                        id="button-addon2"
                        size="sm"
                        disabled
                      >

                        <span className="pe-2" style={{ marginTop: "-2px" }}>
                          <CiLock />
                        </span>
                        <span className="px-2">Checkout</span>
                        <span className="px-2">Rs.  {cart.total - Math.round(couponDisc) + delRate}.00</span>
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
            )}

            {/* <div className="text-center py-5">
              <h3>YOU MAY ALSO LIKE</h3>
            </div>
            <div className="row">
              <div className="col-lg-3 text-center">
                <Image
                  className={styles["otherproduct-image"]}
                  objectFit="containt"
                  layout="responsive"
                  height="100"
                  width="101"
                  alt="product-img"
                  src="/images/product1.png"
                />
                <h5>Hair Oil</h5>
                <p>
                  From Rs. 1,400.00{" "}
                  <span className="text-decoration-line-through">1,750.00</span>
                </p>
                <div className="d-flex justify-content-center">
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <p className="px-2" style={{ marginTop: "-3px" }}>
                    No reviews
                  </p>
                </div>
              </div>
              <div className="col-lg-3 text-center">
                <Image
                  className={styles["otherproduct-image"]}
                  objectFit="containt"
                  layout="responsive"
                  height="180"
                  width="181"
                  alt="product-img"
                  src="/images/product2.png"
                />
                <h5>Hair Oil</h5>
                <p>
                  From Rs. 1,400.00{" "}
                  <span className="text-decoration-line-through">1,750.00</span>
                </p>
                <div className="d-flex justify-content-center">
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <p className="px-2" style={{ marginTop: "-3px" }}>
                    No reviews
                  </p>
                </div>
              </div>
              <div className="col-lg-3 text-center">
                <Image
                  className={styles["otherproduct-image"]}
                  objectFit="containt"
                  layout="responsive"
                  height="180"
                  width="181"
                  alt="product-img"
                  src="/images/product1.png"
                />
                <h5>Hair Oil</h5>
                <p>
                  From Rs. 1,400.00{" "}
                  <span className="text-decoration-line-through">1,750.00</span>
                </p>
                <div className="d-flex justify-content-center">
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <p className="px-2" style={{ marginTop: "-3px" }}>
                    No reviews
                  </p>
                </div>
              </div>
              <div className="col-lg-3 text-center">
                <Image
                  className={styles["otherproduct-image"]}
                  objectFit="containt"
                  layout="responsive"
                  height="180"
                  width="181"
                  alt="product-img"
                  src="/images/product2.png"
                />
                <h5>Hair Oil</h5>
                <p>
                  From Rs. 1,400.00{" "}
                  <span className="text-decoration-line-through">1,750.00</span>
                </p>
                <div className="d-flex justify-content-center">
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <p className="px-2" style={{ marginTop: "-3px" }}>
                    No reviews
                  </p>
                </div>
              </div>
            </div> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default index;
