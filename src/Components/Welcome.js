
import "../CSS/Welcome1.css";

import Navbar1 from "./Navbar1";
import axios from "axios";
import React, { useEffect, useState } from "react";
import env from "../enviroinment";

export default function Welcome() {
  let [dataDay, setDataDay] = useState([]);
  let [dataMonth, setDataMonth] = useState([]);
 
  const loadData = async () => {
    const res = await axios.get(`${env.apiurl}/url/getShrinkPerDay`);
    if (res.data.statusCode === 200) {
      setDataDay(res.data.dataDay);
    }
  };

  const loadDataMonth = async () => {
    const res = await axios.get(`${env.apiurl}/url/getShrinkPerMonth`);
    if (res.data.statusCode === 200) {
      setDataMonth(res.data.dataMonth);
    }
  };

  useEffect(() => {
    loadData();
    loadDataMonth();
  }, []);

  
  return (
    <>
      <Navbar1 />
      <div className ="container-fluid wallpaper">
        <div className="login-wrapper">
        <div className="Adjust">
            <h1>Hi, Welcome to The INDO Group</h1>
            <p>We are the Free URL Shortner service provider in India</p>
             <p>No of URL shorted per day:<span> {dataDay}</span></p>
            <p>No of URL shorted per month:<span> {dataMonth}</span></p> 
        </div>
        </div>
      </div>
    </>
  );
}
