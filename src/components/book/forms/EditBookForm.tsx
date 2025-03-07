import { useState, useEffect } from "react";
import { BookInputField } from "@/components";
import { useBooks } from "@/serviceHooks/useBooks";
import type { Book } from "@/utils/types";

type EditBookFormProps = {
  book: Book;
  onSuccess?: () => void;
};

function EditBookForm({ book, onSuccess }: EditBookFormProps) {
  const MAX_PAGES = 10000;
  const { updateBook } = useBooks();

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    totalPages: book.totalPages.toString(),
  });

  useEffect(() => {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      totalPages: book.totalPages.toString(),
    });
  }, [book]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updates = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      totalPages: parseInt(formData.totalPages),
    };

    const success = await updateBook(book.id, updates);
    if (success) onSuccess?.();
  };

  const handleTotalPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 0;
    value = Math.max(1, Math.min(value, MAX_PAGES));
    setFormData({ ...formData, totalPages: value.toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-center font-semibold">Edit Book Details</h2>
      <div className="space-y-4">
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
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditBookForm;
