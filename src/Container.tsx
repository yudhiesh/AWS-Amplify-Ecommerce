import React from "react";

export default function Container() {
  return <div style={containerStyle}></div>;
}

const containerStyle: React.CSSProperties = {
  width: 900,
  margin: "0 auto",
  padding: "20px 0px"
};
