import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import RootReducer from "./modules/RootReducer";

const configuracaoPerist = {
  key: " Recados",
  storage,
};

const reducerPersistido = persistReducer(configuracaoPerist, RootReducer);

export const store = configureStore({
  reducer: reducerPersistido,
});

export type EstadoDaStore = ReturnType<typeof store.getState>;

export type MeuDespachante = typeof store.dispatch;

export const persistor = persistStore(store);
