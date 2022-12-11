import React, {useState} from "react";
import LoadingOverlay from "react-loading-overlay";
import {Circles} from "react-loader-spinner";
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import Link from "next/link";
import router from "next/router"
import { userSignup } from "store/services/user_auth_action";
import { useDispatch } from 'react-redux'


/*
* Form validation
*/
function validateEmail(value) {
    let error;
    if (!value) {
        error = 'This field is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

function validateTextField(value) {
    let error;
    !value ? error = 'This field is required' : ''
    return error;
}

function validateUserName(value) {
    let error;
    if (!value) {
        error = 'This field is required'
    } else if (!/^[-\w\.\$]{1,30}$/i.test(value)) {
        error = 'Spaces & special characters are not allowed except ( . - or _ )'
    }
    return error;
}

function validatePassword(value) {
    let error;
    if (!value) {
        error = 'This field is required'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/i.test(value)) {
        error = 'Password must have at least one (digit,upper case,lower case,special character) & min 8 in length'
    }
    return error;
}

const Schema = yup.object().shape({
    confirm_password: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password must be same")
    })
});

/* close Validation*/
function Index() {

    const dispatch = useDispatch()

    /* User states */
    const [isLoading, setLoading] = useState(false) // preloader states watcher
    const [passwordType, setPasswordType] = useState(true);
    const [conPasswordType, setConPasswordType] = useState(true);
    // Handle submit
    const createUser = async (data) => {
        setLoading(true)
        dispatch(userSignup(JSON.stringify(data), router, setLoading))
    };
    return (<>
        <LoadingOverlay
            active={isLoading}
            spinner={<Circles color="#00BFFF"/>}
        />
        {/*Bootstrap CSS*/}
        <line href="/assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css"
              rel="stylesheet"/>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/assets/css/login.css"/>
        <div className="d-lg-flex half">
            {/* Row column One */}
            <div className="contents order-1 order-md-1">
                <div className="container">
                    <div className="row align-items-center justify-content-center ">
                        <div className="col-md-8 col-sm-12 col-xs-12 col-sm-12  col-12 mobile-width">
                            <div className="mb-4 text-center">
                                <h3>SIGNUP</h3>
                            </div>
                            {/* Form handle method */}
                            <Formik
                                initialValues={{
                                    first_name: '',
                                    last_name: '',
                                    username: '',
                                    email: '',
                                    password: '',
                                    confirm_password: '',
                                }}
                                validationSchema={Schema}
                                onSubmit={(values) => {

                                    createUser(values)
                                }}>
                                {({errors, touched}) => (<Form>
                                    <div className="form-group last mb-3">
                                        <Field className="form-control"
                                               maxLength={30}
                                               validate={validateTextField}
                                               placeholder='First Name *'
                                               name="first_name"
                                        />
                                        {errors.first_name && touched.first_name && <small
                                            className="text-danger text-sm-right">{errors.first_name}</small>}
                                    </div>
                                    <div className="form-group last mb-3">
                                        <Field
                                            className="form-control"
                                            maxLength={30}
                                            validate={validateTextField}
                                            placeholder='Last Name *' name="last_name"/>
                                        {errors.last_name && touched.last_name && <small
                                            className="text-danger text-sm-right">{errors.last_name}</small>}
                                    </div>
                                    <div className="form-group last mb-3">
                                        <Field
                                            className="form-control"
                                            maxLength={30}
                                            validate={validateUserName}
                                            placeholder='User Name *' name="username"/>
                                        {errors.username && touched.username && <small
                                            className="text-danger text-sm-right">{errors.username}</small>}
                                    </div>
                                    <div className="form-group last mb-3">
                                        <Field
                                            className="form-control"
                                            maxLength={60}
                                            validate={validateEmail}
                                            placeholder='Email *'
                                            name="email"/>
                                        {errors.email && touched.email &&
                                            <small className="text-danger text-sm-right">{errors.email}</small>}
                                    </div>
                                    <div className="form-group last mb-3">
                                        <Field type={passwordType ? 'password' : 'text'}
                                               className="form-control *" validate={validatePassword}
                                               placeholder='Password *' name="password"/>

                                        {passwordType ? <a href="javascript:void(0)"
                                                           onClick={() => setPasswordType(!passwordType)}
                                                           className='icon-position'><i className="icon-eye-close"
                                                                                        aria-hidden="true"></i></a> :
                                            <a href="javascript:void(0)"
                                               onClick={() => setPasswordType(!passwordType)}
                                               className='icon-position'><i className="icon-eye-open"
                                                                            aria-hidden="true"></i></a>}
                                        {errors.password && touched.password && <small
                                            className="text-danger text-sm-right">{errors.password}</small>}
                                    </div>
                                    <div className="form-group last mb-3">
                                        <Field type={conPasswordType ? 'password' : 'text'}
                                               className="form-control *" validate={validatePassword}
                                               placeholder='Confirm Password'
                                               name="confirm_password"/>

                                        {conPasswordType ? <a href="javascript:void(0)"
                                                              onClick={() => setConPasswordType(!conPasswordType)}
                                                              className='icon-position'><i
                                            className="icon-eye-close"
                                            aria-hidden="true"></i></a> : <a href="javascript:void(0)"
                                                                             onClick={() => setConPasswordType(!conPasswordType)}
                                                                             className='icon-position'><i
                                            className="icon-eye-open"
                                            aria-hidden="true"></i></a>}
                                        {errors.confirm_password && touched.confirm_password && <small
                                            className="text-danger text-sm-right">{errors.confirm_password}</small>}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="submit"
                                                    className="btn btn-block btn-primary active-button"
                                            >Register
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <Link href="/login" className="btn btn-block border-border">Sign
                                                In </Link>
                                        </div>
                                    </div>
                                </Form>)}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            {/* Row column two */}
            <div className="bg order-2 order-md-2 mobile-hide h-100 d-inline-block loginright"
                 style={{backgroundImage: `url('/assets/images/bg_1.jpg')`}}>
                <div className="container">
                    <div className="bottom-wecome">
                        <img src="/assets/images/login-logo.png"/>
                        <div className="welcome white-text">Welcome to</div>
                        <div className="odyx-text white-text">Dagger</div>
                        <div className="white-text tabline-login">Login to Access Dashboard</div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Index;