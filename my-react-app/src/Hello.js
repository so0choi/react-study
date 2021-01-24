import React from "react";

function Hello({ color, name, isSpecial }) {
  return (
    <div
      style={{
        color,
      }}
    >
      {isSpecial && <b> * </b>}
      안녕하쇼 {name}
    </div>
  );
}

export default Hello;
