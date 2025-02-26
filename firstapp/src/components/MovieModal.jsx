import React from "react";

const MovieModal = ({ data, onClose }) => {
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={data.Poster !== "N/A" ? data.Poster : "placeholder.jpg"} alt="Poster" />
                <h2>{data.Title}</h2>
                <p><strong>Year:</strong> {data.Year}</p>
                <p><strong>Genre:</strong> {data.Genre}</p>
                <p><strong>Plot:</strong> {data.Plot}</p>
            </div>
        </div>
    );
};

export default MovieModal;
