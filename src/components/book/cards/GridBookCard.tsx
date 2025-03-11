import { EditBookFormModal } from "@/components";
import { type CommonBookCardProps } from "@/utils/types";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type GridBookCardProps = CommonBookCardProps;

const GridBookCard = ({
  book,
  progress,
  currentPageInput,
  isUpdating,
  isMenuOpen,
  isEditModalOpen,
  nextStatusLabel,
  onEdit,
  onDelete,
  onMenuToggle,
  onPageChange,
  onUpdateProgress,
  onMarkStatus,
  onCloseEdit,
}: GridBookCardProps) => {
  return (
    <div className="bg-white p-7 min-h-80 rounded-lg shadow-md hover:shadow-lg transition-shadow relative flex flex-col">
      {/* Top Action Menu */}
      <div className="absolute top-1.5 right-0 menu-container">
        <button
          className="menu-button text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          onClick={onMenuToggle}
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
                onEdit();
                onMenuToggle();
              }}
            >
              <FaEdit className="mr-2 text-gray-600" />
              Edit
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-red-600 flex items-center"
              onClick={() => {
                onDelete();
                onMenuToggle();
              }}
            >
              <MdDelete className="mr-2 text-red-600" />
              Delete
            </button>
          </div>
        )}
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
                onPageChange(value);
              }}
              disabled={isUpdating}
            />
            <button
              className="text-sm bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 disabled:opacity-50"
              onClick={onUpdateProgress}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Page"}
            </button>
          </div>
        )}

        <button
          className="text-sm bg-purple-100 px-3 py-1.5 rounded hover:bg-purple-200 disabled:opacity-50"
          onClick={onMarkStatus}
          disabled={isUpdating}
        >
          Mark as {nextStatusLabel}
        </button>
      </div>

      {isEditModalOpen && (
        <EditBookFormModal book={book} onClose={onCloseEdit} />
      )}
    </div>
  );
};

export default GridBookCard;
