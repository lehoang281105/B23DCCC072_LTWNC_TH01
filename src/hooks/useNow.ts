/**
 * useNow — custom hook nâng cao (Tuần 2).
 * "Đồng hồ sống": trả về thời điểm hiện tại, tự tick mỗi intervalMs.
 * Nhờ đó các nhãn "Còn X ngày" tự đổi khi qua nửa đêm mà không cần reload trang.
 *
 * Nguyên tắc Tuần 2: tên bắt đầu bằng `use`, single responsibility,
 * trả object kiểu rõ ràng, không phụ thuộc UI.
 */
import { useEffect, useState } from 'react';

export function useNow(intervalMs: number = 60_000): Date {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}
