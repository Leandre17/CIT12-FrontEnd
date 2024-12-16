import React from "react";

function Rating({ rating }) {
  return (
    <div className="rating-item">
      <p>
        <strong>Movie:</strong> {rating.tconst}
      </p>
      <p>
        <strong>Rating:</strong> {rating.rating}
      </p>
    </div>
  );
}

export default Rating;
