import React from "react";

export default function Hello({ color, name, isSpecial }) {
  return (
    <div>
      <h1 style={{ color }}>
        {isSpecial && <b>*</b>}
        HELLO~ {name}
      </h1>
    </div>
  );
}

Hello.defaultProps = {
  color: "gray",
  name: "noname",
};
