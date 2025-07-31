import React, { useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import styles from './success.module.scss';
import { resetCart, removeCoupon } from '../../redux/cartRedux';
import { placeOrderStart, placeOrderSuccess, resetOrder } from "../../redux/orderRedux";


const Success = () => {

    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.order);
    // const selectPostalCode = order.shippingAddress.length ? order.shippingAddress.shippingpostalCode : 400050;
    const dispatch = useDispatch();
    // const postalCode = order.shippingAddress.shippingpostalCode
    // Define the range of postal codes for Mumbai
    // const mumbaiPostalCodeRange = {
    //     start: 400001,
    //     end: 400104
    // };

    // const isMumbai = postalCode >= mumbaiPostalCodeRange.start && postalCode <= mumbaiPostalCodeRange.end;

    useEffect(() => {
        localStorage.setItem("checkoutStep", "shipping");

        dispatch(removeCoupon());
        dispatch(resetCart());
        dispatch(resetOrder());
    }, []);


    return (
        <section className={styles['success']}>
            <Container>
                <Row className=''>
                    <Col lg={12}>
                        <div className={`${styles['content']} `}>
                            <div className='justify-content-center d-flex mb-4'>
                                <Image
                                    src='/images/tick.png'
                                    height='10'
                                    width='50'
                                />
                            </div>
                            <h2 className='justify-content-center d-flex'> Thank You.</h2>
                            <h3 className='justify-content-center d-flex'>Your Order has been successfully placed.</h3>
                            {/* <p className='justify-content-center d-flex mt-4'>Your Order Number is   <strong>{order.currentOrder._id}</strong></p> */}
                            {/* {isMumbai ? (<p className='justify-content-center d-flex'>It will be Deliverd in 2-4 bussiness days.</p>) : (<p className='justify-content-center d-flex'>It will be Deliverd in 5-8 bussiness days.</p>)} */}
                            <p className='justify-content-center d-flex'>It will be Deliverd in 2-4 bussiness days.</p>
                            {/* <p className='justify-content-center d-flex'>Your order is being verified. You will receive a confirmation call shortly to confirm the details of your order.</p> */}
                            <div className='justify-content-center d-flex'>
                                <div>
                                    <span style={{ fontSize: '45px' }}><MdOutlineMarkEmailRead /></span>
                                </div>
                                {/* <div className={styles['email']}>
                                    <p> An Email receipts including details about your product has been sent to the email address provided.</p>
                                </div> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Success