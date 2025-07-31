import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import Link from 'next/link';
import Image from 'next/image';
import styles from './login.module.scss'
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const loginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);
    const currentCart = useSelector((state) => state.cart);
    console.log(currentCart);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    const handleFormSubmit = async (values, actions) => {
        try {
            login(dispatch, { email: values.email, password: values.password });
            // if (currentCart) {
            //     alert("You have login successfully");
            // }
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setSubmitting(false);
        }
    }

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            if (currentCart.products.length) {
                router.push("/checkout")
            } else {
                router.push("/")
            }
        } else {
            router.push("/login")
        }
    }, [currentUser, currentCart])

    return (
        <>
            <section className={`${styles['login-section']}`}>
                <Container>
                    {/* <div className="text-center">
                        <Image
                            key=""
                            height="180"
                            width="180"
                            objectFit="contain"
                            src="/images/logo.jpg"
                            alt="logo_img"
                        />
                    </div> */}
                    <div className="row justify-content-center">

                        <div className="col-md-5 col-lg-5">
                            <div className=" p-4 bg-white border shadow-lg rounded signup-box">
                                <h2 className="text-center">Login</h2>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().email('Invalid email').required('Email is required'),
                                        password: Yup.string().required('Password is required')
                                    })}
                                    onSubmit={handleFormSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form> {/* Include Form component here */}
                                            <div className="form-group mb-3">
                                                <label htmlFor="email">Email address</label>
                                                <Field type="text" className={`${styles['login-bdr']} form-control`} id="email" name="email" placeholder="Enter an email" />
                                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="password">Password</label>
                                                <Field type="password" className={`${styles['login-bdr']} form-control`} id="password" name="password" placeholder="Enter a password" />
                                                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                                            </div>
                                            {/* <div className='form-group text-end'>
                                                <Link href="forgotPassword" style={{ color: "#d7b56d", textDecoration: "none" }}>Forgot Password?</Link>
                                            </div> */}
                                            <div className="form-group text-center">
                                                <Button type="submit" disabled={isSubmitting} variant='outline-dark'>
                                                    {isSubmitting ? 'Logging in...' : 'Login Now'}
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                {/* <div className="or py-3">
                                    <h3><span>or</span></h3>
                                </div> */}
                                {/* <div className="row pt-3">
                                    <div className="col-lg-12 text-center">
                                        <p class="text-center"> Don't have an account?  <Link href="/register" style={{ color: "#d7b56d", textDecoration: "none" }}><strong>Register</strong></Link></p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default loginPage