import { useState } from "react";

import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "@/hooks/useAuthContext";

function BookForm() {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    totalPages: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "books"), {
      title: formData.title.trim(),
      author: formData.author.trim() || "Unknown author",
      genre: formData.genre.trim(),
      totalPages: parseInt(formData.totalPages),
      currentPage: 0,
      status: "Not Started",
      uid: user?.uid,
      createdAt: serverTimestamp(),
    });

    setFormData({
      title: "",
      author: "",
      genre: "",
      totalPages: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Pages *
          </label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            min="1"
            required
            value={formData.totalPages}
            onChange={(e) =>
              setFormData({ ...formData, totalPages: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Add Book
        </button>
      </div>
    </form>
  );
}

export default BookForm;
