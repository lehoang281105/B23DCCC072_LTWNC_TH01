/**
 * Typed hooks — Tuần 3.
 * Quy tắc: component chỉ được import useAppSelector/useAppDispatch từ đây,
 * KHÔNG dùng useSelector/useDispatch thô (mất kiểu RootState/AppDispatch).
 */
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
