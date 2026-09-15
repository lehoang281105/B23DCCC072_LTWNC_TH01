import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAssignments } from './assignmentsSlice';
import { selectError, selectStatus, selectVisibleAssignments } from './assignmentsSelectors';
import AssignmentItem from './AssignmentItem';

function SkeletonList() {
  return (
    <ul className="assignment-list" aria-busy="true" aria-label="Đang tải danh sách">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="assignment-card assignment-card--skeleton">
          <div className="skeleton skeleton--check" />
          <div className="assignment-card__body">
            <div className="skeleton skeleton--subject" />
            <div className="skeleton skeleton--title" />
          </div>
          <div className="skeleton skeleton--badge" />
        </li>
      ))}
    </ul>
  );
}

export default function AssignmentList() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const assignments = useAppSelector(selectVisibleAssignments);

  // Yêu cầu #7 — gọi API giả lập đúng 1 lần khi khởi động app
  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchAssignments());
    }
  }, [status, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <SkeletonList />;
  }

  if (status === 'failed') {
    return (
      <div className="banner banner--error" role="alert">
        <span>Không tải được danh sách bài tập: {error}</span>
        <button type="button" className="btn btn--primary" onClick={() => void dispatch(fetchAssignments())}>
          Thử lại
        </button>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="banner banner--empty">
        Không có bài tập nào trong mục này. Thêm bài tập mới ở form phía trên nhé!
      </div>
    );
  }

  return (
    <ul className="assignment-list">
      {assignments.map((assignment) => (
        <AssignmentItem key={assignment.id} assignment={assignment} />
      ))}
    </ul>
  );
}
