import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Offcanvas, Col, Card, Row, Form, Button } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { IoReorderThree, IoSearch } from "react-icons/io5";
import { FaCartPlus, FaUser } from "react-icons/fa";
import styles from "../master/header.module.scss";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from '../../../redux/cartRedux'
import { logout } from "../../../redux/apiCalls";
import { publicRequest } from "../../../requestMethods";
import { useRouter } from 'next/router';


// if (typeof window !== "undefined") {
//   window.dataLayer = window.dataLayer || [];
//   function gtag() {
//     dataLayer.push(arguments);
//   }
//   gtag("js", new Date());
//   gtag("config", "G-6JW6YCP2XW");
// }

const Header = ({ productData: initialProductData, sluginput }) => {
  // if (isMobile) {
  //   $(".nav-link").click(function () {
  //     // if(!$(this).hasClass("dropdown-toggle")){
  //     $("#navcolbtn").click();
  //     // }
  //   });
  // }
  const [product, setProduct] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});

  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const router = useRouter();


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

    getProduct();
  }, []);

  const redirectToAnotherPage = (href) => {
    handleClose(); // Close the Offcanvas
    router.push(href); // Redirect to the specified page
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = Object.entries(product)
    .filter(([key, item]) => item.postIsActiveStatus === "1" && item.postTopicName.toLowerCase().includes(searchQuery.toLowerCase()));


  if (isMobile) {
    $(".nav-link").click(function () {
      if (!$(this).hasClass("dropdown-toggle")) {
        $("#navcolbtn").click();
      }
    });
  }

  const handleNavClose = () => {
    document.getElementById("navcolbtn").click();
  };

  if (isMobile) {
    $(".nav-link").click(function () {
      if (!$(this).hasClass("dropdown-toggle")) {
        handleNavClose();
      }
    });
  }

  const currentUser = useSelector((state) => state.user);
  // console.log(currentUser)
  // const { userInfo } = userLogin;

  // const quantity = useSelector(state => state.cart.quantity)
  const quantity = useSelector((state) => state.cart.products.length);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    // logout(dispatch());
    dispatch(logout);
    dispatch(resetCart());

    localStorage.clear();
    sessionStorage.clear();
    clearCookies();
    // window.location.href = '/login';
  };

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    cookies.forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToggle = () => setIsNavbarExpanded(!isNavbarExpanded);

  return (
    <>

      <header>
        <Navbar className={`${styles["nav-clr"]} `} expand="lg" fixed="top" expanded={isNavbarExpanded}>
          <Container fluid id="header11">
            <Link className="navbar-brand" href="/">
              <Image
                src="/images/logo.png"
                alt="logo_img"
                key=""
                height={90}
                width={90}
                objectFit="contain"
                className={styles["nav-logo"]}
              />
            </Link>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="navbar-nav mr-auto w-100 justify-content-end clearfix"
                navbarScroll
              >
                <Link className={`${styles["pad-a"]} nav-link pe-5`} href="/">
                  Home
                </Link>
                <Link
                  className={`${styles["pad-a"]} nav-link pe-5`}
                  href="/aboutus"
                >
                  About
                </Link>
                <Link
                  className={`${styles["pad-a"]} nav-link pe-5`}
                  href="/#shop"
                >
                  Shop
                </Link>
                <Link
                  className={`${styles["pad-a"]} nav-link pe-5`}
                  href="/blog"
                >
                  Blog
                </Link>
                <Link
                  className={`${styles["pad-a"]} nav-link pe-5`}
                  href="/contact"
                >
                  Contact
                </Link>

                {/* <Link className="nav-link pe-5" href="/cart">
                  <button
                    type="button"
                    className={`${styles['cart-btn']} btn position-relative`}
                  >
                    <span className={styles['cart-icon']}><FaCartPlus /></span>
                    <span className={`${styles['cart-badge']} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                      {quantity}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </Link> */}
                {currentUser && currentUser.currentUser ? (
                  <NavDropdown
                    title={currentUser.currentUser.firstName || currentUser.currentUser.userName}
                    id="username"
                    className={`${styles["pad-a1"]} pe-5`}
                  >
                    <NavDropdown.Item onClick={logoutHandler} className="pe-5">
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="nav-link pe-5" href="/orders" onClick={handleNavClose}>
                        Orders
                      </Link>
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item>
                      <Link className="nav-link pe-5" href="/editProfile" onClick={handleNavClose}>
                        Edit Profile
                      </Link>
                    </NavDropdown.Item> */}
                  </NavDropdown>
                ) : (
                  <Link
                    className={`${styles["pad-a"]} nav-link pe-5`}
                    href="/login"
                  >
                    <FaUser /> Sign In
                  </Link>
                )}

                {!isMobile && (
                  <>
                    <Link className="nav-link pe-5" href="/cart">
                      <button type="button" className={`${styles["cart-btn"]} btn position-relative`}>
                        <span className={styles["cart-icon"]}>
                          <FaCartPlus />
                        </span>
                        <span className={`${styles["cart-badge"]} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                          {quantity}
                          <span className="visually-hidden">unread messages</span>
                        </span>
                      </button>
                    </Link>
                    <Link className="nav-link" href='' onClick={handleShow}>
                      <div className={styles['search-icon']}>
                        <IoSearch />
                      </div>
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
            {isMobile && (
              <Link className="nav-link pe-3" href='' onClick={() => { handleShow(); handleNavClose(); }}>
                <div className={styles['search-icon']}>
                  <IoSearch />
                </div>
              </Link>
            )}
            {isMobile && !isNavbarExpanded && (
              <Nav className={`${styles["cart-icon-mobile"]} navbar-nav`}>
                <div className="d-flex align-items-center">

                  <Link className="nav-link " href="/cart">
                    <button
                      type="button"
                      className={`${styles["cart-btn"]} btn position-relative`}
                    >
                      <span className={styles["cart-icon"]}>
                        <FaCartPlus />
                      </span>
                      <span
                        className={`${styles["cart-badge"]} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}
                      >
                        {quantity}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </Link>

                </div>
              </Nav>
            )}

            {/* {!isMobile && (
              <Nav className={`${styles["cart-icon-desktop"]} navbar-nav`}>
                <Link className="nav-link pe-5" href="/cart">
                  <button
                    type="button"
                    className={`${styles["cart-btn"]} btn position-relative`}
                  >
                    <span className={styles["cart-icon"]}>
                      <FaCartPlus />
                    </span>
                    <span
                      className={`${styles["cart-badge"]} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}
                    >
                      {quantity}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </Link>
                <Link className="nav-link" href=''onClick={handleShow} >
                  <div className={styles['search-icon']} >
                  <IoSearch />
                  </div>
                </Link>
              </Nav>
            )} */}

            <Offcanvas show={show} onHide={handleClose} placement="end"> {/* Change placement to "end" */}
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Container>
                  <Row>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className={styles['login-bdr']} type="text" placeholder="Search Products..." value={searchQuery}
                          onChange={handleSearchChange} />
                      </Form.Group>

                    </Form>
                    {filteredProducts.map(([key, item], index) => {
                      const firstImage =
                        item.postImage.length > 0 ? item.postImage[3] : "";
                      return (
                        <Col lg={6} key={key} className=" col-6 pb-4">
                          {/* <Link href={/product/${(item[1].postTopicName).toLowerCase().split(" ").join("-")}}> */}
                          <Card className={`${styles["product-card"]} h-100`}>
                            <Link
                              key={key}
                              href={`/product/[slug]`} as={`/product/${item.sluginput.toLowerCase().split(" ").join("-")}`}
                              onClick={() => redirectToAnotherPage(`/product/${item.sluginput.toLowerCase().split(" ").join("-")}`)}
                            >
                              <Card.Img
                                variant="top"
                                alt="firstImage"
                                src={firstImage}
                              />
                            </Link>
                            <Card.Body className="justify-content-center">
                              <Card.Title className={styles['title-size']}>
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
                                  <>Rs. {item.postPriceName}.00</>
                                )}
                              </Card.Text>
                              {/* <Card.Title>{item[1].postTopicName}</Card.Title>
                                            <Card.Text>Rs. {item[1].postPriceName}.00</Card.Text> */}
                              {/* <InputGroup className=" justify-content-center">
                          {item.postVariantName2 == "" ? "" :
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
                            </DropdownButton>}
                          <Button
                            onClick={() => addProductInCart(item, key)}
                            className={styles["add-cart"]}
                            variant="outline-dark"
                            id="button-addon2"
                          >
                            ADD TO CART
                          </Button>
                        </InputGroup> */}
                            </Card.Body>
                          </Card>
                        </Col>


                      );
                    })}
                  </Row>
                </Container>
              </Offcanvas.Body>
            </Offcanvas>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" id="navcolbtn" onClick={handleToggle}>
              <span className={styles["togg-btn"]}>
                <IoReorderThree />
              </span>
            </Navbar.Toggle>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
