import React from "react";
import { Link } from "react-router-dom";

export default function Menu(props) {
  return (
    <div>
      <nav id="menu">
        <Link to="/">Usuarios</Link>
        <Link to="/tareas">Tareas</Link>
      </nav>
      {props.children}
    </div>
  );
}
