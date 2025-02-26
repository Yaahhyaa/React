import React from "react";

const MovieCard = ({ item, openModal }) => {
    return (
        <div className="movie-card" onClick={() => openModal(item.imdbID)}>
            <img src={item.Poster !== "N/A" ? item.Poster : "placeholder.jpg"} alt={item.Title} />
            <p>{item.Title}</p>
        </div>
    );
};

export default MovieCard;
