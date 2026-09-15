/**
 * Memoized selectors — Tuần 3: createSelector của Reselect (đi kèm RTK).
 *
 * Phân hoạch 4 bộ lọc (không giao nhau):
 * - completed   : completed === true
 * - overdue     : !completed && hạn nộp < hôm nay
 * - incomplete  : !completed && chưa quá hạn (sắp đến hạn)
 * - all         : mọi bài tập
 */
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { daysUntil, isOverdue } from '../../utils/date';
import type { AssignmentFilter } from '../../types/assignment';

export interface FilterCounts {
  all: number;
  incomplete: number;
  overdue: number;
  completed: number;
}

const selectItems = (state: RootState) => state.assignments.items;

export const selectStatus = (state: RootState) => state.assignments.status;
export const selectError = (state: RootState) => state.assignments.error;
export const selectFilter = (state: RootState) => state.assignments.filter;

/** Yêu cầu #5 — lọc theo trạng thái */
export const selectFilteredAssignments = createSelector([selectItems, selectFilter], (items, filter) => {
  switch (filter) {
    case 'completed':
      return items.filter((a) => a.completed);
    case 'overdue':
      return items.filter((a) => isOverdue(a));
    case 'incomplete':
      return items.filter((a) => !a.completed && !isOverdue(a));
    case 'all':
    default:
      return items;
  }
});

/** Số lượng mỗi mục — hiển thị badge trên FilterTabs */
export const selectFilterCounts = createSelector([selectItems], (items): FilterCounts => ({
  all: items.length,
  incomplete: items.filter((a) => !a.completed && !isOverdue(a)).length,
  overdue: items.filter((a) => isOverdue(a)).length,
  completed: items.filter((a) => a.completed).length,
}));

/** Danh sách hiển thị: chưa hoàn thành trước, gần hạn lên đầu, đã xong cuối */
export const selectVisibleAssignments = createSelector([selectFilteredAssignments], (items) =>
  [...items].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return daysUntil(a.deadline) - daysUntil(b.deadline);
  })
);

/** Kiểm tra filter hợp lệ khi đọc state (narrowing cho consumer ngoài) */
export function isFilterValue(value: unknown): value is AssignmentFilter {
  return value === 'all' || value === 'incomplete' || value === 'overdue' || value === 'completed';
}
