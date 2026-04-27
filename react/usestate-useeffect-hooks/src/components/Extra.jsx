import React, { useEffect, useState } from "react";

const Extra = () => {

    const [state1, setState1] = useState(false);
    const [state2, setState2] = useState(false);
    const [state3, setState3] = useState(false);
    const [state4, setState4] = useState(false);
    const [state5, setState5] = useState(false);
    const [state6, setState6] = useState(false);
    const [state7, setState7] = useState(false);
    const [state8, setState8] = useState(false);
    const [state9, setState9] = useState(false);

  useEffect(() => {
    console.log("Run UseEffect")
  }, [state1, state9]) // Function, Dependency Array

  return (
    <div className="App">
      <h1>Test</h1>
      <button onClick={() => {setState1(!state1)}}>Update State1</button>
      <button onClick={() => {setState2(!state2)}}>Update State2</button>
      <button onClick={() => {setState3(!state3)}}>Update State3</button>
      <button onClick={() => {setState4(!state4)}}>Update State4</button>
      <button onClick={() => {setState5(!state5)}}>Update State5</button>
      <button onClick={() => {setState6(!state6)}}>Update State6</button>
      <button onClick={() => {setState7(!state7)}}>Update State7</button>
      <button onClick={() => {setState8(!state8)}}>Update State8</button>
      <button onClick={() => {setState9(!state9)}}>Update State9</button>
    </div>
  );
};

export default Extra;
