import React from "react";

export default function Botao({ displayNum, onClick }) {
  const handleClick = () => {
    onClick(displayNum);
  };

  return <button onClick={handleClick}>{displayNum}</button>;
}
