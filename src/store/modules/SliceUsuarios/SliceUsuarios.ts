import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { EstadoDaStore } from "../..";
import { loginUser } from "../../../api/index";
import LoginUsuarioType from "../../../types/Login.type";
export interface Usuario {
  email: string;
  senha: string;
}

const adaptadorDosUsuarios = createEntityAdapter<Usuario>({
  selectId: (usuario) => usuario.email,
});

export const loginAction = createAsyncThunk(
  "usuario/login",
  async (login: LoginUsuarioType) => {
    const result = await loginUser(login);
    return result;
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState: {
    logged: false,
    user: {} as any,
  },
  reducers: {
    logout: () => {
      return {
        logged: false,
        user: {} as any,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      return {
        logged: true,
        user: action.payload.data,
      };
    });
  },
});

export const { selectAll, selectById } = adaptadorDosUsuarios.getSelectors(
  (state: EstadoDaStore) => state.usuarios
);

const SliceUsuario = createSlice({
  name: "usuario",
  initialState: adaptadorDosUsuarios.getInitialState(),
  reducers: {
    adicionarUsuario: adaptadorDosUsuarios.addOne,
    atualizarUsuario: adaptadorDosUsuarios.updateOne,
    removerUsuario: adaptadorDosUsuarios.removeOne,
  },
});

export const { adicionarUsuario, atualizarUsuario, removerUsuario } =
  SliceUsuario.actions;

export default SliceUsuario.reducer;

export const { logout } = loginSlice.actions;
