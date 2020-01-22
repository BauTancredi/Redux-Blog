import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./Usuarios";
import Tareas from "./Tareas";
import Publicaciones from "./Publicaciones";
import Guardar from "./Tareas/Guardar";

export default function App() {
  return (
    <BrowserRouter>
      <Menu>
        <div className="margen">
          <Route exact path="/" component={Usuarios} />
          <Route exact path="/tareas" component={Tareas} />
          <Route exact path="/tareas/guardar" component={Guardar} />
          <Route
            exact
            path="/tareas/guardar/:user_id/:tar_id"
            component={Guardar}
          />
          <Route exact path="/publicaciones/:key" component={Publicaciones} />
        </div>
      </Menu>
    </BrowserRouter>
  );
}
