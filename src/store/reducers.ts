import {combineReducers} from '@reduxjs/toolkit';
import {combineEpics} from 'redux-observable';
import {BootstrapEpics, bootstrapReducer} from './controls/bootstrap.slice';
import {LoginEpics, loginReducer} from './controls/LoginEpic';
import { ControlEpics, controlReducer } from './slice/controlSlice';

const rootReducer = combineReducers({
    login: loginReducer,
    bootstrap: bootstrapReducer,
    control: controlReducer,
});

export const rootEpic = combineEpics(...LoginEpics, ...BootstrapEpics, ...ControlEpics);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
