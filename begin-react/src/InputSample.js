import { useRef, useState } from "react";

export default function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const { name, nickname } = inputs;

  const nameInput = useRef();

  const onReset = (e) => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div>
      <input
        placeholder="name"
        onChange={onChange}
        name="name"
        value={inputs.name}
        ref={nameInput}
      />
      <input
        placeholder="nickname"
        onChange={onChange}
        name="nickname"
        value={inputs.nickname}
      />
      <button onClick={onReset}>Reset</button>
      <div>
        <b>value: </b>
        {name} {nickname && <>({nickname})</>}
      </div>
    </div>
  );
}
