import { TRAER_TODAS, CARGANDO, ERROR } from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");

    const tareas = {};
    let data = await response.json();
    data.map(
      tar =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
    console.log("Error:", error.message);
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible."
    });
  }
};

export const cambioUsuarioId = usuario_id => dispatch => {
  dispatch({
    type: "cambio_usuario_id",
    payload: usuario_id
  });
};
export const cambioTitulo = titulo => dispatch => {
  dispatch({
    type: "cambio_titulo",
    payload: titulo
  });
};

export const agregar = nuevaTarea => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevaTarea)
    }).then(response => response.json());
    console.log(data);
    dispatch({
      type: "guardar"
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde."
    });
  }
};

export const editar = tareaEditada => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${tareaEditada.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tareaEditada)
      }
    ).then(response => response.json());
    console.log(data);
    dispatch({
      type: "guardar"
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde."
    });
  }
};

export const cambioCheck = (user_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[user_id][tar_id];

  const actualizadas = {
    ...tareas
  };
  actualizadas[user_id] = {
    ...tareas[user_id]
  };
  actualizadas[user_id][tar_id] = {
    ...tareas[user_id][tar_id],
    completed: !seleccionada.completed
  };

  dispatch({
    type: "actualizar",
    payload: actualizadas
  });
};

export const eliminar = tar_id => async dispatch => {
  dispatch({
    type: CARGANDO
  });

  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${tar_id}`, {
      method: "DELETE"
    });

    dispatch({
      type: TRAER_TODAS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Servicio no disponible."
    });
  }
};

export const limpiarForma = () => disptach => {
  disptach({
    type: "limpiar"
  });
};
