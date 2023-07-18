import { useState } from "react";
import Botao from "../Botao";
import Screen from "../Screen";
import "./style.css";

export default function Calculator() {
  const [value, setValue] = useState("0");
  const [prevValue, setPrevValue] = useState(0);
  const [operator, setOperator] = useState("");
  const [isOperatorClicked, setIsOperatorClicked] = useState(false);
  const [savedNumber, setSavedNumber] = useState(0);
  const [savedType, setSavedType] = useState("");

  const buttonValues = [
    7,
    8,
    9,
    "/",
    4,
    5,
    6,
    "*",
    1,
    2,
    3,
    "-",
    ".",
    0,
    "=",
    "+",
    "CE",
    "C",
    "M+",
    "M-",
    "MR",
    "MC",
  ];

  const updateDisplayValue = (newValue) => {
    if (["MR", "MC", "M+", "M-"].includes(newValue)) {
      return null;
    } else {
      if (newValue === ".") {
        if (!value.includes(".")) {
          setValue(value + ".");
        }
      } else if (isOperatorClicked) {
        setValue(newValue.toString());
        setIsOperatorClicked(false);
      } else {
        setValue(
          value === "0" ? newValue.toString() : value + newValue.toString()
        );
      }
    }
  };

  const setOperation = (operation) => {
    setIsOperatorClicked(true);
    setOperator(operation);
    setPrevValue(parseFloat(value));
  };

  const operatorHandler = (item) => {
    if (item === "=") {
      calculate(parseFloat(value), prevValue, operator);
      setIsOperatorClicked(true);
    } else if (["/", "*", "-", "+"].includes(item)) {
      setOperation(item);
    } else if (item === "CE") {
      clearAll();
    } else if (item === "C") {
      clearRecent();
    } else if (["MR", "MC", "M+", "M-"].includes(item)) {
      memoryUse(item);
    }
  };

  const calculate = (num1, num2, op) => {
    let result;
    switch (op) {
      case "+":
        result = num2 + num1;
        break;
      case "-":
        result = num2 - num1;
        break;
      case "*":
        result = num2 * num1;
        break;
      case "/":
        result = num2 / num1;
        break;
      default:
        result = 0;
        break;
    }
    setValue(result.toString());
  };

  const clearAll = () => {
    setValue(0);
    setOperator("");
    setPrevValue(0);
  };

  const clearRecent = () => {
    setValue(0);
  };

  const memoryUse = (v) => {
    if(v === "M+"){
      setSavedNumber(savedNumber + parseFloat(value));
      setSavedType("M")
    } else if(v === "M-"){
      setSavedNumber(savedNumber - parseFloat(value));
    } else if (v === "MR"){
      setValue(savedNumber);
    } else if(v === "MC"){
      setSavedNumber(0);
    }
  };

  return (
    <div className="container">
      <Screen equacao={value} saved={savedType} />
      <div className="grade">
        {buttonValues.map((item) => (
          <Botao
            displayNum={item}
            onClick={
              typeof item === "number"
                ? () => {
                    updateDisplayValue(item);
                  }
                : () => {
                    updateDisplayValue(item);
                    operatorHandler(item);
                    
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}
