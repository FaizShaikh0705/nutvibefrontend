import { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    Card,
    Modal,
} from "react-bootstrap";
import Link from "next/link";
import styles from "./editProfile.module.scss";
import { userRequest } from "../../requestMethods";
import { profileUpdateStart } from "../../redux/userRedux";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const index = () => {
    const [newUsername, setnewUsername] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    // const router = useRouter();

    const handleFormSubmit = async (values, actions) => {
        try {
            const response = await userRequest.put(`/users/${currentUser._id}/profile`, {
                newUsername: values.newUsername,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            dispatch(profileUpdateStart(values));
            actions.setSubmitting(false);
            actions.resetForm();
            alert('Profile updated successfully');
        } catch (error) {
            actions.setSubmitting(false);
            const errorMessage = error.response?.data?.message || error.message;
            alert('Error updating profile: ' + errorMessage);
        }
    };



    return (
        <>
            <section className={`${styles["breadcrum"]}`}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center">
                                <h2>Edit Profile</h2>
                                <p>
                                    <span>
                                        <Link href="/#">Home</Link>
                                    </span>{" "}
                                    <span>/</span>
                                    <span>Edit Profile</span>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className={`${styles["profile-content"]} my-5`}>
                <Container>
                    <Row>
                        <Col md={6} className="mx-auto">
                            <h2 className="text-center mb-4">Edit Profile</h2>
                            <Formik
                                initialValues={{ newUsername: '', currentPassword: '', newPassword: '' }}
                                validationSchema={Yup.object().shape({
                                    newUsername: Yup.string().nullable(),
                                    currentPassword: Yup.string().required('Current password is required'),
                                    newPassword: Yup.string().nullable().min(6, 'Password must be at least 6 characters'),
                                })}
                                onSubmit={handleFormSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="newUsername">New Username</label>
                                            <Field type="text" className="form-control" id="newUsername" name="newUsername" />
                                            <ErrorMessage name="newUsername" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="currentPassword">Current Password</label>
                                            <Field type="password" className="form-control" id="currentPassword" name="currentPassword" />
                                            <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="newPassword">New Password</label>
                                            <Field type="password" className="form-control" id="newPassword" name="newPassword" />
                                            <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                        </div>
                                        <Button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                                            {isSubmitting ? 'Updating...' : 'Update Profile'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default index