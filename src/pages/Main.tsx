import React, { useEffect, useState } from 'react';
import './../App.css';
import * as math from 'mathjs';
import styles from './Main.module.css'

const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0','+', '-', '*', '/']

function App() {
  const [expression, setExpression] = useState('');
  const [screenVal, setScreenVal] = useState('');
  const [customVariables, setCustomVariables] = useState({});
  // Default mode is "rad"
  const [mode, setMode] = useState('rad');


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
        sin: mode === 'rad' ? Math.sin : math.sin,
        cos: mode === 'rad' ? Math.cos : math.cos,
        tan: mode === 'rad' ? Math.tan : math.tan,
        asin: mode === 'rad' ? Math.asin : math.asin,
        acos: mode === 'rad' ? Math.acos : math.acos,
        atan: mode === 'rad' ? Math.atan : math.atan,
      };

      const result = math.evaluate(expression, allVariables);
      if (typeof result === 'number' && !isNaN(result)) {
        setExpression(String(result));
      } else {
        setScreenVal('Error: Invalid expression');
      }
    } catch (error) {
      setScreenVal('Error: Invalid expression');
    }
    
  }



  function clearScreen() {
    setExpression('');
    setScreenVal('');
  }

  function backspace() {
    const newExpression = expression.slice(0, -1);
    setExpression(newExpression);
  }

  function toggleMode() {
    // Toggle between "rad" and "deg" modes
    setMode(mode === 'rad' ? 'deg' : 'rad');
  }

  return (
    <>
      <div className="App">
        <div className="calc-body">
          <div className={styles.header}>
            <h1>calc</h1>
            <div>Theme</div>
          </div>
          <div className="input-section">
            <input
              className={styles.screen}
              type="text"
              value={expression}
              onChange={handleChange}
            />
          </div>
          <div className="button-section">
            <div className={styles.numericPad}>
              {array.map(
                (input) => (
                  <button key={input} onClick={() => handleClick(input)}>
                    {input}
                  </button>
                )
              )}
              <button onClick={() => handleClick('.')}>,</button>
            </div>
            <div className="output">Output: {screenVal}</div>
            <div className={styles.controlButtons}>
              <button className="clear-button" onClick={clearScreen}>
                Clear
              </button>
              <button className="backspace-button" onClick={backspace}>
                del
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

export default App;
