import React from "react";
import "../../css/index.css";

export default function Error(props) {
  return <h2 className="center rojo">{props.mensaje}</h2>;
}
