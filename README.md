# 📅 Student Deadline Tracker

Ứng dụng quản lý deadline bài tập cá nhân — đồ án tổng hợp môn **Lập trình Web Nâng Cao**
(Tuần 1: TypeScript nâng cao · Tuần 2: Design Pattern React · Tuần 3: Redux Toolkit + TypeScript).

## Cách chạy

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # type-check (tsc --noEmit) + build production
```

Yêu cầu Node 18+. Khi khởi động, app tự gọi **API giả lập** (độ trễ ~800ms) để nạp 8 bài tập mẫu
có hạn nộp tính tương đối so với hôm nay (1 bài quá hạn, 1 bài đến hạn hôm nay, 2 bài đã hoàn thành).

## Tính năng

1. Danh sách bài tập: môn học, tên bài, hạn nộp, độ ưu tiên, trạng thái hoàn thành
2. Thêm bài tập mới qua form (có validate: không để trống, hạn nộp không ở quá khứ)
3. Đánh dấu hoàn thành / bỏ đánh dấu
4. Xoá bài tập
5. Lọc: Tất cả / Chưa hoàn thành / Quá hạn / Đã hoàn thành (kèm số lượng)
6. Mỗi bài hiển thị "Còn X ngày" / "Đến hạn hôm nay" / "Quá hạn Y ngày" (tự cập nhật theo thời gian thực)
7. Lấy danh sách mẫu ban đầu từ API giả lập khi khởi động

## Cấu trúc thư mục (feature-based)

```
src/
  app/                          # cấu hình chung toàn app (Tuần 3)
    store.ts                    # configureStore + RootState + AppDispatch
    hooks.ts                    # useAppSelector / useAppDispatch (typed hooks)
  features/assignments/         # mọi thứ của 1 feature nằm cùng chỗ (Tuần 3)
    assignmentsSlice.ts         # createSlice + createAsyncThunk
    assignmentsSelectors.ts     # createSelector (memoized)
    FilterTabs.tsx              # Compound Components (Tuần 2)
    AssignmentForm.tsx          # dùng useForm<T> (Tuần 2)
    AssignmentList.tsx
    AssignmentItem.tsx
  hooks/                        # custom hooks nâng cao (Tuần 2)
    useForm.ts                  # hook generic quản lý form
    useNow.ts                   # đồng hồ tick theo interval
    useDeadlineInfo.ts          # discriminated union "Còn X ngày / Quá hạn Y ngày"
  types/assignment.ts           # model + utility types (Tuần 1)
  utils/
    date.ts                     # tính số ngày đến hạn
    typeGuards.ts               # type guard `value is T` (Tuần 1)
  api/
    http.ts                     # ApiResponse<T>, Paginated<T>, findById<T extends HasId>
    assignmentsApi.ts           # mock API (delay + lỗi giả lập tuỳ chọn)
```

## Vận dụng kiến thức theo tuần

### Tuần 1 — TypeScript nâng cao

| Kiến thức | Vị trí áp dụng |
|---|---|
| **Generic** `ApiResponse<T>`, `Paginated<T>` | `src/api/http.ts` — bao bọc phản hồi API dùng chung cho mọi kiểu dữ liệu |
| **Generic constraint** `findById<T extends HasId>` | `src/api/http.ts`, dùng trong reducer `toggleAssignment` |
| **Utility types** `Omit`, `Partial`, `Record`, `Readonly` | `CreateAssignmentDto = Omit<Assignment, 'id' \| 'completed'>`, `UpdateAssignmentDto = Partial<…>`, `PRIORITY_THEME: Record<Priority, BadgeTheme>` trong `src/types/assignment.ts` |
| **Mapped type / const assertion** | `PRIORITIES = [...] as const`, `FILTER_LABELS: Readonly<Record<…>>` |
| **Type guard** `value is T` | `src/utils/typeGuards.ts` — `isPriority`, `isAssignmentArray` kiểm tra dữ liệu từ mock API trước khi vào Redux store; dùng trong slice |
| **Discriminated union** | `DeadlineInfo` 3 nhánh `remaining / today / overdue` trong `src/hooks/useDeadlineInfo.ts` — compiler bắt xử lý đủ mọi trường hợp |
| **Strict mode, không `any`** | `tsconfig.json` `strict: true`; toàn bộ source không dùng `any` |

### Tuần 2 — Design Pattern React

| Kiến thức | Vị trí áp dụng |
|---|---|
| **Custom hook nâng cao (generic)** `useForm<T extends Record<string, string>>` | `src/hooks/useForm.ts` — tách toàn bộ logic form (values/errors/handleSubmit/reset) khỏi UI, hàm `validate` tiêm từ ngoài; dùng lại được cho mọi form |
| **Custom hook** `useNow` + `useDeadlineInfo` | `src/hooks/` — đồng hồ tick mỗi phút khiến nhãn ngày tự đổi khi qua nửa đêm, không cần reload |
| **Compound Components** | `src/features/assignments/FilterTabs.tsx` — API khai báo `<FilterTabs><FilterTabs.Tab value="all">Tất cả</FilterTabs.Tab>…</FilterTabs>`, dùng `Context` + `useFilterTabsContext()` throw nếu dùng sai vị trí, gắn con bằng `FilterTabs.Tab = Tab` (đúng khung bài giảng Tabs) |

### Tuần 3 — Redux Toolkit + TypeScript

| Kiến thức | Vị trí áp dụng |
|---|---|
| **Feature-based structure** | `src/app/` + `src/features/assignments/` — mọi thứ của 1 feature nằm cùng chỗ, đúng cấu trúc slide |
| **configureStore + typed store** | `src/app/store.ts` — `RootState = ReturnType<typeof store.getState>`, `AppDispatch = typeof store.dispatch` |
| **Typed hooks** | `src/app/hooks.ts` — component chỉ được dùng `useAppSelector` / `useAppDispatch`, không dùng `useSelector`/`useDispatch` thô |
| **createSlice + PayloadAction<T>** | `src/features/assignments/assignmentsSlice.ts` — `addAssignment(PayloadAction<CreateAssignmentDto>)`, `toggleAssignment`, `removeAssignment`, `setFilter` |
| **createAsyncThunk** | `fetchAssignments = createAsyncThunk<Assignment[], void, { rejectValue: string }>('assignments/fetchAll')` + `extraReducers` đủ pending/fulfilled/rejected, status union `'idle' \| 'loading' \| 'succeeded' \| 'failed'` |
| **createSelector (memoized)** | `src/features/assignments/assignmentsSelectors.ts` — lọc 4 trạng thái + đếm số lượng cho badge |

## Ghi chú demo

- Muốn demo màn hình **lỗi + nút Thử lại**: mở `src/api/assignmentsApi.ts`, đổi `SIMULATE_ERROR = true`.
- Dữ liệu chỉ sống trong bộ nhớ (mock API), refresh trang sẽ nạp lại danh sách mẫu.
