import { useAppDispatch } from '../../app/hooks';
import { removeAssignment, toggleAssignment } from './assignmentsSlice';
import { PRIORITY_THEME } from '../../types/assignment';
import type { Assignment } from '../../types/assignment';
import { formatDeadline } from '../../utils/date';
import { useDeadlineInfo } from '../../hooks/useDeadlineInfo';
import { Trash2, Clock, BookOpen, Flag } from 'lucide-react';
import { toast } from 'sonner';

interface AssignmentItemProps {
  assignment: Assignment;
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const dispatch = useAppDispatch();
  const info = useDeadlineInfo(assignment.deadline);
  const theme = PRIORITY_THEME[assignment.priority];

  const handleToggle = () => {
    dispatch(toggleAssignment(assignment.id));
    if (assignment.completed) {
      toast.info('Đã đánh dấu chưa hoàn thành', {
        description: assignment.title,
      });
    } else {
      toast.success('Đã hoàn thành bài tập! 🎉', {
        description: assignment.title,
      });
    }
  };

  const handleDelete = () => {
    dispatch(removeAssignment(assignment.id));
    toast.error('Đã xoá bài tập', {
      description: assignment.title,
    });
  };

  return (
    <li
      className={assignment.completed ? 'assignment-card assignment-card--done' : 'assignment-card'}
    >
      <label className="assignment-card__check">
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={handleToggle}
        />
      </label>

      <div className="assignment-card__body">
        <span className="assignment-card__subject">
          <BookOpen size={14} className="assignment-card__subject-icon" />
          {assignment.subject}
        </span>
        <span className="assignment-card__title">{assignment.title}</span>
        <div className="assignment-card__meta">
          <span className={theme.className}>
            <Flag size={12} className="badge__icon" />
            {theme.label}
          </span>
          <span className="assignment-card__deadline">
            <Clock size={14} className="assignment-card__deadline-icon" />
            Hạn nộp: {formatDeadline(assignment.deadline)}
          </span>
        </div>
      </div>

      <div className="assignment-card__side">
        <span className={`due-badge due-badge--${info.kind}`}>{info.label}</span>
        <button
          type="button"
          className="btn btn--danger"
          onClick={handleDelete}
          aria-label="Xoá bài tập"
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>
      </div>
    </li>
  );
}
