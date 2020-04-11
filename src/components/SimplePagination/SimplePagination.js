import React from "react";

const SimplePagination = (props) => {
  const { prev, next } = props;
  return (
    <div className="btn">
      <button onClick={() => prev()}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export default SimplePagination;
