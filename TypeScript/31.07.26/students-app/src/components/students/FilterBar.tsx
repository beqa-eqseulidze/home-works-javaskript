import { useStudents } from "../../context/StudentsContext";
import { Department, Grade, Status, SortField, SortOrder } from "../../types/student.types";

export function FilterBar() {
  const { filter, sort, setFilter, setSort } = useStudents();

  const selectClass =
    "bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all duration-200 cursor-pointer";

  const handleSortFieldChange = (field: SortField) => {
    if (sort.field === field) {
      setSort({
        field,
        order: sort.order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      });
    } else {
      setSort({ field, order: SortOrder.Asc });
    }
  };

  const sortButtons: { field: SortField; label: string }[] = [
    { field: SortField.Name, label: "სახელი" },
    { field: SortField.GPA, label: "GPA" },
    { field: SortField.Age, label: "ასაკი" },
    { field: SortField.Grade, label: "შეფასება" },
  ];

  return (
    <div className="bg-white/3 backdrop-blur-sm border border-white/8 rounded-2xl p-5 space-y-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>
        <input
          type="text"
          placeholder="ძებნა სახელით, გვარით, ელ-ფოსტით..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all duration-200"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Department */}
        <select
          className={selectClass}
          value={filter.department}
          onChange={(e) =>
            setFilter({ department: e.target.value as Department | "" })
          }
        >
          <option value="">ყველა ფაკულტეტი</option>
          {Object.values(Department).map((dept) => (
            <option key={dept} value={dept} className="bg-gray-900">
              {dept}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          className={selectClass}
          value={filter.status}
          onChange={(e) =>
            setFilter({ status: e.target.value as Status | "" })
          }
        >
          <option value="">ყველა სტატუსი</option>
          {Object.values(Status).map((s) => (
            <option key={s} value={s} className="bg-gray-900">
              {s}
            </option>
          ))}
        </select>

        {/* Grade */}
        <select
          className={selectClass}
          value={filter.grade}
          onChange={(e) =>
            setFilter({ grade: e.target.value as Grade | "" })
          }
        >
          <option value="">ყველა შეფასება</option>
          {Object.values(Grade).map((g) => (
            <option key={g} value={g} className="bg-gray-900">
              {g}
            </option>
          ))}
        </select>

        {/* GPA Range */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <span className="text-gray-400 text-xs whitespace-nowrap">GPA:</span>
          <input
            type="number"
            min={0}
            max={4}
            step={0.1}
            className="w-12 bg-transparent text-white text-xs outline-none"
            value={filter.minGpa}
            onChange={(e) =>
              setFilter({ minGpa: parseFloat(e.target.value) || 0 })
            }
          />
          <span className="text-gray-500 text-xs">-</span>
          <input
            type="number"
            min={0}
            max={4}
            step={0.1}
            className="w-12 bg-transparent text-white text-xs outline-none"
            value={filter.maxGpa}
            onChange={(e) =>
              setFilter({ maxGpa: parseFloat(e.target.value) || 4 })
            }
          />
        </div>
      </div>

      {/* Sort Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-gray-400 text-xs font-medium">სორტირება:</span>
        {sortButtons.map(({ field, label }) => (
          <button
            key={field}
            onClick={() => handleSortFieldChange(field)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              sort.field === field
                ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            {label}
            {sort.field === field && (
              <span>{sort.order === SortOrder.Asc ? "↑" : "↓"}</span>
            )}
          </button>
        ))}

        {/* Reset button */}
        <button
          onClick={() => {
            setFilter({
              search: "",
              department: "",
              status: "",
              grade: "",
              minGpa: 0,
              maxGpa: 4,
            });
          }}
          className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          გაწმენდა ✕
        </button>
      </div>
    </div>
  );
}
