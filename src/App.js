import React, { useState } from "react";
import "./App.css";

const CALCULATOR_STATES = {
  SUM: "SUM",
  SUBSTRACT: "SUBSTRACT",
  MULTIPLY: "MULTIPLY",
  DIVIDE: "DIVIDE",
};

function App() {
  const [value, setValue] = useState("0");
  const [textClean, setTextClean] = useState("AC");
  const [operationValue, setOperationValue] = useState("");
  const [calculatorState, setCalculatorState] = useState(null);
  const [isDecimal, setIsDecimal] = useState(false);

  const formatAmount = new Intl.NumberFormat("es-CL", { currency: "CLP" });

  const cleanCalculator = () => {
    setValue("0");
    setTextClean("AC");
    setIsDecimal(false);
  };

  const selectNumber = (number) => {
    if (value.length <= 9) {
      const valueConcat = value.concat(number);
      setValue(valueConcat);
      setTextClean("C");
    }
  };

  const validateOperationClick = (operation) => {
    setCalculatorState(operation);
    setOperationValue(value);
    setValue("0");
  };

  const addSignsToValue = () => {
    if (value.startsWith("-")) {
      setValue(value.substring(1));
    } else {
      setValue("-" + value);
    }
  };

  const calculatePercentaje = () => {
    const firstValue = isDecimal ? parseFloat(value.replace(",", ".")) : parseInt(value);
    const percentaje = (firstValue / 100).toString().replace(".", ",");
    setValue(percentaje);
  };

  const addComma = () => {
    if (!value.includes(",")) {
      const commaConcat = value.length > 1 ? value.concat(",").substring(1) : value.concat(",");
      setValue(commaConcat);
      setIsDecimal(true);
    }
  };

  const calculateValue = () => {
    const firstValue = parseInt(operationValue);
    const secondValue = parseInt(value);
    setIsDecimal(false);

    if (calculatorState === CALCULATOR_STATES.SUM) {
      const sum = (firstValue + secondValue).toString();
      setValue(sum);
    } else if (calculatorState === CALCULATOR_STATES.SUBSTRACT) {
      const substract = (firstValue - secondValue).toString();
      setValue(substract);
    } else if (calculatorState === CALCULATOR_STATES.MULTIPLY) {
      const multiply = (firstValue * secondValue).toString();
      setValue(multiply);
    } else if (calculatorState === CALCULATOR_STATES.DIVIDE) {
      const divide = (firstValue / secondValue).toString();
      setValue(divide);
    } else {
      setValue(value);
    }
  };

  return (
    <div className="container">
      <main className="main">
        <div className="content-input">
          <input
            type="text"
            disabled={true}
            value={isDecimal ? value : formatAmount.format(value)}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <ul className="list-calculator">
          <li className="list-gray" value={textClean} onClick={cleanCalculator}>{textClean}</li>
          <li className="list-gray" value="+/-" onClick={addSignsToValue}>+/-</li>
          <li className="list-gray" value="%" onClick={calculatePercentaje}>%</li>
          <li className="list-yellow"  value="/" onClick={() => validateOperationClick(CALCULATOR_STATES.DIVIDE)}>/</li>
          <li className="list-dark-gray" value="7"onClick={(e) => selectNumber(e.target.value)}>7</li>
          <li className="list-dark-gray" value="8" onClick={(e) => selectNumber(e.target.value)}>8</li>
          <li className="list-dark-gray" value="9" onClick={(e) => selectNumber(e.target.value)}>9</li>
          <li className="list-yellow" value="x" onClick={() => validateOperationClick(CALCULATOR_STATES.MULTIPLY)}>x</li>
          <li className="list-dark-gray" value="4" onClick={(e) => selectNumber(e.target.value)}>4</li>
          <li className="list-dark-gray" value="5" onClick={(e) => selectNumber(e.target.value)}>5</li>
          <li className="list-dark-gray" value="6" onClick={(e) => selectNumber(e.target.value)}>6</li>
          <li className="list-yellow" value="-" onClick={() => validateOperationClick(CALCULATOR_STATES.SUBSTRACT)}>-</li>
          <li className="list-dark-gray" value="1" onClick={(e) => selectNumber(e.target.value)}>1</li>
          <li className="list-dark-gray" value="2" onClick={(e) => selectNumber(e.target.value)}>2</li>
          <li className="list-dark-gray" value="3" onClick={(e) => selectNumber(e.target.value)}>3</li>
          <li className="list-yellow" value="+" onClick={() => validateOperationClick(CALCULATOR_STATES.SUM)}>+</li>
          <li className="list-dark-gray zero" value="0" onClick={value.length > 1 ? (e) => selectNumber(e.target.value) : null}>0</li>
          <li className="list-dark-gray" value="," onClick={addComma}>,</li>
          <li className="list-yellow" value="=" onClick={calculateValue}>=</li>
        </ul>
      </main>
    </div>
  );
}

export default App;
