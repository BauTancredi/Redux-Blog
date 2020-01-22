import { TRAER_TODAS, CARGANDO, ERROR } from "../types/tareasTypes";

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: "",
  usuario_id: "",
  titulo: "",
  regresar: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        error: "",
        regresar: false
      };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case "cambio_usuario_id":
      return { ...state, usuario_id: action.payload };

    case "cambio_titulo":
      return { ...state, titulo: action.payload };

    case "guardar":
      return {
        ...state,
        tareas: {},
        cargando: false,
        error: "",
        regresar: true,
        usuario_id: "",
        titulo: ""
      };

    case "actualizar":
      return {
        ...state,
        tareas: action.payload
      };

    case "limpiar":
      return { ...state, usuario_id: "", titulo: "" };

    default:
      return state;
  }
};
