import { Dispatch } from "redux";
import { UserDispatchType } from "../@types";
import * as actionTypes from './actionTypes';

export const setCurrentUser = (user: any) => (dispatch: Dispatch<UserDispatchType>) => {
  dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user});
}