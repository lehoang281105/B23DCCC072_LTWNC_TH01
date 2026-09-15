/**
 * Cấu hình Redux Store — Tuần 3.
 * pattern của slide: features/assignments/assignmentsSlice.ts.
 */
import { configureStore } from '@reduxjs/toolkit';
import assignmentsReducer from '../features/assignments/assignmentsSlice';

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
  },
});

/** Kiểu toàn bộ state — dùng cho typed hooks và selectors */
export type RootState = ReturnType<typeof store.getState>;

/** Kiểu dispatch (chứa cả thunk) — dùng cho useAppDispatch */
export type AppDispatch = typeof store.dispatch;
