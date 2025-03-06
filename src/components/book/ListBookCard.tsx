import { useState, useEffect } from "react";
import { type Book } from "../../utils/types";
import { useBooks } from "@/hooks/useBooks";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ListBookCard({ book }: { book: Book }) {
  const [currentPageInput, setCurrentPageInput] = useState(
    book.currentPage || 0
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deleteBook, updateProgress, markStatus } = useBooks();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !(e.target as Element).closest(".menu-container") &&
        !(e.target as Element).closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
      {/* Top Action Menu */}
      <div className="absolute top-1.5 right-0 menu-container">
        <button
          className="menu-button text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-2 mt-0 w-32 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center"
              onClick={() => {
                console.log("Edit clicked");
                setIsMenuOpen(false);
              }}
            >
              <FaEdit className="mr-2 text-gray-600" />
              Edit
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-600 flex items-center"
              onClick={() => {
                deleteBook(book.id);
                setIsMenuOpen(false);
              }}
            >
              <MdDelete className="mr-2 text-red-600" />
              Delete
            </button>
          </div>
        )}
      </div>
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
