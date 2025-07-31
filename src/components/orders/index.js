import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Card,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { ImCross, ImCheckmark } from "react-icons/im";
import { TiClipboard } from "react-icons/ti";
import { FaTruck } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import styles from "./profile.module.scss";
import { publicRequest } from "../../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading";
import { FaLocationDot } from "react-icons/fa6";

const Index = () => {
  const [order, setOrder] = useState([]);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.order);
  const [delCharge, setdelCharge] = useState(0);
  const [couponDisc, setcouponDisc] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [token, setToken] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const postalCode = user.currentUser.address.postalCode;
  // Define the range of postal codes for Mumbai
  const mumbaiPostalCodeRange = {
    start: 400001,
    end: 400104
  };

  // const isMumbai = (postalCode) => {
  //   return postalCode >= mumbaiPostalCodeRange.start && postalCode <= mumbaiPostalCodeRange.end;
  // };

  // const isMumbai = postalCode >= mumbaiPostalCodeRange.start && postalCode <= mumbaiPostalCodeRange.end;


  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await publicRequest.get(`/orders/find/${currentUser._id}`);
        // console.log(res.data)
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error as needed, e.g., set an error state
      }
    };

    // fetchToken();
    getOrders();
  }, [currentUser]);


  // useEffect(() => {
  //   fetchToken();
  // }, []);


  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal by resetting the selected order
    setTrackingData(null)
  };

  // const fetchToken = async () => {
  //   const credentials = {
  //     'email': process.env.NEXT_PUBLIC_REACT_APP_SHPRT_EMAIL,
  //     'password': process.env.NEXT_PUBLIC_REACT_APP_SHPRT_PWD,
  //   };

  //   try {
  //     // Make your API request to get the token
  //     const response = await publicRequest.post('https://apiv2.shiprocket.in/v1/external/auth/login', credentials, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.data.token;
  //     setToken(data); // Store token in state
  //   } catch (error) {
  //     console.error('Failed to fetch token:', error);
  //   }
  // };


  const statusMap = {
    6: "Shipped",
    7: "Delivered",
    8: "Canceled",
    9: "RTO Initiated",
    10: "RTO Delivered",
    12: "Lost",
    13: "Pickup Error",
    14: "RTO Acknowledged",
    15: "Pickup Rescheduled",
    16: "Cancellation Requested",
    17: "Out For Delivery",
    18: "In Transit",
    19: "Out For Pickup",
    20: "Pickup Exception",
    21: "Undelivered",
    22: "Delayed",
    23: "Partial Delivered",
    24: "Destroyed",
    25: "Damaged",
    26: "Fulfilled",
    27: "Pickup Booked",
    38: "Reached at Destination Hub",
    39: "Misrouted",
    40: "RTO NDR",
    41: "RTO OFD",
    42: "Picked Up",
    43: "Self Fulfilled",
    44: "Disposed Off",
    45: "Cancelled Before Dispatched",
    46: "RTO In Intransit",
    47: "QC Failed",
    48: "Reached Warehouse",
    49: "Custom Cleared",
    50: "In Flight",
    51: "Handover to Courier",
    52: "Shipment Booked",
    54: "In Transit Overseas",
    55: "Connection Aligned",
    56: "Reached Overseas Warehouse",
    57: "Custom Cleared Overseas",
    59: "Box Packing",
    60: "FC Allocated",
    61: "Picklist Generated",
    62: "Ready to Pack",
    63: "Packed",
    67: "FC Manifest Generated",
    68: "Processed at Warehouse",
    71: "Handover Exception",
    72: "Packed Exception",
    75: "RTO Lock",
    76: "Untraceable",
    77: "Issue Related to the Recipient",
    78: "Reached Back at Seller City"
  };


  const handleOpenModal = async (orderItem) => {
    setSelectedOrder(orderItem); // Open the modal by setting the selected order
    const shpsts = async (orderItem) => {
      setLoading(true);
      try {
        const response = await publicRequest.post(`/shprkt/track-order`, { awb_id: orderItem.trackingId });
        setTrackingData(response.data.tracking_data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tracking data:", error);
      } finally {
        setLoading(false);
      }
    }
    await shpsts(orderItem)
  };

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
          prPric -= parseInt(itmDisc);
          cupnDiscTot += parseInt(elem.quantity) * parseInt(itmDisc);
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

  const calcGST = (pinCode, product) => {
    // console.log("pincode", pinCode)
    // console.log("product", product)

    // var delChrgs = 120;
    // (qNew.address.postalCode).startsWith('400') ? delChrgs = 80 : false;
    // (qNew.address.postalCode).startsWith('700') ? delChrgs = 150 : false;

    if (String(pinCode).startsWith('400')) {
      const gstPerUnit = product.gstNumber / 2;
      const amount = Math.round(parseInt(product.gstNumber ? product.gstNumber * (product.selectedVariantPrice / 100) * product.quantity : 0) / 2);
      return `CGST(${gstPerUnit}%)  SGST(${gstPerUnit}%)`;
    } else {
      return `IGST(${product.gstNumber}%)`;
    }

  }


  return (
    <>
      <section className={`${styles["breadcrum"]}`}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <h2>Orders</h2>
                <p>
                  <span>
                    <Link href="/#">Home</Link>
                  </span>{" "}
                  <span>/</span>
                  <span> Orders</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles["profile-content"]} my-5`}>
        <Container>
          <Row>
            <h3 className="mb-3">My Orders</h3>
            {order &&
              order
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((orderItem) => (
                  <Col lg={6} className="mb-3">
                    {/* {orderItem.products.map((product) => ( */}
                    <div key={orderItem._id}>
                      {/* {console.log("order item", orderItem)} */}
                      <Card

                        className={styles["card-pointer"]}
                      >
                        <Card.Body>
                          <Card.Title>
                            <div className="d-flex">
                              <p>Order # {orderItem.orderId}</p>
                            </div>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            <div className={styles["card"]}>
                              <div>
                                {/* <span className="mb-3">
                                Order # {orderItem._id}
                              </span> */}
                                <br />
                                <span className="mb-3">
                                  Items ({orderItem.quantity})
                                </span>
                              </div>
                              <br />
                              <div>
                                ₹{orderItem.amount}
                                <br />
                                <span>
                                  {new Date(
                                    orderItem.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </Card.Subtitle>
                          <Card.Text className=" d-flex justify-content-between">
                            <div>
                              {/* <span className="text-danger">
                            <GoDotFill />
                          </span>
                          <span className="text-success">
                            <GoDotFill />
                          </span>
                          {orderItem.status} */}
                              {orderItem.status === "pending" ||
                                orderItem.status === "rejected" ? (
                                <span className="text-danger">
                                  <GoDotFill />
                                </span>
                              ) : (
                                <span className="text-success">
                                  <GoDotFill />
                                </span>
                              )}
                              {orderItem.status}
                            </div>
                            <div>
                              <Button variant="outline-dark" size="sm" onClick={() => handleOpenModal(orderItem)}>
                                view order details
                              </Button>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    {/* ))} */}
                  </Col>
                ))}
          </Row>
        </Container>
        <Modal show={!!selectedOrder} centered onHide={handleCloseModal}>
          <Modal.Header closeButton></Modal.Header>
          {selectedOrder && (
            <Modal.Body>
              {/* Tracking Section */}
              <div>
                {loading ? (
                  <p>Loading tracking info...</p>
                ) : trackingData ? (
                  <>
                    {/* Track Status */}
                    <p> <span style={{ fontSize: "25px", color: "#d7b56d" }}>
                      <FaTruck />
                    </span>{" "}
                      Status :{statusMap[trackingData.shipment_status] || "Pending Status"}</p>


                    {trackingData.shipment_track_activities ? trackingData.shipment_track_activities.length > 0 && (
                      <p>
                        <span style={{ fontSize: "25px", color: "#d7b56d" }}>
                          <TiClipboard />
                        </span>{" "}
                        Live Location: {trackingData.shipment_track_activities[0]?.location}
                      </p>
                    ) : ''}

                    {/* Estimated Delivery */}
                    <p>
                      <span style={{ fontSize: "25px", color: "#d7b56d" }}>
                        <FaLocationDot />
                      </span>{" "}
                      Est. Delivery:{" "}
                      {trackingData.etd
                        ? new Date(trackingData.etd).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </>
                ) : (
                  <p>Tracking data not available.</p>
                )}
              </div>
              <hr />

              <p>({selectedOrder.quantity}) Items</p>
              {selectedOrder.products.map((product) => (
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src={
                          product.postImage.length > 0
                            ? product.postImage[3]
                            : ""
                        }
                        alt={product.postTopicName}
                        style={{
                          width: "80px",
                          height: "80px",
                          marginRight: "5px",
                        }}
                      />
                      <p className="mt-2">
                        {product.postTopicName} ({product.quantity})
                        <br />
                        {product.productCode1 ? (<> <span>HSN #{product.productCode} #{product.productCode1}</span></>) : (<> <span>HSN #{product.productCode}</span></>)}
                        <br />
                        {selectedOrder.shippingAddress
                          ? calcGST((selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingpostalCode : selectedOrder.shippingAddress.shippingpostalCode), product)
                          : calcGST(selectedOrder.address.postalCode, product)}
                      </p>
                    </div>
                    <div>
                      <p>₹{product.selectedVariantPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
              <div>
                <div className="d-flex justify-content-between">
                  <p>Item total</p>
                  {selectedOrder.mop === 'COD' ? (
                    <p>₹{selectedOrder.amount}</p>
                  ) : (
                    <p>₹{selectedOrder.amount - parseFloat(selectedOrder.deliveryCharge)}</p>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  <p>Discount</p>
                  <p>- {selectedOrder.discount ? selectedOrder.discount : "No coupon"}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Delivery</p>
                  <p>+ ₹{selectedOrder.deliveryCharge}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Grand Total</p>
                  {selectedOrder.mop === 'COD' ? (
                    <p>₹{`${parseFloat(selectedOrder.amount) + parseFloat(selectedOrder.deliveryCharge)}`}.00</p>
                  ) : (
                    <p>₹{`${parseFloat(selectedOrder.amount)}`}.00</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="tbl-bdr">
                <p>Your Details</p>
                <Table>
                  <tbody>
                    <tr>
                      <td>First Name :</td>
                      {selectedOrder.shippingAddress ?
                        <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingfirstName : selectedOrder.shippingAddress.shippingfirstName}</td>
                        :
                        <td>{currentUser.userName}</td>
                      }
                    </tr>
                    <tr>
                      <td>Last Name :</td>
                      {selectedOrder.shippingAddress ?
                        <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippinglastName : selectedOrder.shippingAddress.shippinglastName}</td>
                        :
                        <td>{currentUser.userName}</td>
                      }
                    </tr>
                    <tr>
                      <td>Email :</td>
                      <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingemail : selectedOrder.shippingAddress.shippingemail}</td>
                    </tr>
                    <tr>
                      <td>Address :</td>
                      {selectedOrder.shippingAddress ?
                        <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingline1 : selectedOrder.shippingAddress.shippingline1}{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingline2 : selectedOrder.shippingAddress.shippingline2}</td>
                        :
                        <td>{selectedOrder.address.address}</td>
                      }
                    </tr>
                    <tr>
                      <td>City :</td>
                      {selectedOrder.shippingAddress ?
                        <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingcity : selectedOrder.shippingAddress.shippingcity}</td>
                        :
                        <td>{selectedOrder.address.city}</td>
                      }
                    </tr>
                    <tr>
                      <td>State :</td>
                      {selectedOrder.shippingAddress ?
                        <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingstate : selectedOrder.shippingAddress.shippingstate}</td>
                        :
                        <td>{selectedOrder.address.state}</td>
                      }
                    </tr>
                    <tr>
                      <td>Country :</td>
                      <td>India</td>
                    </tr>
                    <tr>
                      <td>Pin Code :</td>
                      {selectedOrder.shippingAddress ?
                        <td>{selectedOrder.shippingAddress[0] ? selectedOrder.shippingAddress[0].shippingpostalCode : selectedOrder.shippingAddress.shippingpostalCode}</td>
                        :
                        <td>{selectedOrder.address.postalCode}</td>
                      }
                    </tr>
                    <tr>
                      <td>Mobile :</td>
                      <td>{currentUser.contact}</td>
                    </tr>
                    <tr>
                      <td>Payment :</td>
                      <td>{selectedOrder.mop}</td>
                    </tr>
                    {/* <tr>
                      <td>Tracking ID :</td>
                      <td>{selectedOrder.trackingId}</td>
                    </tr> */}
                    <tr>
                      <td>Placed On :</td>
                      <td>{new Date(selectedOrder.createdAt).toLocaleDateString()}</td>
                    </tr>

                  </tbody>
                </Table>
              </div>
            </Modal.Body>
          )}
          {/* <Modal.Footer className="justify-content-start">
            <p>
              <strong>
                To track your order{" "}
                <span className={styles["click"]}>
                  <Link href="https://www.delhivery.com/tracking">
                    Click here
                  </Link>
                </span>
              </strong>
            </p>
          </Modal.Footer> */}
        </Modal>
      </section>
    </>
  );
};

export default Index;
