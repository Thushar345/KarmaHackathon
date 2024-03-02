import React, { useContext, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

//import { useNavigate } from "react-router";
// import { AuthContext } from "../../contexts/AuthContext";
// import { toast } from "react-toastify";

const Login = () => {
  document.title = "Note Zone | Login";
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  //const navigate = useNavigate();

//   const { logIn, googleSignIn } = useContext(AuthContext);

//   const [userData, setUserData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmitLogIn = async (e) => {
//     e.preventDefault();
//     try {
//       await logIn(userData.email, userData.password);
//       toast.success("Login Successful!");
//       navigate("/notes");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleGoogleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await googleSignIn();
//       toast.success("Sign in Successful!");
//       navigate("/notes");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-logo">
         
          
        </div> 
        <h2>Login</h2>
        <form >
          <div className="login-form-div">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              id="email"
              placeholder="test@gmail.com"
              required
              type="email"
              
            />
          </div>

          <div className="login-form-div">
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <div className="password-wrapper">
              <input
                id="password"
                type={isPasswordHide ? "password" : "text"}
                placeholder={isPasswordHide ? "********" : "Enter password"}
                required
               
                
              />
              <span
                onClick={() =>
                  setIsPasswordHide((isPasswordHide) => !isPasswordHide)
                }
              >
                {isPasswordHide ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <button className="google-login-button" >
          <div>
            <i className="fa-brands fa-google"></i>
          </div>{" "}
          Sign in with Google
        </button>
        <Link to="/Signup"><p className="create-new-account-link">
          Create New account <i className="fa-solid fa-angle-right"></i>
        </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
