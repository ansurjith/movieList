import React from "react";
const Card = ({ index, item }) => {
  return (
    <div key={index} id={`scroll-${index}`} class="movie-card">
      <img src={item["poster-image"]}></img>
      <div class="details">
      <span>{item.name}</span>
      </div>
    </div>
  );
};
export default React.memo(Card);
