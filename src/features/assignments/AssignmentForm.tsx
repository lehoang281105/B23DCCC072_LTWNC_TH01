import { useAppDispatch } from '../../app/hooks';
import { addAssignment } from './assignmentsSlice';
import { useForm } from '../../hooks/useForm';
import type { FormErrors } from '../../hooks/useForm';
import { PRIORITIES, PRIORITY_THEME } from '../../types/assignment';
import type { CreateAssignmentDto, Priority } from '../../types/assignment';
import { todayIso } from '../../utils/date';

// type alias (không phải interface) để có index signature ngầm,
// thoả mãn ràng buộc T extends Record<string, string> của useForm<T>
type AssignmentFormValues = {
  subject: string;
  title: string;
  deadline: string;
  priority: Priority;
};

const INITIAL_VALUES: AssignmentFormValues = {
  subject: '',
  title: '',
  deadline: '',
  priority: 'medium',
};

function validate(values: AssignmentFormValues): FormErrors<AssignmentFormValues> {
  const errors: FormErrors<AssignmentFormValues> = {};
  if (!values.subject.trim()) {
    errors.subject = 'Nhập môn học';
  }
  if (!values.title.trim()) {
    errors.title = 'Nhập tên bài tập';
  }
  if (!values.deadline) {
    errors.deadline = 'Chọn hạn nộp';
  } else if (values.deadline < todayIso()) {
    errors.deadline = 'Hạn nộp đã qua';
  }
  return errors;
}

export default function AssignmentForm() {
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, handleSubmit, reset } = useForm(INITIAL_VALUES, validate);

  const submit = handleSubmit((validValues: AssignmentFormValues) => {
    const dto: CreateAssignmentDto = {
      subject: validValues.subject.trim(),
      title: validValues.title.trim(),
      deadline: validValues.deadline,
      priority: validValues.priority,
    };
    dispatch(addAssignment(dto));
    reset();
  });

  return (
    <form className="assignment-form" onSubmit={submit} noValidate aria-label="Thêm bài tập mới">
      <div className="assignment-form__grid">
        <div className="form-field">
          <label htmlFor="subject">Môn học</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="vd: Lập trình Web Nâng Cao"
            value={values.subject}
            onChange={handleChange}
          />
          {/* span luôn render để giữ chiều cao field ổn định khi có/không lỗi */}
          <span className="form-field__error">{errors.subject ?? ''}</span>
        </div>

        <div className="form-field">
          <label htmlFor="title">Tên bài tập</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="vd: Bài tập Tuần 4 — Zustand"
            value={values.title}
            onChange={handleChange}
          />
          <span className="form-field__error">{errors.title ?? ''}</span>
        </div>

        <div className="form-field">
          <label htmlFor="deadline">Hạn nộp</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            min={todayIso()}
            value={values.deadline}
            onChange={handleChange}
          />
          <span className="form-field__error">{errors.deadline ?? ''}</span>
        </div>

        <div className="form-field">
          <label htmlFor="priority">Độ ưu tiên</label>
          <select id="priority" name="priority" value={values.priority} onChange={handleChange}>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_THEME[priority].label}
              </option>
            ))}
          </select>
          <span className="form-field__error">{errors.priority ?? ''}</span>
        </div>

        <div className="form-field form-field--submit">
          <button type="submit" className="btn btn--primary">
            + Thêm bài tập
          </button>
        </div>
      </div>
    </form>
  );
}
