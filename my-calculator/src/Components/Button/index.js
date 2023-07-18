import React from "react";
import "./style.css"
export default function Botao({ displayNum, onClick }) {
  const handleClick = () => {
    onClick(displayNum);
  };

  return <button className="calculatorButtons" onClick={handleClick}>{displayNum}</button>;
}
