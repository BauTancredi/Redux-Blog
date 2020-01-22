import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosTypes";

export const traerTodos = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    dispatch({
      type: TRAER_TODOS,
      payload: data
    });
  } catch (error) {
    console.log("Error:", error.message);
    dispatch({
      type: ERROR,
      payload: "Algo salio mal, intente mas tarde."
    });
  }
};
