import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from '../../graphql/mutations';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { user_update_success, user_update_fail } from '../../../redux/actions/userActions';
import { Success, Errormsg } from '../responses';

const Account = () => {
    const [updateUser] = useMutation(UPDATE_USER);
    const dispatch = useDispatch();
    const { userUpdateSuccess, userUpdateFail } = useSelector(state => state.user);
    return (
        <div>
            {
                userUpdateSuccess ?
                    <Success message="Successfully updated your account information!"/>
                :   null
            }
            {
                userUpdateFail ?
                    <Errormsg message="Unable to update account information."/>
                :   null
            }
            <Formik
                initialValues={{
                    fName: "",
                    lName: "",
                    newPassword: "",
                    confirmPassword: ""
                }}
                onSubmit= { async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    if(values.fName || values.lName || (values.newPassword && values.confirmPassword)) {
                        const update = await updateUser({
                            variables: {
                                user: values
                            }
                        });
                        if(update) {
                            dispatch(user_update_success(true));
                            resetForm();
                            setSubmitting(false);
                        }
                    } else {
                        dispatch(user_update_fail(true));
                        setSubmitting(false);
                    }
                }}
                validationSchema={yup.object().shape({
                    fName: yup.string()
                    .matches(/^[a-zA-Z\s]*$/, "first name should only be letters and spaces.")
                    .min(3, "first name should be minimum 4 characters long")
                    .max(22, "first name should be less than 22 characters"),
                    lName: yup.string()
                    .matches(/^[a-zA-Z\s]*$/, "last name should only be letters and spaces.")
                    .min(3, "last name should be minimum 4 characters long")
                    .max(22, "last name should be less than 22 characters"),
                    newPassword: yup.string()
                    .min(8, "New Password too short - should be 8 characters minimum")
                    .max(20, "New Password too long- should be 20 characters maximum")
                    .matches(/(?=.*?[0-9])(?=.*?[A-Za-z]).+/, "New Password must contain at least number and letter."),
                    confirmPassword: yup.string()
                    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
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
                        <Form noValidate onSubmit={handleSubmit}>
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
                                <Form.Control value={values.newPassword} onChange={handleChange} onBlur={handleBlur} name="newPassword"
                                    type="password" placeholder="Password" isInvalid={touched.newPassword && errors.newPassword}
                                    isValid={touched.newPassword && !errors.newPassword}/>
                                <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="input-confirm-pw">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} name="confirmPassword"
                                    type="password" placeholder="Confirm Password" isInvalid={touched.confirmPassword && errors.confirmPassword}
                                    isValid={touched.confirmPassword && !errors.confirmPassword}/>
                                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" className="login-btn btn-details" disabled={isSubmitting}>Edit Account</Button>
                        </Form>
                    )}
            </Formik>            
        </div>
    )
};

export default Account;