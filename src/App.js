import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Forgot from "./Components/Forgot";
import ForgotReq from "./Components/ForgotReq";
import Login from "./Components/Login";
import Register from "./Components/Register";
import RegisterReq from "./Components/RegisterReq";
import Request from "./Components/Request";
import Welcome from "./Components/Welcome";
import { useState } from "react";
import { EmployeeContext } from "./Context";
import axios from "axios";
import env from "./enviroinment";
import UrlPage from "./Components/UrlPage";


function App() {
  const [length, setLength] = useState();
  const [lengthReq, setLengthReq] = useState();

  const leadLength = async () => {
    let res = await axios.get(`${env.apiurl}/LeadsCrm/getLeadLength`);
    setLength(res.data.data);
    console.log(res);
  };
  const requestLength = async () => {
    let res1 = await axios.get(`${env.apiurl}/ReqCrm/getReqLength`);
    setLengthReq(res1.data.data);
    console.log(res1);
  };
  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <div className="Route-Content1">
          <div className="Route-Content"> */}
          <EmployeeContext.Provider
            value={{
              length: length,
              leadLength: leadLength,
              lengthReq: lengthReq,
              requestLength: requestLength,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/loginBefore" element={<Login />} />
                <Route path="/Forgot" element={<Forgot />} />
                <Route path="/ForgotReq" element={<ForgotReq />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/RegisterReq" element={<RegisterReq />} />
                <Route path="/UrlPage" element={<UrlPage/>} />
                <Route path="/Request" element={<Request />} />
                <Route path="*" element={<Navigate to={"/"} />} />
              </Routes>
            </BrowserRouter>
          </EmployeeContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
