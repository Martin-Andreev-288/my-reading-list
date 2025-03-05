import { type Book } from "../../utils/types";
import { toast } from "sonner";

import { db } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

// List Card Component
function ListBookCard({ book }: { book: Book }) {
  const handleClick = async (id: string) => {
    const ref = doc(db, "books", id);

    toast("Book deleted successfully!");
    await deleteDoc(ref);
  };

  return (
    <div className="bg-white p-6 max-w-3xl rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between relative">
      {/* Delete Button */}
      <button
        className="absolute top-1 right-1.5 text-gray-400 hover:text-red-600"
        onClick={() => handleClick(book.id)}
      >
        ×
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              book.status === "Finished"
                ? "bg-green-100"
                : book.status === "Reading"
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            {book.status}
          </span>
        </div>

        <div className="flex gap-4 text-sm">
          <p className="text-gray-600">{book.author}</p>
          <p className="text-purple-600">{book.genre}</p>
          <p className="text-gray-500">{book.totalPages} pages</p>
        </div>

        {(book.status === "Reading" || book.status === "Not Started") && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min="0"
              max={book.totalPages}
              value={book.currentPage || 0}
              className="w-20 px-2 py-1 border rounded"
              onChange={(e) => {
                const value = Math.min(
                  book.totalPages,
                  Math.max(0, parseInt(e.target.value) || 0)
                );
                console.log("Update progress:", value);
              }}
            />
            <button
              className="text-sm bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
              onClick={() => console.log("Save page update")}
            >
              Set Page
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-4">
        <button className="text-sm bg-purple-100 px-3 py-1 rounded hover:bg-purple-200">
          {book.status === "Reading" ? "Mark Finished" : "Start Reading"}
        </button>
      </div>
    </div>
  );
}

export default ListBookCard;
