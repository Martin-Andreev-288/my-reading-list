import { type Book } from "../../utils/types";
import { useState } from "react";
import GridBookCard from "./GridBookCard";
import ListBookCard from "./ListBookCard";

type BookListProps = {
  books: Book[];
};

function BookList({ books }: BookListProps) {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="bg-purple-100 px-4 py-2 rounded-lg"
        >
          {isGridView ? "Switch to List" : "Switch to Grid"}
        </button>
      </div>
      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {books.map((book) => (
            <GridBookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {" "}
          {books.map((book) => (
            <ListBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
