/**
 * Tiện ích xử lý ngày — tính "Còn X ngày" / "Quá hạn Y ngày".
 * Quy ước: so sánh theo NGÀY DƯƠNG (bỏ qua giờ/phút/giây) theo giờ địa phương,
 * để "Còn 3 ngày" đúng trực giác của sinh viên.
 */
import type { Assignment } from '../types/assignment';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Ép về 00:00 của ngày địa phương */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Số ngày từ `now` tới `deadlineIso` (theo ngày dương):
 * > 0 còn X ngày, < 0 quá hạn |X| ngày, = 0 đến hạn hôm nay.
 */
export function daysUntil(deadlineIso: string, now: Date = new Date()): number {
  const diff = startOfDay(new Date(deadlineIso)).getTime() - startOfDay(now).getTime();
  return Math.round(diff / MS_PER_DAY);
}

/** Định dạng hạn nộp để hiển thị, vd: 15/09/2026 */
export function formatDeadline(deadlineIso: string): string {
  return new Date(deadlineIso).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/** Chuẩn hoá một Date thành 'yyyy-mm-dd' theo giờ địa phương */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 'yyyy-mm-dd' của hôm nay — dùng cho min của input[date] */
export function todayIso(now: Date = new Date()): string {
  return toIsoDate(now);
}

/** Tạo hạn nộp cách hôm nay `days` ngày — dùng cho dữ liệu mẫu của mock API */
export function daysFromToday(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toIsoDate(d);
}

/** Bài tập chưa hoàn thành AND đã qua hạn nộp */
export function isOverdue(assignment: Assignment, now: Date = new Date()): boolean {
  return !assignment.completed && daysUntil(assignment.deadline, now) < 0;
}
