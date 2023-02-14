import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = ({handleData}) => {
  const [searchInput, setSearchInput] = useState("");


  const handleSearch = (e) => {
    e.preventDefault()
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchInput}`).then((res) => {
      console.log(res);
  
      handleData(res.data)
    });
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mx-5">
        <a class="navbar-brand" href="/">
          Tv Maze Show
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="form-inline my-2 ms-auto d-flex my-lg-0">
            <input
              class="form-control mr-sm-2"
            
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              placeholder="Search"
              
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              onClick={(e) => {handleSearch(e)}}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
