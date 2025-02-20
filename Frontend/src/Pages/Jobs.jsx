import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Jobs() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchkeyword, setSearchkeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  //function for handling city when changing
  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchkeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchkeyword));
  };

  const cities = [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
    "Chandigarh",
  ];
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

  /**************** xml codes ******************* */
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchkeyword}
              onChange={(e) => {
                setSearchkeyword(e.target.value);
              }}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>

          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job by City</h2>
                {cities.map((city, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
					<label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>

			  <div className="cities">
                <h2>Filter Job by Niches</h2>
                {nichesArray.map((niche, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
					<label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>


            </div>
			<div className="container">
				<div className="mobile-filter">
					<select name="" id="" value={city} onChange={(e)=>setCity(e.target.value)}>
						<option value="">Filter By City</option>{
							cities.map((city,index)=>(
								<option value={city} key={index}>{city}</option>
							))
						}
					</select>

					<select name="" id="" value={niche} onChange={(e)=>setNiche(e.target.value)}>
						<option value="">Filter By Niche</option>{
							nichesArray.map((niche,index)=>(
								<option value={niche} key={index}>{niche}</option>
							))
						}
					</select>
				</div>

				<div className="jobs_container">
					{
						jobs && jobs.map((elem)=>(
							<div className="card" key={elem._id}>
								{
									elem.hiringMultipleCandidates==="Yes" ? (
										<p className="hiring-multiple">Hiring MultipleCandidates</p>
									) : (<p className="hiring">Hiring</p>)
								}
								<p className="title">{elem.title}</p>
								<p className="company">{elem.companyName}</p>
								<p className="location">{elem.location}</p>
								<p className="salary">${elem.salary}</p>
								<p className="posted"><span>Posted On :</span>{elem.jobPostedOn.substring(0,10)}</p>
								<div className="btn-wrapper">
									<Link className="btn" to={`/post/application/${elem._id}`} >Apply Now</Link>
								</div>
							</div>
						))
					}
				</div>
			</div>
          </div>
        </section>
      )}
    </>
  );
}

export default Jobs;
