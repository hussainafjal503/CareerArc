import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllError, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading,isAuthenticated,error,message} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  //handling login

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);

    dispatch(login(formData));
    toast.success(message)
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllError);
    }

    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch,error,message,loading,isAuthenticated]);

  /**************************xml codes ********************** */
  return (
    <>
      <section className="authPage">
        <div className="container login-container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form action="" onSubmit={handleLogin}>

          <div className="inputTag">
            <label htmlFor="">Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          <div className="inputTag">
            <label htmlFor="">email</label>
            <div>
              <input
                type="email"
                placeholder="example@gmail.com "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className="inputTag">
            <label htmlFor="">Password</label>
            <div>
              <input
                type="password"
                placeholder="Enter your password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill/>
            </div>
          </div>
		  <button type="submit" disabled={loading} >Login</button>
		  <Link to={"/register"}>Register Now</Link>
		  </form>
        </div>
      </section>
    </>
  );
}

export default Login;
