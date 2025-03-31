import { type Book } from "@/utils/types";
import { useMemo, useState } from "react";
import { NoMatchingBooks, BookControls, CardsContainer } from "@/components";
import { Button } from "../ui/button";
import { LayoutGrid, List } from "lucide-react";

type BookListProps = {
  books: Book[];
};

function BookList({ books }: BookListProps) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
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

    // Search filter by titlem author, or genre
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredBooks = filteredBooks.filter((book) => {
        const searchString = [
          book.title.toLowerCase(),
          book.author.toLowerCase(),
          book.genre.toLowerCase(),
        ].join(" ");

        return searchString.includes(query);
      });
    }

    return filteredBooks;
  }, [books, sortBy, filterBy, searchQuery]);

  return (
    <div className="pt-4 pb-4">
      <BookControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />

      <div className="flex justify-end w-28 mb-4 gap-2 backdrop-blur-sm p-2 pr-3 rounded-full bg-white/50 shadow-sm ml-auto">
        <Button
          onClick={() => setLayout("grid")}
          variant={layout === "grid" ? "default" : "ghost"}
          size="icon"
          className="relative group hover:bg-purple-100 transition-colors"
        >
          <LayoutGrid className="w-5 h-5" />
          {layout === "grid" && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-purple-600 rounded-full" />
          )}
        </Button>
        <Button
          onClick={() => setLayout("list")}
          variant={layout === "list" ? "default" : "ghost"}
          size="icon"
          className="relative group hover:bg-purple-100 transition-colors"
        >
          <List className="w-5 h-5" />
          {layout === "list" && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-purple-600 rounded-full" />
          )}
        </Button>
      </div>

      {processedBooks.length === 0 ? (
        <NoMatchingBooks />
      ) : (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center"
              : "flex flex-col items-center space-y-4"
          }
        >
          {processedBooks.map((book) => (
            <CardsContainer
              key={book.id}
              book={book}
              variant={layout === "grid" ? "grid" : "list"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
