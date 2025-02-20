import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { clearAllError, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";

import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";



function Register() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  //resume handler
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //handle register

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);

    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllError());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message]);

  /*********************xml codes ********************** */

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a New Account..</h3>
        </div>
        <form action="" onSubmit={handleRegister}>
          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="">Register As</label>
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
              <label htmlFor="">Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="">Email</label>
              <div>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="inputTag">
              <label htmlFor="">Phone no</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter your number "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="inputTag">
              <label htmlFor="">Address</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaAddressBook />
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
                <RiLock2Fill />
              </div>
            </div>
          </div>

          {role === "Job Seeker" && (
            <>
              <div className="wrapper">
                <div className="inputTag">
                  <label htmlFor="">Your First Niche</label>
                  <div>
                    <select
                      value={firstNiche}
                      onChange={(e) => setFirstNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option value={niche} key={index}>
                          {niche}m
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>

                <div className="inputTag">
                  <label htmlFor="">Your Second Niche</label>
                  <div>
                    <select
                      value={secondNiche}
                      onChange={(e) => setSecondNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option value={niche} key={index}>
                          {niche}m
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>

                <div className="inputTag">
                  <label htmlFor="">Your Third Niche</label>
                  <div>
                    <select
                      value={thirdNiche}
                      onChange={(e) => setThirdNiche(e.target.value)}
                    >
                      <option value="">Your Niche</option>
                      {nichesArray.map((niche, index) => (
                        <option value={niche} key={index}>
                          {niche}m
                        </option>
                      ))}
                    </select>
                    <MdCategory />
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label htmlFor="">CoverLetter</label>
                  <div>
                    <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} rows={10}></textarea>
                  </div>
                </div>
              </div>

			  <div className="wrapper">
                <div className="inputTag">
                  <label htmlFor="">Resume</label>
                  <div>
                   <input type="File"
				   			onChange={resumeHandler} style={{
								border:"none"
							}} />
                  </div>
                </div>
              </div>
            </>
          )}
		  <button onClick={register} disabled={loading}>Register</button>
		  <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
