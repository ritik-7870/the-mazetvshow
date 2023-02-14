import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Popular = () => {
    const navigate = useNavigate()
    const [episodes, setEpisodes] = useState([])
    const [image, setImage] = useState({})
    useEffect(() => {
      axios.get("https://api.tvmaze.com/seasons/1/episodes").then((res) => {
        console.log(res)
        setEpisodes(res.data)
        setImage(res.data.image)
      })
    }, [])
    
    
  return (
   <>
   <Swiper
          spaceBetween={50}
          slidesPerView={4}
          autoplay={{
            delay: 4000,
          }}
          modules={[Autoplay, FreeMode, Pagination]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {episodes.map((data) => {
            return (
              <>
                <SwiperSlide>
                   
                  <div class="card" role="button">
                    <img src={data.image.original} class="card-img-top" alt="..."  style={{width:'100%', height:'150px', border:'1px solid #000'}}/>
                    <div class="card-body">
                      <h5 class="card-title">{data.name}</h5>
                     <a href={data.url} target="_blank" rel="noopener noreferrer">More Details</a>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
   
   </>
  )
}

export default Popular
