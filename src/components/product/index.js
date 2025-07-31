import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./product.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { database } from "../../config/Fire";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
// import * as fbq from '../../../lib/fpixel';


const Product = ({ productData: initialProductData }) => {
  const [productData, setProductData] = useState(initialProductData);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [product, setProduct] = useState({});
  const [comboproduct, setComboProduct] = useState({});
  const [modalLink, setmodalLink] = useState("#");

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleVariantSelect = (productId, variant) => {
    setSelectedVariants((prevVariants) => ({
      ...prevVariants,
      [productId]: variant,
    }));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error as needed, e.g., set an error state
      }
    };


    const getCombo = async () => {
      try {
        const res = await publicRequest.get("/combo");
        setComboProduct(res.data);
        console.log("combo data", res.data);
      } catch (error) {
        console.error("Error fetching comboproducts:", error);
        // Handle error as needed, e.g., set an error state
      }
    };

    getProduct();
    getCombo();
  }, []);

  // useEffect(() => {
  //   if (initialProductData) {
  //     fbq.viewContent(initialProductData._id, initialProductData.postPriceName);
  //   }
  // }, [initialProductData]);



  // useEffect(() => {
  //   const productRef = database.ref("product");
  //   const unsubscribe = productRef.on("value", (snapshot) => {
  //     try {
  //       if (snapshot && snapshot.val()) {
  //         const updatedProductData = snapshot.val();
  //         setProductData(updatedProductData);
  //       } else {
  //         console.error("Firebase snapshot is empty or null");
  //       }
  //     } catch (error) {
  //       console.error("Error processing Firebase data:", error);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  const addProductInCart = (item, key) => {
    setQuantity(1);
    item["selectedVariantName"] = selectedVariants[key] ? selectedVariants[key]["variantName"] : item.postVariantName1;
    item["selectedVariantPrice"] = selectedVariants[key] ? selectedVariants[key]["price"] : item.postPriceName;
    item["quantity"] = 1;
    // console.log(item,key);
    // console.log(selectedVariants[key]);
    dispatch(
      addProduct(item)
    );
    setmodalLink('/product/' + item.sluginput.toLowerCase().split(" ").join("-"));
    setShow(true);
    fbq.addToCart(item._id, item.postPriceName, item.category, item.postTopicName);

  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <section className={`${styles["products-main"]} py-4`} id="shop">
      <Container>
        <Row className=" text-center">
          <h3 style={{ color: "#D7B56D" }} className="">Our Popular Products</h3>
          <h2 style={{ color: "#D7B56D" }} className="mb-4">Best Sellers</h2>
          {product &&
            Object.entries(product)
              // .filter(([key, item]) => item.postIsActiveStatus === "1" && item.category === "Hair Oil")
              .filter(([key, item]) => item.postIsActiveStatus === "1").sort((a, b) => a[1].postPositionNo - b[1].postPositionNo)
              .map(([key, item], index) => {
                const firstImage =
                  item.postImage.length > 0 ? item.postImage[3] : "";
                return (
                  <Col lg={3} key={key} className=" col-6 pb-4">
                    {/* <Link href={/product/${(item[1].postTopicName).toLowerCase().split(" ").join("-")}}> */}
                    <Card className={`${styles["product-card"]} h-100`}>
                      <Link
                        key={key}
                        href={`/product/${item.sluginput
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`}
                      >

                        <Card.Img
                          variant="top"
                          alt="firstImage"
                          src={firstImage}
                          className="mt-1"
                        />
                      </Link>
                      <Card.Body className="justify-content-center">
                        <Card.Title className={styles['card-heading']}>
                          {selectedVariants[key]?.variantName ? (
                            <>
                              {item.postTopicName}{" "}
                              {selectedVariants[key].variantName}
                            </>
                          ) : (
                            <>
                              {item.postTopicName} {item.postVariantName2 === "" ? "" : `(${item.postVariantName1})`}
                            </>
                          )}
                        </Card.Title>
                        <Card.Text className={styles['price-txt']}>
                          {selectedVariants[key]?.price ? (
                            <>Rs. {selectedVariants[key].price}.00</>
                          ) : (
                            <>
                              {item.strikeOutName == 0 ?
                                (<> Rs. {item.postPriceName}.00</>) : (<><span className={styles['strike-price']}>Rs. {item.strikeOutName}.00</span> Rs. {item.postPriceName}.00</>)}
                            </>)}
                          <span className={`${styles['off-box']} rounded-3`}>
                            {item.discoutpercentage}% Off
                          </span>
                        </Card.Text>
                        {/* <Card.Title>{item[1].postTopicName}</Card.Title>
                                            <Card.Text>Rs. {item[1].postPriceName}.00</Card.Text> */}
                        <InputGroup className=" justify-content-center">
                          {/* {item.postVariantName2 == "" ? "" :
                            <DropdownButton
                              variant="outline-dark"
                              title={
                                selectedVariants[key]
                                  ? selectedVariants[key].variantName
                                  : "50 ml"
                              }
                              id="input-group-dropdown-1"
                            >
                              <Dropdown.Item
                                onClick={() =>
                                  handleVariantSelect(key, {
                                    title: item.postTopicName,
                                    price: item.postPriceName,
                                    variantName: item.postVariantName1,
                                  })
                                }
                              >
                                {item.postVariantName1}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  handleVariantSelect(key, {
                                    title: item.postTopicName2,
                                    price: item.postPriceName2,
                                    variantName: item.postVariantName2,
                                  })
                                }
                              >
                                {item.postVariantName2}
                              </Dropdown.Item>
                            </DropdownButton>
                          } */}
                          <Button
                            onClick={() => addProductInCart(item, key)}
                            className={styles["add-cart"]}
                            variant="outline-dark"
                            id="button-addon2"
                          >
                            ADD TO CART
                          </Button>
                        </InputGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          {/* Combo Products */}
          {comboproduct &&
            Object.entries(comboproduct)
              .filter(([key, item]) => item.postIsActiveStatus === "1").sort((a, b) => a[1].postPositionNo - b[1].postPositionNo)
              .sort((a, b) => a[1].postPositionNo - b[1].postPositionNo)
              .map(([key, item], index) => {
                const firstImage = item.images.length > 0 ? item.images[3] : "";
                return (
                  <Col lg={3} key={`combo-${key}`} className="col-6 pb-4">
                    <Card className={`${styles["product-card"]} h-100`}>
                      <Link
                        href={`/combo/${item.sluginput.toLowerCase().split(" ").join("-")}`}
                      >
                        <Card.Img
                          variant="top"
                          alt="firstImage"
                          src={firstImage}
                          className="mt-1"
                        />
                      </Link>
                      <Card.Body className="justify-content-center">
                        <Card.Title className={styles['card-heading']}>
                          {item.comboName}
                        </Card.Title>
                        <Card.Text className={styles['price-txt']}>
                          {/* {item.strikeOutName == 0 ? 
                            (<>Rs. {item.comboPrice}.00</>) : 
                            (<>
                              <span className={styles['strike-price']}>Rs. {item.strikeOutName}.00</span> 
                              Rs. {item.postPriceName}.00
                            </>)
                          } */}
                          <span className={styles['']}>Rs. {item.comboPrice}.00</span>
                          {/* <span className={`${styles['off-box']} rounded-3`}>
                            {item.discoutpercentage}% Off
                          </span> */}
                        </Card.Text>
                        <InputGroup className="justify-content-center">
                          <Button
                            onClick={() => addProductInCart(item, key)}
                            className={styles["add-cart"]}
                            variant="outline-dark"
                            id="button-addon2"
                          >
                            ADD TO CART
                          </Button>
                        </InputGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}

          <Modal
            centered
            show={show}
            onHide={handleClose}
            // size="sm"
            className={styles["cart-modal"]}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body style={{ fontFamily: 'Montserrat' }}><strong>Item Added To Cart</strong></Modal.Body>
            <Modal.Footer className="justify-content-between">
              {/* <Link className="btn btn-outline-dark" href={modalLink}>Continue Shopping</Link> */}
              <Button variant="outline-dark" onClick={handleClose}>
                Continue Shopping
              </Button>
              <Button variant="outline-secondary" href="/cart">
                Go To Cart
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      </Container>
    </section>
  );
};

export default Product;
