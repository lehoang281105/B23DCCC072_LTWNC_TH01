import { ASSIGNMENT_FILTERS, PRIORITIES } from '../types/assignment';
import type { Assignment, AssignmentFilter, Priority } from '../types/assignment';

function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value);
}

/** Thu hẹp giá trị từ <select> độ ưu tiên về Priority */
export function isPriority(value: unknown): value is Priority {
  return isOneOf(value, PRIORITIES);
}

/** Thu hẹp giá trị bộ lọc về AssignmentFilter */
export function isAssignmentFilter(value: unknown): value is AssignmentFilter {
  return isOneOf(value, ASSIGNMENT_FILTERS);
}

/** Kiểm tra 1 object bất kỳ có hình dạng của Assignment hay không */
export function isAssignment(value: unknown): value is Assignment {
  if (typeof value !== 'object' || value === null) return false;
  const a = value as Record<string, unknown>;
  return (
    typeof a.id === 'string' &&
    typeof a.subject === 'string' &&
    typeof a.title === 'string' &&
    typeof a.deadline === 'string' &&
    isPriority(a.priority) &&
    typeof a.completed === 'boolean'
  );
}

/** Kiểm tra cả danh sách nhận từ API trước khi đưa vào Redux store */
export function isAssignmentArray(value: unknown): value is Assignment[] {
  return Array.isArray(value) && value.every(isAssignment);
}
