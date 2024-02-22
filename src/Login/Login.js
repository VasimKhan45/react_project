import React, { useState } from "react";
import "../Login/Login.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PassThrouthLoading } from "react-loadingg";
import { fetchDocuemnt, lgoin } from "../utils/Utils";
import { Base64 } from "js-base64";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [home, setHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const emailValidation = (e) => {
    const newEmail = e.target.value;
    setIsValidEmail(validateEmail(newEmail));
    setEmail(newEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      toast.error("Invalid email. Please enter a valid email address.");
    } else {
      setLoading(true);
        if (password.length < 4) {
          setIsValid(true);
          toast.error("Password must be at least 4 characters");
        } else {
          if (email) {
            localStorage.setItem("email",(Base64.encode(email)));
            if (password) {
              const response = await lgoin(
                email,
                password
              )
              if(response?.data?.message ==="Login successful"){
                setHome(true);
                setLoading(false);
                if (
                  sessionStorage.getItem("LoginPage") ||
                  sessionStorage.getItem("HomePage")
                ) {
                  sessionStorage.removeItem("HomePage");
                  sessionStorage.removeItem("LoginPage");
                }
                sessionStorage.setItem("LoginPage", true);
                sessionStorage.setItem("HomePage", true);
                props.setLogin(true);
                navigate("/home");
                const documentResponse = await fetchDocuemnt(email)
                if(documentResponse?.data !== null ){
                  console.log("documentResponse",documentResponse.data)
                }
              } if(response?.data?.message ==="Invalid Username or Password"){
                setLoading(false);
                toast.error("Invalid Username or Password");
              }else{
                setLoading(false);
                toast.error("Server is unavaliable");
              }
            } else {
              toast.error("Please re-verify your password");
            }
          } else {
            toast.error(`${email} this email is not registered`);
          }
        }
    }
  };
  const passwordValidation = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    <input
                      onChange={emailValidation}
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                    <input
                      onChange={passwordValidation}
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="text-center mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                    <p class="small fw-bold mt-4 pt-1 mb-0">
                      Don't have an account?{" "}
                      <a class="link-danger" onClick={()=> {setRegisterForm(true)
                    sessionStorage.setItem("RegisterPage",true)}}>
                        Register
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Toaster position="top-right" />
      {loading && (
        <div className="loader-overlay">
          <PassThrouthLoading color="blue" height={667} width={375} />
        </div>
      )}
      {registerForm && (
        navigate("/register")
      )}
    </>
  );
};
export default Login;
