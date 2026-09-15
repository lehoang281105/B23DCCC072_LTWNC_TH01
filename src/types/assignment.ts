/**
 * Model dữ liệu của feature Assignments — Tuần 1: union types, interface,
 * utility types (Omit, Partial, Record), hằng tử kiểu (const assertion).
 */

/** Độ ưu tiên của bài tập — union of string literals */
export type Priority = 'high' | 'medium' | 'low';

/** Danh sách giá trị hợp lệ của Priority — dùng cho type guard và <select> */
export const PRIORITIES = ['high', 'medium', 'low'] as const;

/** Bài tập — thực thể chính của ứng dụng */
export interface Assignment {
  id: string;
  /** Môn học, vd: "Lập trình Web Nâng Cao" */
  subject: string;
  /** Tên bài tập */
  title: string;
  /** Hạn nộp dạng ISO 'yyyy-mm-dd' (giờ địa phương, 00:00) */
  deadline: string;
  priority: Priority;
  completed: boolean;
}

/**
 * DTO tạo bài tập mới — Omit loại bỏ các trường do app tự sinh
 * (id) hoặc có mặc định (completed), form chỉ cần nhập đúng các trường này.
 */
export type CreateAssignmentDto = Omit<Assignment, 'id' | 'completed'>;

/** DTO cập nhật một phần — Partial cho phép gửi từng trường */
export type UpdateAssignmentDto = Partial<Omit<Assignment, 'id'>>;

/** Bộ lọc trạng thái: Tất cả / Chưa hoàn thành / Quá hạn / Đã hoàn thành */
export type AssignmentFilter = 'all' | 'incomplete' | 'overdue' | 'completed';

export const ASSIGNMENT_FILTERS = ['all', 'incomplete', 'overdue', 'completed'] as const;

/** Nhãn hiển thị cho từng bộ lọc — Record đảm bảo khai báo đủ mọi case */
export const FILTER_LABELS: Readonly<Record<AssignmentFilter, string>> = {
  all: 'Tất cả',
  incomplete: 'Chưa hoàn thành',
  overdue: 'Quá hạn',
  completed: 'Đã hoàn thành',
};

/** Theme hiển thị cho từng độ ưu tiên — Record<Priority, ...> bắt buộc đủ 3 mức */
export interface BadgeTheme {
  label: string;
  className: string;
}

export const PRIORITY_THEME: Readonly<Record<Priority, BadgeTheme>> = {
  high: { label: 'Ưu tiên cao', className: 'badge badge--high' },
  medium: { label: 'Ưu tiên trung bình', className: 'badge badge--medium' },
  low: { label: 'Ưu tiên thấp', className: 'badge badge--low' },
};
