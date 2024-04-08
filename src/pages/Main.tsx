import React, { useEffect, useState } from "react";
import "./../App.css";
import * as math from "mathjs";
import styles from "./Main.module.css";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";

const array = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "*",
  "/",
];

function Main() {
  const [expression, setExpression] = useState("");
//   const [screenVal, setScreenVal] = useState("");
  const [customVariables] = useState({});
  // Default mode is "rad"
  const [mode] = useState("rad");
  const [value, setValue] = useState(1);

  useEffect(()=>{
    if(value===1){
        document.body.classList.add('white')
        document.body.classList.remove('dark')
        document.body.classList.remove('blue')
    }
    if(value===2){
        document.body.classList.add('dark')
        document.body.classList.remove('white')
        document.body.classList.remove('blue')
    }
    if(value===3){
        document.body.classList.add('blue')
        document.body.classList.remove('dark')
        document.body.classList.remove('white')
    }
  },[value])

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExpression(e.target.value);
  }

  function handleClick(input: string) {
    setExpression((prevExpression) => prevExpression + input);
  }

  function calculate() {
    try {
      const allVariables = {
        ...customVariables,
        pi: Math.PI,
        e: Math.E,
        // Add factorial function
        fact: math.factorial,
        sin: mode === "rad" ? Math.sin : math.sin,
        cos: mode === "rad" ? Math.cos : math.cos,
        tan: mode === "rad" ? Math.tan : math.tan,
        asin: mode === "rad" ? Math.asin : math.asin,
        acos: mode === "rad" ? Math.acos : math.acos,
        atan: mode === "rad" ? Math.atan : math.atan,
      };

      const result = math.evaluate(expression, allVariables);
      if (typeof result === "number" && !isNaN(result)) {
        setExpression(String(result));
      } else {
        alert("Error: Invalid expression");
      }
    } catch (error) {
      alert("Error: Invalid expression");
    }
  }

  function clearScreen() {
    setExpression("");

  }

  function backspace() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }



  return (
    <>
      <div className="App">
        <div className="calc-body">
          <div className={styles.header}>
            <h1 className={styles.textHead}>calc</h1>
            <div className={styles.right}>
              <div className={styles.textHead}>Theme</div>
              <div>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio className={styles.textHead} value={1}>1</Radio>
                  <Radio className={styles.textHead} value={2}>2</Radio>
                  <Radio className={styles.textHead} value={3}>3</Radio>    
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className={styles.inputSection}>
            <input
              className={styles.screen}
              type="text"
              value={expression}
              onChange={handleChange}
            />
          </div>
          <div className="button-section">
            <div className={styles.numericPad}>
              {array.map((input) => (
                <button key={input} onClick={() => handleClick(input)}>
                  {input}
                </button>
              ))}
              <button onClick={() => handleClick(".")}>,</button>
            </div>
            {/* <div className="output">Output: {screenVal}</div> */}
            <div className={styles.controlButtons}>
              <button className="clear-button" onClick={clearScreen}>
                CLEAR
              </button>
              <button className="backspace-button" onClick={backspace}>
                DELETE
              </button>
              <button className="equals-button" onClick={calculate}>
                =
              </button>
            </div>
          </div>
        </div>
        <div className="variables"></div>
      </div>
    </>
  );
}

export default Main;
