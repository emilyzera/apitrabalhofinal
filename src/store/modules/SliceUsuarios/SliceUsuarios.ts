import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { EstadoDaStore } from '../..';

export interface Usuario {
    email: string,
    senha: string,
}

const adaptadorDosUsuarios = createEntityAdapter<Usuario>({
    selectId: (usuario) => usuario.email,
});

export const { selectAll, selectById } = adaptadorDosUsuarios.getSelectors((state: EstadoDaStore) => state.usuarios)

const SliceUsuario = createSlice({
    name: 'usuario',
    initialState: adaptadorDosUsuarios.getInitialState(),
    reducers: {
        adicionarUsuario: adaptadorDosUsuarios.addOne,
        atualizarUsuario: adaptadorDosUsuarios.updateOne,
        removerUsuario: adaptadorDosUsuarios.removeOne,
    },
})

export const { adicionarUsuario, atualizarUsuario, removerUsuario } = SliceUsuario.actions

export default SliceUsuario.reducer
