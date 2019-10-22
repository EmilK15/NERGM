import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { REGISTER_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as yup from 'yup';

const Register = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [registerUser] = useMutation(REGISTER_USER)
    return (
        <div>
            <Button className="register-btn" onClick={handleShow}>Register</Button>
            <Modal show={show} onHide={handleClose} className="register-modal">
                <Modal.Header className="register-header">
                    <Modal.Title className="register-modal-title">Register</Modal.Title>
                </Modal.Header>
                <Formik 
                    initialValues={{
                        email: '',
                        fName: '',
                        lName: '',
                        password: '',
                        role: 'USER'
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        setSubmitting(false);
                        const newUser = await registerUser({
                            variables: {
                                user: values
                            }
                        });
                        if(newUser) {
                            resetForm();
                            handleClose();
                        }
                    }}
                    validationSchema={yup.object().shape({
                        email: yup.string()
                        .email()
                        .required('Required'),
                        fName: yup.string()
                        .matches(/^[a-zA-Z]*$/, "first name should only be letters")
                        .min(2, "First Name should minimum be 2 characters long")
                        .required('Required'),
                        lName: yup.string()
                        .matches(/^[a-zA-Z]*$/, "Last name should only be letters")
                        .min(2, "Last Name should minimum be 2 characters long")
                        .required('Required'),
                        password: yup.string()
                        .min(8, "New Password too short - should be 8 characters minimum")
                        .max(20, "New Password too long- should be 20 characters maximum")
                        .matches(/(?=.*?[0-9])(?=.*?[A-Za-z]).+/, "New Password must contain at least number and letter.")
                        .required('Required')
                    })}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        }) => (
                            <Modal.Body>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="input-email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email"
                                            type="text" isValid={touched.email && !errors.email} name="email" isInvalid={touched.email && errors.email}/>
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="input-fName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control value={values.fName} onChange={handleChange} onBlur={handleBlur} placeholder="First Name"
                                            type="text" isValid={touched.fName && !errors.fName} name="fName" isInvalid={touched.fName && errors.fName}/>
                                        <Form.Control.Feedback type="invalid">{errors.fName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="input-lName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control value={values.lName} onChange={handleChange} onBlur={handleBlur} placeholder="Last Name"
                                            type="text" isValid={touched.lName && !errors.lName} name="lName" isInvalid={touched.lName && errors.lName}/>
                                        <Form.Control.Feedback type="invalid">{errors.lName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="input-pw">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control value={values.password} onChange={handleChange} onBlur={handleBlur} name="password"
                                            type="password" placeholder="Password" isInvalid={touched.password && errors.password}
                                            isValid={touched.password && !errors.password}/>
                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit" className="login-btn btn-details" disabled={isSubmitting}>Register User</Button>
                                </Form>
                            </Modal.Body>
                        )}
                    </Formik>
            </Modal>
        </div>
    )
};

export default Register;