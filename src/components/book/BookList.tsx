import { type Book } from "../../utils/types";
import { useMemo, useState } from "react";
import GridBookCard from "./GridBookCard";
import ListBookCard from "./ListBookCard";
import BookControls from "./BookControls";

type BookListProps = {
  books: Book[];
};

function BookList({ books }: BookListProps) {
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState<"a-z" | "z-a">("a-z");
  const [filterBy, setFilterBy] = useState<
    "all" | "not-started" | "reading" | "finished"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const processedBooks = useMemo(() => {
    // Create a copy to avoid mutating original array
    let filteredBooks = [...books];

    // Alphabetical sorting:
    filteredBooks.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortBy === "a-z"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    // Status filtering:
    if (filterBy !== "all") {
      filteredBooks = filteredBooks.filter((book) => {
        if (filterBy === "not-started") return book.status === "Not Started";
        if (filterBy === "reading") return book.status === "Reading";
        return book.status === "Finished";
      });
    }

    // Search filter by title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(query)
      );
    }

    return filteredBooks;
  }, [books, sortBy, filterBy, searchQuery]);

  return (
    <div className="p-4">
      <BookControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="bg-purple-100 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
        >
          {isGridView ? "Switch to List" : "Switch to Grid"}
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {processedBooks.map((book) => (
            <GridBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {processedBooks.map((book) => (
            <ListBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
