import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  postApplication,
  clearAllApplicationError,
  resetApplication,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";

import { Link } from "react-router-dom";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function PostApplication() {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.application);

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  //handling post application

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);

    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(clearAllApplicationError());
    if (message) {
      toast.success(message);
      dispatch(resetApplication());
    }

    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId,user]);

  let qualifications = [];
  let responsibilites = [];
  let offering = [];

  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(".");
  }

  if (singleJob.responsibilites) {
    responsibilites = singleJob.responsibilites.split(".");
  }

  if (singleJob.offers) {
    offering = singleJob.offers.split(".");
  }

  //resume handling

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  /*************************xml codes ******************* */
  return (
    <>
      <article className="application_page">
        {user && (
          <form>
            <h3>Application Form</h3>
            <div>
              <label>Job Title</label>
              <input type="text" placeholder={singleJob.title} disabled />
            </div>
            <div>
              <label htmlFor="">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Phone no.</label>
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="">Resume.</label>
              <input type="file" onChange={resumeHandler} />
            </div>

            {isAuthenticated && user.role === "Job Seeker" && (
              <div
                style={{
                  alignItems: "flex-end",
                }}
              >
                <button
                  type="submit"
                  className="btn "
                  onClick={handlePostApplication}
                  disabled={loading}
                >
                  Apply
                </button>
              </div>
            )}
          </form>
        )}

        <div className="job-details">
          <header>
            <h3>{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link to={singleJob.personalWebsite.url}>
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p>{singleJob.location}</p>
            <p>Rs. {singleJob.salary} /Annum</p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Job Details</h3>
              <div>
                <IoMdCash />
                <div className="">
                  <span>Pay</span>
                  <span>{singleJob.salary}/ Annum</span>
                </div>
              </div>

              <div>
                <FaToolbox />
                <div className="">
                  <span>JobType</span>
                  <span>{singleJob.jobType}/ Annum</span>
                </div>
              </div>
            </div>
            <hr />

            <div className="wrapper">
              <h3>Location</h3>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJob.location}</span>
              </div>
            </div>
            <hr />

            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {qualifications.map((item, index) => (
                      <li key={index} style={{ listStyle: "inside" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.responsibilites && (
                <div>
                  <h4>Responsibilites</h4>
                  <ul>
                    {responsibilites.map((item, index) => (
                      <li key={index} style={{ listStyle: "inside" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.offers && (
                <div>
                  <h4>Offering</h4>
                  <ul>
                    {offering.map((item, index) => (
                      <li key={index} style={{ listStyle: "inside" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Niche</h3>
            <p>{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
}

export default PostApplication;
