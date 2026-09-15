import { useAppSelector } from './app/hooks';
import { selectFilterCounts } from './features/assignments/assignmentsSelectors';
import AssignmentForm from './features/assignments/AssignmentForm';
import AssignmentList from './features/assignments/AssignmentList';
import FilterTabs from './features/assignments/FilterTabs';
import { FILTER_LABELS } from './types/assignment';

function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

export default function App() {
  const counts = useAppSelector(selectFilterCounts);

  return (
    <div className="page">
      <header className="page__header">
        <h1>
          <span aria-hidden="true">📅</span> Student Deadline Tracker
        </h1>
        <p>Theo dõi deadline bài tập cá nhân — không bỏ lỡ, không nộp trễ</p>
      </header>

      <section className="stats" aria-label="Thống kê">
        <StatCard label="Tổng bài tập" value={counts.all} tone="all" />
        <StatCard label={FILTER_LABELS.incomplete} value={counts.incomplete} tone="incomplete" />
        <StatCard label={FILTER_LABELS.overdue} value={counts.overdue} tone="overdue" />
        <StatCard label={FILTER_LABELS.completed} value={counts.completed} tone="completed" />
      </section>

      <main className="page__main">
        <section className="panel">
          <h2>Thêm bài tập mới</h2>
          <AssignmentForm />
        </section>

        <section className="panel">
          <h2>Danh sách bài tập</h2>
          <FilterTabs>
            <FilterTabs.Tab value="all">{FILTER_LABELS.all}</FilterTabs.Tab>
            <FilterTabs.Tab value="incomplete">{FILTER_LABELS.incomplete}</FilterTabs.Tab>
            <FilterTabs.Tab value="overdue">{FILTER_LABELS.overdue}</FilterTabs.Tab>
            <FilterTabs.Tab value="completed">{FILTER_LABELS.completed}</FilterTabs.Tab>
          </FilterTabs>
          <AssignmentList />
        </section>
      </main>

      <footer className="page__footer">
        Đồ án Lập trình Web Nâng Cao — TypeScript nâng cao · React Design Patterns · Redux Toolkit
      </footer>
    </div>
  );
}
