import { useState } from "react";
import { type Book } from "../../utils/types";
import { toast } from "sonner";
import { db } from "@/firebase/config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

function GridBookCard({ book }: { book: Book }) {
  const [currentPageInput, setCurrentPageInput] = useState(
    book.currentPage || 0
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProgress = async (newPage: number) => {
    try {
      setIsUpdating(true);
      const bookRef = doc(db, "books", book.id);

      // Determine new status based on pages
      let newStatus: Book["status"] = "Reading";
      if (newPage === 0) newStatus = "Not Started";
      if (newPage >= book.totalPages) newStatus = "Finished";

      await updateDoc(bookRef, {
        currentPage: newPage,
        status: newStatus,
      });

      toast.success("Progress updated successfully!");
    } catch (error) {
      toast.error("Failed to update progress");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ref = doc(db, "books", id);

    toast.success("Book deleted successfully!");
    await deleteDoc(ref);
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

  const handleMarkStatus = async () => {
    try {
      const bookRef = doc(db, "books", book.id);
      let newStatus: Book["status"];
      let newPage: number;

      switch (book.status) {
        case "Not Started":
          newStatus = "Reading";
          newPage = 1;
          break;
        case "Reading":
          newStatus = "Finished";
          newPage = book.totalPages;
          break;
        case "Finished":
          newStatus = "Not Started";
          newPage = 0;
          break;
        default:
          newStatus = "Not Started";
          newPage = 0;
      }

      await updateDoc(bookRef, {
        status: newStatus,
        currentPage: newPage,
      });

      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const progress =
    book.status === "Finished"
      ? 100
      : book.currentPage
      ? Math.round((book.currentPage / book.totalPages) * 100)
      : 0;

  return (
    <div className="bg-white p-7 min-h-64 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
        onClick={() => handleDelete(book.id)}
      >
        ×
      </button>

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg truncate">{book.title}</h3>
        <span
          className={`text-sm px-1.5 py-1 rounded-full ${
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
      <p className="text-sm text-purple-600 mb-3">{book.genre}</p>

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

      <div className="flex flex-col items-center gap-2 mt-4 flex-wrap">
        {(book.status === "Reading" || book.status === "Not Started") && (
          <div className="flex items-center gap-2">
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
              onClick={() => handleUpdateProgress(currentPageInput)}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        )}
        <button
          className="text-sm bg-purple-100 px-3 py-1 mt-2 rounded hover:bg-purple-200 disabled:opacity-50"
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
