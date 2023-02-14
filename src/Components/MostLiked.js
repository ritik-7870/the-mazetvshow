import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";

const MostLiked = () => {
    const navigate = useNavigate()
    const [episodes1, setEpisodes1] = useState([])
    console.log(episodes1)
    const [image, setImage] = useState({})
    useEffect(() => {
      axios.get("https://api.tvmaze.com/shows/1?embed=episodes").then((res) => {
        console.log(res)
        setEpisodes1(res.data._embedded.episodes)
       
      })
    }, [])

    const handleUrl = (e, id) => {
        console.log(id)
        navigate(`/about/${id}`);
      }

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
          {episodes1.reverse().map((data) => {
            return (
              <>
                <SwiperSlide>
                   
                  <div class="card" role="button" onClick={(e) => {handleUrl(e, data._links.self.href.split("/").pop()) 
                
            }}>
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

export default MostLiked
