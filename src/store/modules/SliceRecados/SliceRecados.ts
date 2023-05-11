import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { EstadoDaStore } from "../..";

export interface Recado {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  usuario: string;
}

export const fetchrecados = createAsyncThunk("recado/fetchrecados", async () => {
  const result = await axios.get("https://localhost:10000/recados");
  return result.data.data;
});

const adaptadorDosRecados = createEntityAdapter<Recado>({
  selectId: (recado) => recado.id,
});

export const { selectAll, selectById } = adaptadorDosRecados.getSelectors(
  (state: EstadoDaStore) => state.recados
);

const SliceRecado = createSlice({
  name: "recado",
  initialState: adaptadorDosRecados.getInitialState(), //
  reducers: {
    adicionarRecado: adaptadorDosRecados.addOne,
    atualizarRecado: adaptadorDosRecados.updateOne,
    removerRecado: adaptadorDosRecados.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchrecados.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { adicionarRecado, atualizarRecado, removerRecado } =
  SliceRecado.actions;

export default SliceRecado.reducer;
