import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Error from "../General/Error";

import * as tareasActions from "../../actions/tareasActions";
import { Redirect } from "react-router-dom";

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { user_id, tar_id }
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma
    } = this.props;

    if (user_id && tar_id) {
      const tarea = tareas[user_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }
  cambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value);
  };

  cambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
  };

  guardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      match: {
        params: { user_id, tar_id }
      },
      tareas,
      editar
    } = this.props;
    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if (user_id && tar_id) {
      const tarea = tareas[user_id][tar_id];
      const tareaEditada = {
        ...tarea,
        completed: tarea.completed,
        id: tarea.id
      };
      editar(tareaEditada);
    } else {
      agregar(nuevaTarea);
    }
  };

  deshabilitar = () => {
    const { titulo, usuario_id, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!titulo || !usuario_id) {
      return true;
    }
    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;

    if (cargando) return <Spinner />;
    if (error) return <Error mensaje={error} />;
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar tarea</h1>
        Usuario ID:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.cambioTitulo}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
