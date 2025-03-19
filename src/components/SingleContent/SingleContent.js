import React from "react";
import { Badge } from "@mui/material";
import ContentModal from "../ContentModal/ContentModal"; // Import the modal component
import "./SingleContent.css"; // Import the styles

const SingleContent = ({ id, title, poster, media_type, date, vote_average }) => {
  const imageUrl = poster
    ? `https://image.tmdb.org/t/p/w300${poster}`
    : "https://via.placeholder.com/300"; // Fallback image

  return (
    <ContentModal media_type={media_type} id={id}> {/* Wrap with ContentModal */}
      <div className="single-content">
        {/* Badge for Vote Average */}
        <Badge
          badgeContent={vote_average ? vote_average.toFixed(1) : "N/A"}
          color={vote_average >= 7 ? "success" : vote_average >= 5 ? "warning" : "error"}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: "14px",
            padding: "6px 10px",
            borderRadius: "8px",
          }}
        />

        {/* Movie/TV Poster */}
        <img src={imageUrl} alt={title} className="poster" />

        {/* Title */}
        <h3 className="title">{title}</h3>

        {/* Subtitle */}
        <p className="info">
          {media_type.toUpperCase()} | {date ? date : "No Date Available"}
        </p>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
