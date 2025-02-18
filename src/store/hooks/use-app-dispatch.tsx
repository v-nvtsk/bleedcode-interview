import {useDispatch} from "react-redux";
import {AppDispatch} from "..";

// Кастомный хук для `dispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;