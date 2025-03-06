import { useState } from "react";
import { type Book } from "../../utils/types";
import { useBooks } from "@/hooks/useBooks";

function ListBookCard({ book }: { book: Book }) {
  const [currentPageInput, setCurrentPageInput] = useState(
    book.currentPage || 0
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { deleteBook, updateProgress, markStatus } = useBooks();

  const handleUpdateProgress = async () => {
    setIsUpdating(true);
    try {
      await updateProgress(book.id, currentPageInput, book.totalPages);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkStatus = async () => {
    setIsUpdating(true);
    try {
      await markStatus(book.id, book.status, book.totalPages);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (): Book["status"] => {
    switch (book.status) {
      case "Not Started":
        return "Reading";
      case "Reading":
        return "Finished";
      case "Finished":
        return "Not Started";
      default:
        return "Not Started";
    }
  };

  const progress =
    book.status === "Finished"
      ? 100
      : book.currentPage
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : 0;

  return (
    <div className="bg-white p-6 w-full max-w-3xl rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between relative">
      {/* Delete Button */}
      <button
        className="absolute top-1 right-1.5 text-gray-400 hover:text-red-600"
        onClick={() => deleteBook(book.id)}
      >
        ×
      </button>
      <span
        className={`absolute top-6 right-8 text-sm px-2 py-1 rounded-full ${
          book.status === "Finished"
            ? "bg-green-100"
            : book.status === "Reading"
            ? "bg-yellow-100"
            : "bg-red-100"
        }`}
      >
        {book.status}
      </span>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-lg">{book.title}</h3>
        </div>

        <div className="flex gap-4 text-sm">
          <p className="text-gray-600">{book.author}</p>
          <p className="text-purple-600">{book.genre}</p>
          <p className="text-gray-500">{book.totalPages} pages</p>
        </div>

        <div className="m-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 rounded-full h-2"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Progress: {progress}%</span>
            <span>
              Page {book.currentPage || 0} of {book.totalPages}
            </span>
          </div>
        </div>

        {(book.status === "Reading" || book.status === "Not Started") && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min="0"
              max={book.totalPages}
              value={currentPageInput}
              className="w-20 px-2 py-1 border rounded"
              onChange={(e) => {
                const value = Math.min(
                  book.totalPages,
                  Math.max(0, parseInt(e.target.value) || 0)
                );
                setCurrentPageInput(value);
              }}
              disabled={isUpdating}
            />
            <button
              className="text-sm bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
              onClick={handleUpdateProgress}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating Page..." : "Update Page"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-4">
        <button
          className="text-sm bg-purple-100 px-3 py-1 rounded hover:bg-purple-200"
          onClick={handleMarkStatus}
          disabled={isUpdating}
        >
          Mark as {getNextStatus()}
        </button>
      </div>
    </div>
  );
}

export default ListBookCard;
