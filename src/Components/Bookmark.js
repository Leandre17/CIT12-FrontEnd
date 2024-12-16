import React from "react";

const Bookmark = ({ bookmark }) => {
  if (!bookmark) return null;
  return (
    <div className="bookmark-item" style={{ margin: "10px 0" }}>
      <h3>Item ID: {bookmark.itemId}</h3> {/* Displays the itemId */}
      <p>Type: {bookmark.itemType}</p> {/* Displays the itemType */}
      <p>Note: {bookmark.annotation}</p> {/* Displays the annotation */}
    </div>
  );
};

export default Bookmark;
