/**
 * useDeadlineInfo — custom hook nâng cao (Tuần 2) + discriminated union (Tuần 1).
 *
 * Yêu cầu #6: mỗi bài tập hiển thị "Còn X ngày" / "Quá hạn Y ngày".
 * Trả về union 3 nhánh `kind`, compiler bắt buộc nơi gọi xử lý đủ mọi trường hợp;
 * nội bộ dùng useNow để ngày tự cập nhật theo thời gian thực.
 */
import { useMemo } from 'react';
import { useNow } from './useNow';
import { daysUntil } from '../utils/date';

export type DeadlineInfo =
  | { kind: 'remaining'; days: number; label: string }
  | { kind: 'today'; days: 0; label: string }
  | { kind: 'overdue'; days: number; label: string };

export function useDeadlineInfo(deadlineIso: string): DeadlineInfo {
  const now = useNow();

  return useMemo(() => {
    const days = daysUntil(deadlineIso, now);
    if (days > 0) {
      return { kind: 'remaining', days, label: `Còn ${days} ngày` };
    }
    if (days === 0) {
      return { kind: 'today', days: 0, label: 'Đến hạn hôm nay' };
    }
    return { kind: 'overdue', days: -days, label: `Quá hạn ${-days} ngày` };
  }, [deadlineIso, now]);
}
