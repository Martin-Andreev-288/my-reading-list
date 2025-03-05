import { useState } from "react";
import BookInputField from "./BookInputField";

import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "@/hooks/useAuthContext";

function BookForm() {
  const { user } = useAuthContext();
  const MAX_PAGES = 10000;

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

  const handleTotalPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 0;

    if (value < 1) value = 1;
    if (value > MAX_PAGES) value = MAX_PAGES;

    setFormData({ ...formData, totalPages: value.toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4">
      <h2 className="text-center">Add New Book:</h2>
      <div className="space-y-4 pt-3">
        <BookInputField
          label="Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <BookInputField
          label="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />

        <BookInputField
          label="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />

        <BookInputField
          label="Total Pages"
          type="number"
          required
          value={formData.totalPages}
          onChange={handleTotalPagesChange}
        />

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
