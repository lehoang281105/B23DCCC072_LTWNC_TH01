import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilter } from './assignmentsSlice';
import { selectFilter, selectFilterCounts } from './assignmentsSelectors';
import type { FilterCounts } from './assignmentsSelectors';
import type { AssignmentFilter } from '../../types/assignment';

interface FilterTabsContextType {
  active: AssignmentFilter;
  select: (filter: AssignmentFilter) => void;
  counts: FilterCounts;
}

const FilterTabsContext = createContext<FilterTabsContextType | null>(null);

/** Hook nội bộ chỉ dùng trong component con của FilterTabs */
function useFilterTabsContext(): FilterTabsContextType {
  const ctx = useContext(FilterTabsContext);
  if (!ctx) {
    throw new Error('<FilterTabs.Tab> chỉ được dùng bên trong <FilterTabs>.');
  }
  return ctx;
}

function FilterTabs({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const active = useAppSelector(selectFilter);
  const counts = useAppSelector(selectFilterCounts);

  const contextValue: FilterTabsContextType = {
    active,
    select: (filter) => dispatch(setFilter(filter)),
    counts,
  };

  return (
    <div className="filter-tabs" role="tablist" aria-label="Lọc theo trạng thái">
      <FilterTabsContext.Provider value={contextValue}>{children}</FilterTabsContext.Provider>
    </div>
  );
}

function Tab({ value, children }: { value: AssignmentFilter; children?: ReactNode }) {
  const { active, select, counts } = useFilterTabsContext();
  const isActive = active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={isActive ? 'filter-tab filter-tab--active' : 'filter-tab'}
      onClick={() => select(value)}
    >
      <span className="filter-tab__label">{children}</span>
      <span className="filter-tab__count">{counts[value]}</span>
    </button>
  );
}

// Gắn component con lên parent — cú pháp compound như slide: Tabs.Tab = Tab
FilterTabs.Tab = Tab;

export default FilterTabs;
