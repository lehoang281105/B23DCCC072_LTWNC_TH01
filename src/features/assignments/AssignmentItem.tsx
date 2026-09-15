/**
 * Một dòng bài tập — Yêu cầu #1, #3, #4, #6.
 * Nhãn ngày đến hạn lấy từ custom hook useDeadlineInfo (discriminated union).
 */
import { useAppDispatch } from '../../app/hooks';
import { removeAssignment, toggleAssignment } from './assignmentsSlice';
import { PRIORITY_THEME } from '../../types/assignment';
import type { Assignment } from '../../types/assignment';
import { formatDeadline } from '../../utils/date';
import { useDeadlineInfo } from '../../hooks/useDeadlineInfo';

interface AssignmentItemProps {
  assignment: Assignment;
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const dispatch = useAppDispatch();
  const info = useDeadlineInfo(assignment.deadline);
  const theme = PRIORITY_THEME[assignment.priority];

  return (
    <li
      className={assignment.completed ? 'assignment-card assignment-card--done' : 'assignment-card'}
    >
      <label className="assignment-card__check">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() => dispatch(toggleAssignment(assignment.id))}
        />
      </label>

      <div className="assignment-card__body">
        <span className="assignment-card__subject">{assignment.subject}</span>
        <span className="assignment-card__title">{assignment.title}</span>
        <div className="assignment-card__meta">
          <span className={theme.className}>{theme.label}</span>
          <span className="assignment-card__deadline">
            Hạn nộp: {formatDeadline(assignment.deadline)}
          </span>
        </div>
      </div>

      <div className="assignment-card__side">
        <span className={`due-badge due-badge--${info.kind}`}>{info.label}</span>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => dispatch(removeAssignment(assignment.id))}
        >
          Xoá
        </button>
      </div>
    </li>
  );
}
