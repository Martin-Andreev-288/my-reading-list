import { DeleteBookFormModal, EditBookFormModal } from "@/components";
import { type CommonBookCardProps } from "@/utils/types";
import { FaBookOpen, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type ListBookCardProps = CommonBookCardProps;

function ListBookCard({
  book,
  progress,
  currentPageInput,
  isUpdating,
  isMenuOpen,
  isEditModalOpen,
  isDeleteModalOpen,
  nextStatusLabel,
  onEdit,
  onDelete,
  onMenuToggle,
  onPageChange,
  onUpdateProgress,
  onMarkStatus,
  onCloseEdit,
  onCloseDelete,
}: ListBookCardProps) {
  return (
    <div className="group bg-white p-6 w-full rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 relative overflow-hidden flex items-center gap-6 h-full">
      {/* Top Action Menu */}
      <div className="absolute top-1.5 right-0 menu-container">
        <button
          className="menu-button text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          onClick={onMenuToggle}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100">
            <button
              className="w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              onClick={() => {
                onEdit();
                onMenuToggle();
              }}
            >
              <FaEdit className="text-gray-500" />
              Edit Book
            </button>
            <button
              className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              onClick={() => {
                onDelete();
                onMenuToggle();
              }}
            >
              <MdDelete className="text-red-600" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900 text-lg truncate">
            {book.title}
          </h3>
          <span
            className={`text-xs px-2.5 py-1 rounded-full ${
              book.status === "Finished"
                ? "bg-green-50 text-green-700 border border-green-100"
                : book.status === "Reading"
                ? "bg-blue-50 text-blue-700 border border-blue-100"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {book.status}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-600 truncate">{book.author}</p>
          <p className="text-xs text-gray-500 font-medium">{book.genre}</p>
          <p className="text-xs text-gray-400">{book.totalPages} pages</p>
        </div>

        {/* Progress Section */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`${
                book.status === "Finished"
                  ? "bg-green-500"
                  : book.status === "Reading"
                  ? "bg-blue-500"
                  : "bg-gray-300"
              } rounded-full h-1.5 transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1.5">
            Page {book.currentPage || 0} • {book.totalPages} total
          </div>
        </div>

        {/* Combined Action Buttons Container */}
        <div className="space-y-2 mt-4 min-h-[76px] flex flex-col justify-end">
          {(book.status === "Reading" || book.status === "Not Started") && (
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max={book.totalPages}
                value={currentPageInput}
                className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
                onClick={onUpdateProgress}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Update"}
              </button>
            </div>
          )}

          {/* Mark Status Button - Now placed here */}
          <button
            className="w-full py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition-colors"
            onClick={onMarkStatus}
            disabled={isUpdating}
          >
            Mark as {nextStatusLabel}
          </button>
        </div>
      </div>

      {/* Book Cover Placeholder - Right side */}
      <div className="mb-4 relative h-64 w-48 bg-gray-50 rounded-lg overflow-hidden">
        {book.imageURL ? (
          <img
            src={book.imageURL}
            alt={`Cover of ${book.title}`}
            className="w-48 h-64 object-fit"
            onError={(e) => {
              // Fallback to default if image fails to load
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="relative h-64 w-48 bg-gray-50 rounded-lg overflow-hidden shrink-0">
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <FaBookOpen className="w-12 h-12" />
            </div>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <EditBookFormModal book={book} onClose={onCloseEdit} />
      )}
      {isDeleteModalOpen && (
        <DeleteBookFormModal book={book} onClose={onCloseDelete} />
      )}
    </div>
  );
}

export default ListBookCard;
