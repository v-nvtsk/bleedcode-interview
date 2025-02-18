import {RootState} from "..";

export const getUser = (state:RootState) => state.user;
export const getTasks = (state:RootState) => state.task;