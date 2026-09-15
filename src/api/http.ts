/**
 * Hạ tầng HTTP dùng chung — Tuần 1: generics.
 * ApiResponse<T> / Paginated<T> thay cho việc lặp Promise<{...}> ở mọi nơi,
 * findById<T extends HasId> là generic có constraint (nền tảng Repository).
 */

/** Chuẩn phản hồi API của đồ án */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

/** Sẵn sàng cho API phân trang (bài tập lớn hơn) */
export interface Paginated<T> {
  items: T[];
  page: number;
  total: number;
}

/** Constraint: mọi thực thể có id đều dùng được findById */
export interface HasId {
  id: string;
}

/** Tìm phần tử theo id — T được giữ nguyên, không mất kiểu */
export function findById<T extends HasId>(items: readonly T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

/** Sinh id duy nhất cho bài tập tạo ở client */
export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Giả lập độ trễ mạng cho mock API */
export function networkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
