import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
