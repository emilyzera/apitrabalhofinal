import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { MeuDespachante, EstadoDaStore, RootState } from '../index';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';



export type AppThunkDispatch = ThunkDispatch<
  RootState,
  any,
  AnyAction
>;


export const useAppDispatch: () => MeuDespachante = useDispatch;
export const useAppSelector: TypedUseSelectorHook<EstadoDaStore> = useSelector;
export const useThunkAppDispatch = () =>
  useDispatch<AppThunkDispatch>();