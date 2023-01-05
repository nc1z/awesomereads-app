import axios from "axios";
import React from "react";

const Carousel = () => {
  const fetchBooks = async () => {
    try {
      const { data: response } = await axios.get("/api/books");
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return <div onClick={fetchBooks}>Carousel</div>;
};

export default Carousel;
