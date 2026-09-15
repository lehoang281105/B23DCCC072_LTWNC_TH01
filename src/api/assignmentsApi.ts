/**
 * Mock API giả lập — yêu cầu #7: khi khởi động app lấy danh sách mẫu từ API.
 * Giả lập đủ "chất" mạng: độ trễ ~800ms, bao bọc ApiResponse<T>, có cờ bật lỗi
 * để demo trạng thái failed + nút thử lại.
 *
 * Đặt SIMULATE_ERROR = true nếu muốn xem màn hình lỗi / retry khi chấm demo.
 */
import type { Assignment } from '../types/assignment';
import type { ApiResponse } from './http';
import { daysFromToday } from '../utils/date';
import { networkDelay } from './http';

const NETWORK_DELAY_MS = 800;
const SIMULATE_ERROR = false;

/**
 * Dữ liệu mẫu: hạn nộp tính TƯƠNG ĐỐI so với hôm nay nên demo luôn đúng
 * mọi thời điểm — 1 bài quá hạn 2 ngày, 1 bài đến hạn hôm nay, 2 bài đã hoàn thành.
 */
const SEED_ASSIGNMENTS: readonly Assignment[] = [
  {
    id: 'hw-1',
    subject: 'Lập trình Web Nâng Cao',
    title: 'Bài tập Tuần 3 — Redux Toolkit: hoàn thiện cart module',
    deadline: daysFromToday(2),
    priority: 'high',
    completed: false,
  },
  {
    id: 'hw-2',
    subject: 'Cấu trúc dữ liệu & giải thuật',
    title: 'Đồ án cây AVL — nộp code + báo cáo',
    deadline: daysFromToday(-2),
    priority: 'high',
    completed: false,
  },
  {
    id: 'hw-3',
    subject: 'Tiếng Anh học thuật',
    title: 'Writing Task 2 — Opinion Essay (250 từ)',
    deadline: daysFromToday(0),
    priority: 'medium',
    completed: false,
  },
  {
    id: 'hw-4',
    subject: 'Mạng máy tính',
    title: 'Bài tập chương 3 — chia subnet cho mạng doanh nghiệp',
    deadline: daysFromToday(5),
    priority: 'medium',
    completed: false,
  },
  {
    id: 'hw-5',
    subject: 'Toán rời rạc',
    title: 'Problem Set 4 — đồ thị & cây khung nhỏ nhất',
    deadline: daysFromToday(9),
    priority: 'low',
    completed: false,
  },
  {
    id: 'hw-6',
    subject: 'Kỹ năng mềm',
    title: 'Slide thuyết trình nhóm đề tài cuối kỳ',
    deadline: daysFromToday(14),
    priority: 'low',
    completed: false,
  },
  {
    id: 'hw-7',
    subject: 'Lập trình Web Nâng Cao',
    title: 'Bài tập Tuần 2 — Compound Component Accordion',
    deadline: daysFromToday(-5),
    priority: 'medium',
    completed: true,
  },
  {
    id: 'hw-8',
    subject: 'Cơ sở dữ liệu',
    title: 'Thực hành SQL — truy vấn nâng cao',
    deadline: daysFromToday(-1),
    priority: 'low',
    completed: true,
  },
];

/** GET /api/assignments — trả về danh sách bài tập mẫu */
export function fetchAssignmentsApi(): Promise<ApiResponse<Assignment[]>> {
  return networkDelay(NETWORK_DELAY_MS).then(() => {
    if (SIMULATE_ERROR) {
      return Promise.reject(new Error('Không kết nối được máy chủ (mock)'));
    }
    return {
      statusCode: 200,
      message: 'OK',
      // bản sao mới để tránh mutate seed ngoài ý muốn
      data: SEED_ASSIGNMENTS.map((assignment) => ({ ...assignment })),
    };
  });
}
