import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";
import Link from 'next/link';
import Image from 'next/image';
import styles from './register.module.scss'
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterPage = () => {
    const [firstname, setFristname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);

    const handleFormSubmit = async (values, actions) => {
        try {
            register(dispatch, { firstName: values.firstname, lastName: values.lastname, password: values.password, email: values.email });
            alert("You have SignUp successfully");
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setSubmitting(false);
        }
    };
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/")
        }
    }, [currentUser])

    return (
        <>
            <section className={styles['login-section']}>
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
                            <div className="p-4 bg-white border shadow-lg rounded signup-box">
                                <h2 className="text-center">Register</h2>
                                {error && (
                                    <div className="alert alert-danger">
                                        {typeof error === 'string' ? error : error.message || JSON.stringify(error)}
                                    </div>
                                )}
                                <Formik
                                    initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
                                    validationSchema={Yup.object().shape({
                                        firstname: Yup.string().required('First Name is required'),
                                        lastname: Yup.string().required('Last Name is required'),
                                        email: Yup.string().email('Invalid email').required('Email is required'),
                                        password: Yup.string().required('Password is required')
                                    })}
                                    onSubmit={handleFormSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="form-group mb-3">
                                                <label htmlFor="name">First Name</label>
                                                <Field type="text" className={`${styles['login-bdr']} form-control`} id="firstname" name="firstname" placeholder="Enter a First Name" />
                                                <ErrorMessage name="firstname" component="div" style={{ color: 'red' }} />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label htmlFor="name">Last Name</label>
                                                <Field type="text" className={`${styles['login-bdr']} form-control`} id="lastname" name="lastname" placeholder="Enter a Last Name" />
                                                <ErrorMessage name="lastname" component="div" style={{ color: 'red' }} />
                                            </div>
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
                                            <div className="form-group text-center">
                                                <Button type="submit" disabled={isSubmitting} variant='outline-dark'>
                                                    {isSubmitting ? 'Signing up...' : 'Sign up Now'}
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                {/* <div className="or py-3">
                                    <h3><span>or</span></h3>
                                </div> */}
                                <div className="row pt-3">
                                    <div className="col-lg-12 text-center">
                                        <p class="text-center"> Already have an account?  <Link href="/login" style={{ color: "#d7b56d", textDecoration: "none" }}><strong>Login</strong></Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default RegisterPage