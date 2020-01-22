import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Error from "../General/Error";
import * as tareasActions from "../../actions/tareasActions";
import { Link } from "react-router-dom";

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  componentDidUpdate() {
    const { tareas, cargando, traerTodas } = this.props;
    if (!Object.keys(tareas).length && !cargando) {
      traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (cargando) return <Spinner />;

    if (error) return <Error mensaje={error} />;

    return Object.keys(tareas).map(user_id => (
      <div key={user_id}>
        <h2>Usuario {user_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(user_id)}</div>
      </div>
    ));
  };

  ponerTareas = user_id => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const porUsurario = {
      ...tareas[user_id]
    };

    return Object.keys(porUsurario).map(tar_id => (
      <div key={tar_id}>
        <input
          type="checkbox"
          defaultChecked={porUsurario[tar_id].completed}
          onChange={() => cambioCheck(user_id, tar_id)}
        />
        {porUsurario[tar_id].title}
        <Link to={`/tareas/guardar/${user_id}/${tar_id}`}>
          <button className="m_left">Editar</button>
        </Link>
        <button className="m_left" onClick={() => eliminar(tar_id)}>
          Eliminar
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <Link to="/tareas/guardar">
          <button>Agregar</button>
        </Link>
        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
