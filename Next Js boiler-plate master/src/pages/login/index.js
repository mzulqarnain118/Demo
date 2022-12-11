
import React, { useEffect, useState } from 'react'
import router from "next/router"
import Cookies from 'js-cookie'
import routes from 'appConfig/routes'
import { AUTH, AXIOS_HEADER, MESSAGE } from 'appConfig'
import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik';
import { Circles } from 'react-loader-spinner';
import LoadingOverlay from "react-loading-overlay";
import Link from 'next/link'
import { userLogin } from 'store/services/user_auth_action'
import Helping from 'services/helpers/Helping'

// Mandatorio field message
const validateTextField = (value) => {
    let error;
    !value ? error = Helping.getMessageString(MESSAGE.FIELD_REQUIRED, 'User Name') : ''
    return error;
}

// Mandatorio field message
const validatePassword = (value) => {
    let error;
    if (!value) {
        error = Helping.getMessageString(MESSAGE.FIELD_REQUIRED, 'Password')
    }
    return error;
}

const Index = () => {

    const [isLoading, setLoading] = useState(false) // preloader states watcher
    const [passwordType, setPasswordType] = useState(true);
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (Cookies.get(AUTH.AUTH_TOKEN)) {
            router.push(routes.DASHBOARD)
        }
        else {
            setLoading(false)
        }
    }, [])

    const LoginUser = async (data) => {
        setLoading(true)

        //prepare payload
        let formData = new FormData();
        formData.append('username', data.username)
        formData.append('password', data.password)

        //API call
        dispatch(userLogin(formData, AXIOS_HEADER.FORM_DATA, router, setLoading))
    };

    return (
        <>
            {
            // !isLoading &&
                <>
                    <LoadingOverlay
                        active={isLoading}
                        spinner={<Circles color="#00BFFF" />}
                    />
                    {/*Bootstrap CSS*/}
                    <script href="/assets/js/main.js"></script>
                    <div className="login-mobile">
                        <div className="d-lg-flex half">
                            <div className="contents order-2 order-md-1">
                                <div className="container">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-md-10 col-sm-12 col-xs-12 col-sm-12  col-12 mobile-width">
                                            <div className="mb-4 text-center">
                                                <h3>LOGIN</h3>
                                            </div>
                                            <Formik
                                                initialValues={{
                                                    username: '',
                                                    password: ''
                                                }}
                                                onSubmit={(values) => {
                                                    LoginUser(values)
                                                }}>
                                                {({ errors, touched }) => (
                                                    <Form>
                                                        <div className="form-group last mb-3">
                                                            <Field className="form-control" validate={validateTextField}
                                                                placeholder='User Name' name="username" />

                                                            {errors.username && touched.username && <small
                                                                className="text-danger text-sm-right">{errors.username}</small>}
                                                        </div>
                                                        <div className="form-group last mb-3">
                                                            <Field type={passwordType ? 'password' : 'text'}
                                                                className="form-control" validate={validatePassword}
                                                                placeholder='Password' name="password" />

                                                            {
                                                                passwordType ?
                                                                    <a href="javascript:void(0)"
                                                                        onClick={() => setPasswordType(!passwordType)}
                                                                        className='icon-position'><i className="icon-eye-close"
                                                                            aria-hidden="true"></i></a>
                                                                    :
                                                                    <a href="javascript:void(0)"
                                                                        onClick={() => setPasswordType(!passwordType)}
                                                                        className='icon-position'><i className="icon-eye-open"
                                                                            aria-hidden="true"></i></a>
                                                            }
                                                            {errors.password && touched.password && <small
                                                                className="text-danger text-sm-right">{errors.password}</small>}
                                                        </div>
                                                        <div className="d-flex mb-5 align-items-center">
                                                            <label className="control control--checkbox mb-0"><span
                                                                className="caption">Remember me</span>
                                                                <input type="checkbox" />
                                                                <div className="control__indicator"></div>
                                                            </label>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <button type='submit'
                                                                    className="btn btn-block btn-primary active-button"> Log
                                                                    In
                                                                </button>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <Link href="/signup"
                                                                    className="btn btn-block   border-border"> Create Account
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="text-center m-b30 forgotten ">
                                                            Forgotten your login details?
                                                            <Link href="/forgot-password"><strong> Get Help Signing
                                                                in</strong></Link>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg order-1 order-md-2 mobile-hide h-100 d-inline-block loginright"
                                style={{ backgroundImage: `url('/assets/images/bg_1.jpg')` }}>
                                <div className="container  mobile-hide">
                                    <div className="bottom-wecome">
                                        <img src="/assets/images/login-logo.png" />
                                        <div className="welcome white-text">Welcome to</div>
                                        <div className="odyx-text white-text">Dagger</div>
                                        <div className="white-text tabline-login">Login to Access Dashboard</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}


export default Index
