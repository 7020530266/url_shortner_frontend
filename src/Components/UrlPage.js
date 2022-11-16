import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import env from "../enviroinment";
import "../CSS/Login.css";
import Navbar1 from "./Navbar1";
import Table from "react-bootstrap/Table";

function UrlPage() {
  let [full, setFull] = useState("");
  let [data, setData] = useState([]);

  let handleUrlShort = async () => {
    await axios.post(`${env.apiurl}/url/signin-url`, {
      full
    });
  };

  const loadData = async () => {
    const res = await axios.get(`${env.apiurl}/url/getUrlData`);
    if (res.data.statusCode === 200) {
      setData(res.data.data);
    }
  };

  const handleForwardToShort = async (shortUrl) => {
    await handleClicks(shortUrl);
  };

  const handleClicks = async (shortUrl) => {
    console.log(`${shortUrl}`);
    await window.open(`http://localhost:5000/url/${shortUrl}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar1 />
      <div className="container-fluid wallpaper">
        <div className="login-wrapper">
          <h1>URL Shrinker</h1>   
          <Form>
            <Form.Group className="mb-3 ">
              <Form.Control
                type="full"
                placeholder="Url"
                name="full"
                onChange={(e) => setFull(e.target.value)}
              />
              <Button
                className="btn btn-success  m-3"
                type="submit"
                onClick={() => handleUrlShort()}
              >
                Shrink
              </Button>
              <Button
                className="btn btn-success  m-3"
              >
                <a
                  className="nav-link active me-4"
                  style={{ color: "white" }}
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </Button>
            </Form.Group>
          </Form>
          <div className="Adjust">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>No. of Clicks</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a href={e.full}>{e.full}</a>
                    </td>
                    <td onClick={() => handleForwardToShort(e.short)}>
                      <span>{e.short}</span>
                    </td>
                    <td>{e.clicks}</td>
                    <td>{e.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>
          </div>
        </div>
   
     
    </>
  );
}

export default UrlPage;
