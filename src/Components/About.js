import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const About = () => {
    const [detail, setDetail] = useState({})
    const [dataImage, setDataImage] = useState({})
    const [average, setAverage] = useState({})
    console.log(detail)
  const url = window.location.href;
  let episodeLink = url.split("/").pop();
  console.log(episodeLink);
  useEffect(() => {
    axios.get(`https://api.tvmaze.com/episodes/${episodeLink}`).then((res) => {
      console.log(res);
      setDetail(res.data)
      setDataImage(res.data.image)
      setAverage(res.data.rating)
    });
  }, []);

  return (
    <>
    <header style={{boxShadow:'0 1px 14px 0px black', borderBottom:'1px solid black'}}>
        <Navbar/>
    </header>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <img
              src={dataImage ? dataImage.original : ""}
              style={{ height: "200px", width: "100%" }}
              alt=""
              srcset=""
            />
          </div>
          <div className="col-md">  
            <div className="">
              <span style={{fontSize:'18px', fontWeight:'500'}}>{detail.name} ( <span style={{color:'#9ee408', fontSize:'14px', fontWeight:'400'}}>{average.average}/10 </span>)</span>
              <div>
                <span>{detail.airdate} | {detail.runtime} min | Director.</span>
                <p>Cast: john jacob, hans meir, mohammad ali</p>
              </div>
              <div className="">
                <p style={{fontSize:'18px'}}>
                    {detail.summary}
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
