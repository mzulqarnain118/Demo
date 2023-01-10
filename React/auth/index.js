import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { MakeApiCall } from "../api/MakeApiCall";
import useAuth from "../hooks/useAuth";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../states/UserStates';
function LoginComponent() {
  const dispatch = useDispatch()
  const { setAuth } = useAuth();
  let token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [bool, setBool] = useState(false);
  const [boolType, setBoolType] = useState("password");

  useEffect(() => {

    setErrMsg('');
  }, [username, password]);
  const formStyle = {
    backgroundSize: "cover",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  }

  const Loader = () => {
    return (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }

  //  get Exisiting models
  const getExisiting = async (accessToken) => {
    let user_id = localStorage.getItem("user_id");
    let url = `/file/names/${user_id}`;
    const response = await MakeApiCall(url, null, accessToken, 'GET');
    console.log("get Exisiting models", response.data)

    if (response.status === 200) {
      let file_id = response.data.reverse()[0].id
      localStorage.setItem('file_id', file_id)

    }
    console.log(response.status, 'response 12')

  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await MakeApiCall('/login/', formData, '', "POST")
      if (response.status == 200) {
        toast.success("Login successfully", {
          position: 'top-center'
        });

        setLoading(false);
        const accessToken = response.data['access_token'];
        var decoded = jwt_decode(accessToken);
        localStorage.setItem('token', accessToken)
        localStorage.setItem('username', decoded.sub)
        localStorage.setItem('user_id', decoded.id)
        const roles = '5150';
        setAuth({ username, password, roles, accessToken });
        setUser('');
        setPwd('')
        getExisiting(accessToken)
        dispatch(getUserDetails())
        navigate(from, { replace: true });
        console.log(decoded, 'decoded')
      } else {
        setLoading(false);
        toast.error("Username or password is incorrect", {
          position: 'top-center'
        });
      }
    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      // errRef.current.focus();
    }
  }
  return (

    <div className="container-fluid">
      <div className="col-12 col-lg-12">
        <div className="row">
          <div className="mobile-hide col-12 col-lg-6 login-bg">
            <div style={{ height: '100vh' }}></div>
          </div>
          <div className="col-12 col-lg-6 py-sm-64 py-lg-0">
            <div className="row align-items-center justify-content-center h-100 ">
              <div className="col-12 col-md-9 col-xl-7 col-xxxl-5 px-8 px-sm-0 pt-24 pb-48">
                <div className="container"> <img src="assets/images/icon.png" className="leaf-bg" />
                  <h3 className="mb-0 mb-sm-24">Login Agrilytics</h3>
                  <p className="mt-sm-8 mt-sm-0 text-black-60">Please login to your account!</p>
                  <form className="mt-16 mt-sm-32 mb-8" onSubmit={handleSubmit}>
                    <div className=" " style={{ height: "60px" }}>
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control "
                        id="loginUsername"
                        value={username}
                        onChange={(e) => setUser(e.target.value)}
                        required /> </div>
                    {/* <div className="mb-16 " style={{display:"flex",justifyContent:"space-between" , alignItems:"center",border:"2px solid red",backgroundColor:"white",border}}>
                        <input type="password"
                         placeholder="Password"
                          className="form-control"
                           id="loginPassword"
                           value={password}
                           onChange={(e)=>setPwd(e.target.value)}
                            required  /> <i class="iconly-Light-Show spicon"></i></div> */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
                      <input
                        className='form-control'
                        type={boolType}
                        value={password}
                        onChange={(e) => setPwd(e.target.value)}
                        placeholder="Password"
                        required={true}
                        id="password"
                      />
                      <i onClick={() => {
                        boolType === "password" ? setBoolType("text") : setBoolType("password")
                        setBool(!bool)
                      }} class={bool ? "fa iconly-Bold-Show" : "fa iconly-Bold-Hide"} id="eye" style={{ position: "absolute", right: "5%", top: '20%', cursor: "pointer" }}></i>
                    </div>


                    <div className="row align-items-center justify-content-between mb-16">
                      <div className="col hp-flex-none w-auto">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck-login" name="exampleCheck-login" />
                          <label className="form-check-label ps-4" htmlFor="exampleCheck-login">Remember me</label>
                        </div>
                      </div>
                      <div className="col hp-flex-none w-auto"> <Link className="hp-button text-black-80 hp-text-color-dark-40" to="/forget-password">Forgot Password?</Link> </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100"> {loading ? <Loader /> : 'Sign in'} </button>
                  </form>
                  <div className="col-12 hp-form-info"> <span className="text-black-80 hp-text-color-dark-40 hp-caption me-4">Don’t you have an account?</span> <Link className="text-primary-1 hp-text-color-dark-primary-2 hp-caption" to='/register'>Create an account</Link> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent;