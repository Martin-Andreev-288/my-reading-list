import { useState } from "react";
import { type Book } from "../../utils/types";
import { useBooks } from "@/hooks/useBooks";
import { FaEdit } from "react-icons/fa";

function GridBookCard({ book }: { book: Book }) {
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
    <div className="bg-white p-7 min-h-64 rounded-lg shadow-md hover:shadow-lg transition-shadow relative flex flex-col">
      {/* Top Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="text-gray-400 hover:text-blue-600 transition-colors"
          onClick={() => console.log("Edit clicked")}
        >
          <FaEdit />
        </button>
        <button
          className="text-gray-400 hover:text-red-600 transition-colors"
          onClick={() => deleteBook(book.id)}
        >
          ×
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-grow mt-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-lg truncate flex-grow">{book.title}</h3>
          <span
            className={`text-sm px-2 py-1 rounded-full whitespace-nowrap ${
              book.status === "Finished"
                ? "bg-green-100 text-green-800"
                : book.status === "Reading"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.status}
          </span>
        </div>

        <p className="text-gray-600 truncate">{book.author}</p>
        <p className="text-sm text-purple-600">{book.genre}</p>
        <p className="text-gray-500 mb-3">{book.totalPages} pages</p>

        <div className="mb-3">
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
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center mt-auto pt-4">
        {(book.status === "Reading" || book.status === "Not Started") && (
          <div className="flex items-center gap-2 mb-3">
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
              className="text-sm bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
              onClick={handleUpdateProgress}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Page"}
            </button>
          </div>
        )}

        <button
          className="text-sm bg-purple-100 px-3 py-1.5 rounded hover:bg-purple-200 disabled:opacity-50"
          onClick={handleMarkStatus}
          disabled={isUpdating}
        >
          Mark as {getNextStatus()}
        </button>
      </div>
    </div>
  );
}

export default GridBookCard;
