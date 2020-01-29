import React from "react";
import "./App.css";
import useEditableGrid from "./hooks/useEditableGrid";

const users = [
  { id: 1, name: "Bill", points: 20 },
  { id: 2, name: "Stevy", points: 20 },
  { id: 3, name: "Thomas", points: 30 }
];
const hiddenFields = ["id"];

function App() {
  const submitChanges = values => {
    console.log(values);
  };
  const [grid, handleSubmit] = useEditableGrid(
    users,
    submitChanges,
    hiddenFields
  );

  return (
    <div className="App">
      <h1>useEditableGrid hook</h1>
      <div>{grid}</div>
      <div>
        <button onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
}

export default App;
