import Hello from "./Hello";
import "./App.css";
import Wrapper from "./Wrapper";

function App() {
  return (
    <>
      <Wrapper>
        <Hello name="React" color="red" isSpecial />
        <Hello color="blue" />
      </Wrapper>
    </>
  );
}

Hello.defaultProps = {
  name: "No name",
};
export default App;
