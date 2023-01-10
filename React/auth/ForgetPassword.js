import React from 'react';
import { Link } from 'react-router-dom';
import { MakeApiCall } from '../api/MakeApiCall';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
     localStorage.getItem('user')
     let token = localStorage.getItem('token');
     const [email,setEmail]=React.useState("")
     const [resetFlag,setResetFlag]=React.useState(false)
    const forGetPassword = async (event)=>{
    
      event.preventDefault();
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if(email===""){
        toast.error("Please Enter Your Registered Email", {
          position: 'top-center'
      });
      }

      else if (!filter.test(email)) {
        toast.error("Please provide a valid email address", {
          position: 'top-center'
      });
    
 }
       else{
           console.log("Please")
      try{const response=await MakeApiCall("/user/request/reset_password/",{email:email},token,"POST")
       if(response.status===200){
        setResetFlag(true)
       }}
       catch(error){
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
                      <h5 className="card-title text-center pb-0 fs-4">Forgot Password?</h5>
                      {!resetFlag && <p className="text-center small">Enter your email address to reset your password</p>}
                    </div>
                    <form onSubmit={forGetPassword} className="row g-3 needs-validation" noValidate>
                    {resetFlag?  
                      
                        <p className='text-center'>Reset password link has been sent to your <br/>registered email</p>
                        :<><div className="col-12"><div className="input-group has-validation">
                          <input type="email" name="email" className="form-control" id="yourUsername"  placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                          <div className="invalid-feedback">Please enter your Email Address.</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit" disabled={resetFlag}>Reset Password</button>
                      </div></>}
                      {/* <div className="col-12 text-center">
                        <p className="small"  style={{marginTop:"20px"}}>
                          Please login to your account!
                          <Link to="/login" style={{color:'#7bb53c'}}>
                              {"       Sign In"}
                          </Link></p>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default ForgetPassword;
