import React, { useEffect } from "react";
const defaultTextState = "바보";

export default function Soyeong() {
  const [text, setText] = React.useState("");

  const handleChangeText = React.useCallback(() => {
    if (text === defaultTextState) {
      setText("멍청이");
      return;
    }
    setText(defaultTextState);
  }, [text]);

  useEffect(() => {
    if (!text) {
      setText(`이건 처음 상태겠지 ${defaultTextState}야`);
    }
  }, [text]);

  return (
    <div>
      {text}
      <button onClick={handleChangeText}>Change</button>
    </div>
  );
}
