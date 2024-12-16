import React from "react";

const Bookmark = ({ Bookmark }) => {
  return (
    <div className="bookmark-item" style={{ margin: "10px 0" }}>
      <h3>Item ID: {Bookmark.itemId}</h3> {/* Displays the itemId */}
      <p>Type: {Bookmark.itemType}</p> {/* Displays the itemType */}
      <p>Note: {Bookmark.annotation}</p> {/* Displays the annotation */}
    </div>
  );
};

export default Bookmark;
