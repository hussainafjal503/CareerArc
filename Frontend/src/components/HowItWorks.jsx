import React from 'react'
import {LuUserPlus} from "react-icons/lu"
import {VscTasklist} from "react-icons/vsc" 
import {BiSolidLike} from "react-icons/bi" 

function HowItWorks() {
  return (
	<section className='howItWorks'>
		<h3>How Does it works?</h3>
		<div className="container">
			<div className="card">
				<div className="icon">
					<LuUserPlus />
				</div>
				<h4>Create an Account..</h4>
				<p>Sign up for a free Account as a job seeker or employer. Set up your Profile in minutes to start posting jobs or applying  for jobs. Customize your profile to highlight your skills or requirements </p>
			</div>
			<div className="card">
				<div className="icon">
					<VscTasklist />
				</div>
				<h4>Post or Browse Jobs</h4>
				<p>Employers can post detailed job descriptions, and job seekers can browse a comprehensive list of available positions. Utilize filters to find jobs that mathch your skills and preferences. </p>
			</div>

			<div className="card">
				<div className="icon">
					<BiSolidLike />
				</div>
				<h4>Hire & Get Hired</h4>
				<p>Employer can shortlist condidates and extends job offers. Job seekers can review job offers and accept positions that align with their career goals... </p>
			</div>
			
		</div>
	  
	</section>
  )
}

export default HowItWorks
