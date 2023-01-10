import React, { useState } from 'react';
import { MakeApiCall } from '../api/MakeApiCall';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { checkPassword } from '../../src/helpers/helpers';
import { Link } from 'react-router-dom';

const Register = () => {
    let initialState = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        company_name: '',
        address: 'Lahore Pakistan',
        city: 'Los Angles',
        country: 'Usa',
        postal_code: '52250',
        username: '',
        contact: '(02) 123-4567',
        company_name: "1Company Name",
        "role_ids": [
            1
        ],
        "license_details": [
            {
                "license_id": 1,
                "license_issue_date": "2022-09-28T05:55:09.030Z",
                "license_expiry_date": "2030-09-28T05:55:09.030Z"
            }
        ]

    };

    const navigate = useNavigate();
    const [registerdata, setRegisterData] = useState(initialState);
    const [passError, setPassError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bool, setBool] = useState(false);
    const [boolType, setBoolType] = useState("password");
    const [bool1Type, setBool1Type] = useState("password");

    const [bool1, setBool1] = useState(false);

    const passWordConf = () => {
        if (registerdata.password === registerdata.confirm_password) {
            return true;
        } else {
            return false;
        }
    }



    const Loader = () => {
        return (
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    const registerUser = async (e) => {
        e.preventDefault();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let regex = /[A-Za-z]$/i
        if (!regex.exec(registerdata.first_name)) {
            toast.error("Only alphabets are allowed in first name", {
                position: 'top-center'
            });
        }
        else if (!regex.exec(registerdata.last_name)) {
            toast.error("Only alphabets are allowed in last name", {
                position: 'top-center'
            });
        }
        else if (!filter.test(registerdata.email)) {
            toast.error("Please provide a valid email address", {
              position: 'top-center'
          });
        
     }
        else if (passError) {
            toast.error("Password must have at least one (digit, upper case, lower case, special character) & min 8 in length", {
                position: 'top-center'
            });
        }

        else if (!checkPassword(registerdata.password)) {
            setPassError(true);
        } else if (!passWordConf()) {
            toast.error(" Password and Confirm Password does not match", {
                position: 'top-center'
            });
        }
        else if (registerdata.first_name.length > 30) {
            toast.error("First name can not be greater than 30 characters", {
                position: 'top-center'
            });
        }
        else if (registerdata.last_name.length > 30) {
            toast.error("Last name can not be greater than 30 characters", {
                position: 'top-center'
            });
        }
        else if (registerdata.username.length > 30) {
            toast.error("User name can not be greater than 30 characters", {
                position: 'top-center'
            });
        }
        else {

            try {

                setLoading(true);
                const response = await MakeApiCall('/user/create/', registerdata, '', "POST");
                if (response.status === 201) {
                    setLoading(false);
                    toast.success("User Registration Successful! Please Login.", {
                        position: 'top-center'
                    });
                    navigate('/login');
                } else {
                    setLoading(false);

                }
            }
            catch (e) {
                setLoading(false);
            }

        }

    }


    return (
        <div className="container-fluid">
            <div className="col-12 col-lg-12">

                {
                    <div className="row">

                        <div className="mobile-hide col-12 col-lg-6 login-bg">
                            <div style={{ height: '100vh' }}></div>
                        </div>
                        <div className="col-12 col-lg-6 py-sm-64 py-lg-0">
                            <div className="row align-items-center justify-content-center h-100 ">
                                <div className="col-12 col-md-9 col-xl-7 col-xxxl-5 px-8 px-sm-0 pt-24 pb-48">
                                    <div className="container"> <img src="assets/images/icon.png" className="leaf-bg" />
                                        <h3 className="mb-0 mb-sm-24">Signup Agrilytics</h3>
                                        <form className="mt-16 mt-sm-32 mb-8" onSubmit={registerUser}>
                                            <div className="mb-16">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={registerdata.first_name}
                                                    className="form-control"
                                                    id="loginUsername"
                                                    onChange={(e) => setRegisterData({ ...registerdata, first_name: e.target.value })}
                                                    required />
                                            </div>
                                            <div className="mb-16">
                                                <input type="text"
                                                    placeholder="Last Name"
                                                    value={registerdata.last_name}
                                                    className="form-control"
                                                    id="loginUsername"
                                                    onChange={(e) => setRegisterData({ ...registerdata, last_name: e.target.value })}
                                                    required />
                                            </div>
                                            <div className="mb-16">
                                                <input type="text"
                                                    placeholder="User Name"
                                                    value={registerdata.username}
                                                    className="form-control"
                                                    id="loginUsername"
                                                    onChange={(e) => setRegisterData({ ...registerdata, username: e.target.value })}
                                                    required />
                                            </div>
                                            <div className="mb-16">
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    value={registerdata.email}
                                                    className="form-control"
                                                    onChange={(e) => setRegisterData({ ...registerdata, email: e.target.value })}
                                                    id="loginUsername"
                                                    required />
                                            </div>

                                            <div className="mb-16" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                                                <input type={boolType}
                                                    placeholder="Password"
                                                    value={registerdata.password}
                                                    className="form-control"
                                                    id="loginPassword"
                                                    onChange={(e) => setRegisterData({ ...registerdata, password: e.target.value })}
                                                    onFocus={() => setPassError('')}
                                                    required />

                                                <i onClick={() => {
                                                    boolType === "password" ? setBoolType("text") : setBoolType("password")
                                                    setBool(!bool)
                                                }} class={bool ? "fa iconly-Bold-Show" : "fa iconly-Bold-Hide"} id="eye" style={{ position: "absolute", right: "5%", top: '20%', cursor: "pointer" }}></i>

                                            </div>
                                            {/* {passError && <small style={{marginBottom:"20px"}} id="passwordHelpBlock" class="form-text text-danger ">Password must have at least one (digit, upper case, lower case, special character) & min 8 in length</small>} */}
                                            <div className="mb-16" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                                                <input
                                                    type={bool1Type}
                                                    placeholder="Confirm Password"
                                                    value={registerdata.confirm_password}
                                                    className="form-control" id="loginPassword1"
                                                    onChange={(e) => setRegisterData({ ...registerdata, confirm_password: e.target.value })}
                                                    required />
                                                <i onClick={() => {
                                                    bool1Type === "password" ? setBool1Type("text") : setBool1Type("password")
                                                    setBool1(!bool1)
                                                }} class={bool1 ? "fa iconly-Bold-Show" : "fa iconly-Bold-Hide"} id="eye1" style={{ position: "absolute", right: "5%", top: '20%', cursor: "pointer" }}></i>

                                            </div>
                                            <button type="submit" className="btn btn-primary w-100"> {loading ? <Loader /> : 'Signup'} </button>
                                        </form>
                                        <div className="col-12 text-center">
                                            <p className="small" style={{ marginTop: "20px" }}>
                                                Please login to your account!
                                                <Link to="/login" style={{ color: '#7bb53c' }}>
                                                    {"       Sign In"}
                                                </Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    );
}

export default Register;
