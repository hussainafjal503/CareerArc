import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {} from "react-icons/fa";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
function Footer() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div className="">
          <img src="/logo.png" alt="" />
        </div>
        <div className="">
          <h4>Support</h4>
          <ul>
            <li>Street no. 125 Mumbai Bandara India </li>
            <li>example@gmail.com</li>
            <li>+92 3106507521</li>
          </ul>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                {" "}
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link>
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link>
                <span>
                  {" "}
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link>
                <span>
                  {" "}
                  <FaYoutube />
                </span>
                <span>YouTube</span>
              </Link>
            </li>
            <li>
              <Link>
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; Copyright 2024 All Right Reserved By Afjal Hussain
      </div>
    </> 
  );
}

export default Footer;
