import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { MeuDespachante, EstadoDaStore } from '../index';

export const useAppDispatch: () => MeuDespachante = useDispatch;
export const useAppSelector: TypedUseSelectorHook<EstadoDaStore> = useSelector;