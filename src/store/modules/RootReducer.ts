import { combineReducers } from '@reduxjs/toolkit';
import usuarios from './SliceUsuarios/SliceUsuarios';
import recados from './SliceRecados/SliceRecados';

export default combineReducers({
    usuarios,
    recados,
})