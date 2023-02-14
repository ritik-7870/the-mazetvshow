import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Popular from "./Popular";
import MostLiked from "./MostLiked";

const ShowList = () => {
  const [latest, setLatest] = useState([]);
  const navigate = useNavigate();
  const [searchedItem, setSearchedItme] = useState([]);
  console.log(searchedItem)
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/alternatelists/1?embed=alternateepisodes")
      .then((res) => {
        console.log(res);
        setLatest(res.data._embedded.alternateepisodes);
      });
  }, []);

  const handleUrl = (e, id) => {
    console.log(id);
    navigate(`/about/${id}`);
  };

  const handleData = (data) => {
    console.log(data);
    setSearchedItme(data);
  };

  return (
    <>
      <header
        style={{
          boxShadow: "0 1px 14px 0px black",
          borderBottom: "1px solid black",
        }}
      >
        <Navbar handleData={handleData} />
      </header>
      {searchedItem.length > 0 ? <>
      <div className="container my-5">
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          autoplay={{
            delay: 1000,
          }}
          modules={[Autoplay, FreeMode, Pagination]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {searchedItem.map((data) => {
            return (
             
              <>
               {/* {console.log(data.show.image.medium)} */}
             
              
                <SwiperSlide>
                   
                  <div class="card" role="button"  onClick={(e) => {
                      handleUrl(
                        e,
                        data.show._links.previousepisode.href.split("/").pop()
                      );
                    }}>
                    <img src={data.show.image ? data.show.image.original : ""} class="card-img-top" alt="..."  style={{width:'100%', height:'150px', border:'1px solid #000'}}/>
                    <div class="card-body">
                      <h5 class="card-title"></h5>
                     <a href="" target="_blank" rel="noopener noreferrer">More Details</a>
                    </div>
                  </div>
                </SwiperSlide>
              
              </>
            );
          })}
        </Swiper>
        </div>
      </> :  <>
      <div className="container my-5">
        <h1>Latest</h1>
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          autoplay={{
            delay: 5000,
          }}
          modules={[Autoplay, FreeMode, Pagination]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {latest.map((data) => {
            return (
              <>
                <SwiperSlide>
                  <div
                    class="card"
                    role="button"
                    onClick={(e) => {
                      handleUrl(
                        e,
                        data._links.episodes[0].href.split("/").pop()
                      );
                    }}
                  >
                    <img
                      src="..."
                      class="card-img-top"
                      alt="..."
                      style={{
                        width: "100%",
                        height: "150px",
                        border: "1px solid #000",
                      }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{data.name}</h5>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>

        <div className="my-4">
          <h1>Most Liked</h1>
          <MostLiked />
        </div>
        <div className="my-4">
          <h1>Popular</h1>
          <Popular />
        </div>
      </div>
      </>
}
    </>
  );
};

export default ShowList;
