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
import { motion } from "framer-motion";
// import * as fbq from '../../../lib/fpixel';


const products = [
  {
    name: "California Almonds",
    category: "Nuts",
    weight: "250 grams",
    price: 525,
    image: "/images/almonds.jpg",
  },
  {
    name: "Cashew Nuts",
    category: "Nuts",
    weight: "250 grams",
    price: 300,
    image: "/images/cashews.jpg",
  },
  {
    name: "Walnut Kernels",
    category: "Nuts",
    weight: "250 grams",
    price: 250,
    image: "/images/walnuts.jpg",
  },
  {
    name: "Premium Dates",
    category: "Dry Fruit",
    weight: "500 grams",
    price: 400,
    image: "/images/dates.jpg",
  },
  {
    name: "Pistachios",
    category: "Nuts",
    weight: "250 grams",
    price: 450,
    image: "/images/pistachios.jpg",
  },
  {
    name: "Raisins",
    category: "Dry Fruit",
    weight: "250 grams",
    price: 180,
    image: "/images/raisins.jpg",
  },
  {
    name: "kishmis",
    category: "Dry Fruit",
    weight: "250 grams",
    price: 180,
    image: "/images/kishmis.jpg",
  },
  {
    name: "dryfigs",
    category: "Dry Fruit",
    weight: "250 grams",
    price: 180,
    image: "/images/dryfigs.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};


const Product = ({ productData: initialProductData }) => {
  const [productData, setProductData] = useState(initialProductData);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [product, setProduct] = useState({});
  const [comboproduct, setComboProduct] = useState({});
  const [modalLink, setmodalLink] = useState("#");

  // const [quantity, setQuantity] = useState(0);
  // const dispatch = useDispatch();

  // const handleVariantSelect = (productId, variant) => {
  //   setSelectedVariants((prevVariants) => ({
  //     ...prevVariants,
  //     [productId]: variant,
  //   }));
  // };

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await publicRequest.get("/products");
  //       setProduct(res.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       // Handle error as needed, e.g., set an error state
  //     }
  //   };


  //   const getCombo = async () => {
  //     try {
  //       const res = await publicRequest.get("/combo");
  //       setComboProduct(res.data);
  //       console.log("combo data", res.data);
  //     } catch (error) {
  //       console.error("Error fetching comboproducts:", error);
  //       // Handle error as needed, e.g., set an error state
  //     }
  //   };

  //   getProduct();
  //   getCombo();
  // }, []);

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

  // const addProductInCart = (item, key) => {
  //   setQuantity(1);
  //   item["selectedVariantName"] = selectedVariants[key] ? selectedVariants[key]["variantName"] : item.postVariantName1;
  //   item["selectedVariantPrice"] = selectedVariants[key] ? selectedVariants[key]["price"] : item.postPriceName;
  //   item["quantity"] = 1;
  //   // console.log(item,key);
  //   // console.log(selectedVariants[key]);
  //   dispatch(
  //     addProduct(item)
  //   );
  //   setmodalLink('/product/' + item.sluginput.toLowerCase().split(" ").join("-"));
  //   setShow(true);
  //   fbq.addToCart(item._id, item.postPriceName, item.category, item.postTopicName);

  // };

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // // const handleShow = () => setShow(true);

  return (
    <section style={{ background: "#fdfdfd", padding: "50px 0" }}>
      <Container>
        <h2 className="text-center mb-5 fw-bold">Our Premium Products</h2>
        <Row>
          {products.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex align-items-stretch">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-100"
              >
                <Card className={styles.card}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={styles.imageWrapper}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="rounded"
                      layout="responsive"
                    />
                  </motion.div>
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title className={styles.productName}>{product.name}</Card.Title>
                      <span className={styles.weight}>{product.weight}</span>
                    </div>
                    <Card.Text className={styles.category}>{product.category}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={styles.price}>Rs. {product.price.toFixed(2)}</span>
                      <Button className={styles.cartButton}>Add to Cart</Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Product;
