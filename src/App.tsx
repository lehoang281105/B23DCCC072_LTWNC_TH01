import { useAppSelector } from './app/hooks';
import { selectFilterCounts } from './features/assignments/assignmentsSelectors';
import AssignmentForm from './features/assignments/AssignmentForm';
import AssignmentList from './features/assignments/AssignmentList';
import FilterTabs from './features/assignments/FilterTabs';
import { FILTER_LABELS } from './types/assignment';
import { ListTodo, Calendar, AlertCircle, CheckCircle2, LayoutList, Circle, AlertTriangle } from 'lucide-react';

function StatCard({ label, value, tone, icon: Icon }: { label: string; value: number; tone: string; icon: React.ElementType }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <Icon className="stat-card__icon" size={20} strokeWidth={2} />
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
        <StatCard label="Tổng bài tập" value={counts.all} tone="all" icon={ListTodo} />
        <StatCard label={FILTER_LABELS.incomplete} value={counts.incomplete} tone="incomplete" icon={Calendar} />
        <StatCard label={FILTER_LABELS.overdue} value={counts.overdue} tone="overdue" icon={AlertCircle} />
        <StatCard label={FILTER_LABELS.completed} value={counts.completed} tone="completed" icon={CheckCircle2} />
      </section>

      <main className="page__main">
        <section className="panel">
          <h2>Thêm bài tập mới</h2>
          <AssignmentForm />
        </section>

        <section className="panel">
          <h2>Danh sách bài tập</h2>
          <FilterTabs>
            <FilterTabs.Tab value="all" icon={LayoutList}>{FILTER_LABELS.all}</FilterTabs.Tab>
            <FilterTabs.Tab value="incomplete" icon={Circle}>{FILTER_LABELS.incomplete}</FilterTabs.Tab>
            <FilterTabs.Tab value="overdue" icon={AlertTriangle}>{FILTER_LABELS.overdue}</FilterTabs.Tab>
            <FilterTabs.Tab value="completed" icon={CheckCircle2}>{FILTER_LABELS.completed}</FilterTabs.Tab>
          </FilterTabs>
          <AssignmentList />
        </section>
      </main>

      <footer className="page__footer">
       Lập trình Web Nâng Cao — TypeScript nâng cao · React Design Patterns · Redux Toolkit
      </footer>
    </div>
  );
}
