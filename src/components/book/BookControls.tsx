import { Search } from "lucide-react";

type BookControlsProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchApply: () => void;
  onSortChange: (sortBy: "a-z" | "z-a") => void;
  onFilterChange: (
    filterBy: "all" | "not-started" | "reading" | "finished"
  ) => void;
};

function BookControls({
  searchQuery,
  onSearchChange,
  onSearchApply,
  onSortChange,
  onFilterChange,
}: BookControlsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
      {/* Search Input */}
      <div className="flex-1">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search Books
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            placeholder="Search by title, author, or genre..."
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearchApply();
              }
            }}
          />
          <button
            onClick={onSearchApply}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="min-w-[200px]">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Sort By
        </label>
        <select
          id="sort"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          onChange={(e) => onSortChange(e.target.value as "a-z" | "z-a")}
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>

      {/* Filter Dropdown */}
      <div className="min-w-[200px]">
        <label
          htmlFor="filter"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter By Status
        </label>
        <select
          id="filter"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          onChange={(e) =>
            onFilterChange(
              e.target.value as "all" | "not-started" | "reading" | "finished"
            )
          }
        >
          <option value="all">All Books</option>
          <option value="not-started">Not Started</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>
      </div>
    </div>
  );
}

export default BookControls;
