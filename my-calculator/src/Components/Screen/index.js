import React from "react";
import "./style.css";

export default function Screen({ equacao, saved}) {
  return (<div className="screen">
            <div style={{fontSize: 10}}>
                {saved}
            </div>
             {equacao}
          </div>);
}
