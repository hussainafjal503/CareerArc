import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationError,
  resetApplication,
  deleteApplication,
  jobSeekerApplication,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

function MyApplications() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, application, message } = useSelector(
    (state) => state.application
  );

  const dispatch = useDispatch();


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetApplication());
      dispatch(jobSeekerApplication());
    }
  }, [dispatch, error, message]);

  const deleteAppliationHandler = (id) => {
    dispatch(deleteApplication(id));
  };


  useEffect(()=>{
dispatch(jobSeekerApplication());
  },[])
  /****************xml codes *************** */
  return (
    <>
      {loading ? (
        <Spinner />
      ) : application && application.length <= 0 ? (
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: "600",
          }}
        >
          You have not applied for Any Job
        </h1>
      ) : (
        <>
          <div className="account_components">
            <h3>My Applications for Job</h3>
            <div className="application_controller">
              {application.map((element) => (
                <div className="card" key={element._id}>
                  <p className="sub-sec">
                    <span>Job Title : </span> {element.jobInfo.jobtitle}
                  </p>

                  <p className="sub-sec">
                    <span>Name : </span>
                    {element.jobSeekerInfo.name}
                  </p>

                  <p className="sub-sec">
                    <span>Email : </span>
                    {element.jobSeekerInfo.email}
                  </p>

                  <p className="sub-sec">
                    <span>phone : </span>
                    {element.jobSeekerInfo.phone}
                  </p>

                  <p className="sub-sec">
                    <span>Address : </span>
                    {element.jobSeekerInfo.address}
                  </p>

                  <p className="sub-sec">
                    <span>coverLetter : </span>
                    <textarea
                      value={element.jobSeekerInfo.coverLetter}
                      disabled
                      row={4}
                    >
              
                    </textarea>
                  </p>
                  <div className="btn-wrapper">
                    <button className="outline_btn" onClick={()=>deleteAppliationHandler(element._id)}>DeleteApplication</button>
                    <Link to={element.jobSeekerInfo.resume.url} className="btn" target="_blank">View Resume</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyApplications;
