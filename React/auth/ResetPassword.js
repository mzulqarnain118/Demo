import React from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom';
import { MakeApiCall } from '../api/MakeApiCall';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Field } from "formik";
import {checkPassword} from '../../src/helpers/helpers';

function ResetPassword() {
  let { token } = useParams();
  const navigate = useNavigate();

  let initialState = {
    password: '',
    confirm_password: '',
};
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
  // const initialValues = { value1: "", value2: "" };
  // const [formValues, setformValues] = useState(initialValues);
  // const getFormData = values => {
  //   console.log("getFormData::", values);
  // };
  // console.log("formValues::", formValues);
  // localStorage.getItem('user')
     let token1 = localStorage.getItem('token');

     const resetPassword = async (event)=>{
    
       event.preventDefault();
       console.log(111111)
      
       if (passError) {
        console.log(2222)

        toast.error("Password must have at least one (digit, upper case, lower case, special character) & min 8 in length", {
            position: 'top-center'
        });
    }  
       else if (!checkPassword(registerdata.password)) {
        setPassError(true);
      }
     
      else if (!passWordConf()) {
        toast.error(" Password and Confirm Password does not match", {
            position: 'top-center'
        });
    }
       else{
         const payload = {
           "password": registerdata.password,
           "token":token
         }
         console.log("Please",payload)

         try {
           const response = await MakeApiCall("/user/reset_password/", payload, token1, "POST")
       if(response.status===200){
        setLoading(false);
        toast.success("Password updated successfully.", {
            position: 'top-center'
        });
             navigate('/login');
           }
       else {
         setLoading(false);
        // toast.success("Password updated successfully.", {
        //     position: 'top-center'
        // });
         }
         }
         catch (error) {
          setLoading(false);
         
        console.log(error);
       }
       }
      

       }
  return (
    
    
     
    <div className="container">
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center py-4">
              <a href="index.html" className="logo d-flex align-items-center w-auto">
                 <img src="assets/images/icon.png" className="leaf-bg" alt="" />
             </a>
            </div>
            {/* End Logo */}
            <div className="card mb-3">
              
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Reset Password?</h5>
                </div>
                <form onSubmit={resetPassword} className="row g-3 needs-validation" Validate>
               
                <div className="mb-16" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                                                <input type={boolType}
                                                    placeholder="Password"
                                                    value={registerdata.password}
                                                    className="form-control"
                                                    id="loginPassword"
                                                    onChange={(e) => setRegisterData({ ...registerdata, password: e.target.value })}
                                                    onFocus={() => setPassError('')}
                                                    required />
                                                {/* {passError && <small id="passwordHelpBlock" class="form-text text-danger">Password must have at least one (digit, upper case, lower case, special character) & min 8 in length</small>} */}
                                                <i onClick={() => {
                                                    boolType === "password" ? setBoolType("text") : setBoolType("password")
                                                    setBool(!bool)
                                                }} class={bool ? "fa iconly-Bold-Show" : "fa iconly-Bold-Hide"} id="eye" style={{ position: "absolute", right: "5%", top: '20%', cursor: "pointer" }}></i>

                                            </div>
                                            <div className="mb-16" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                                                <input
                                                    type={bool1Type}
                                                    placeholder="Confirm Password"
                                                    value={registerdata.confirm_password}
                                                    className="form-control" id="loginPassword1"
                                                    onChange={(e) => setRegisterData({ ...registerdata, confirm_password: e.target.value })}
                                                    required={true} />
                                                <i onClick={() => {
                                                    bool1Type === "password" ? setBool1Type("text") : setBool1Type("password")
                                                    setBool1(!bool1)
                                                }} class={bool1 ? "fa iconly-Bold-Show" : "fa iconly-Bold-Hide"} id="eye1" style={{ position: "absolute", right: "5%", top: '20%', cursor: "pointer" }}></i>

                                            </div>
                                            <button type="submit" className="btn btn-primary w-100"> {loading ? <Loader /> : 'Reset Password'} </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
    
  )
}

export default ResetPassword



// <Formik
// initialValues={initialValues}
// onSubmit={(values, { setSubmitting }) => {}}
// >
// {({
//   values,
//   errors,
//   touched,
//   handleChange,
//   handleBlur,
//   handleSubmit,
//   isSubmitting,
//   setFieldValue,
//   resetForm
//   /* and other goodies */
// }) => {
//   setformValues(values);
//   getFormData(values);
//   return (
//     <form onSubmit={handleSubmit}>
//       <Field type="text" name="value1" required/>
     
//       <br />
//       <Field type="text" name="value2" required/>
//       <button type="reset" onClick={() => {
//         setFieldValue("value1", "")
//         setFieldValue("value2", "")}}>
//         Reset This
//       </button>
//       <br />
//       <button type="reset" onClick={resetForm}>
//         Reset All
//       </button>
//       <br />
//       <button type="submit" disabled={isSubmitting}>
//         Submit
//       </button>
//     </form>
//   );
// }}
// </Formik>