import { useState } from "react";
import BookInputField from "./BookInputField";
import { useBooks } from "@/serviceHooks/useBooks";

type AddBookFormProps = {
  onSuccess?: () => void;
};

function AddBookForm({ onSuccess }: AddBookFormProps) {
  const MAX_PAGES = 10000;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    totalPages: "",
  });

  const { addBook } = useBooks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await addBook(formData);
    if (success) {
      setFormData({ title: "", author: "", genre: "", totalPages: "" });
      onSuccess?.();
    }
  };

  const handleTotalPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value) || 0;

    if (value < 1) value = 1;
    if (value > MAX_PAGES) value = MAX_PAGES;

    setFormData({ ...formData, totalPages: value.toString() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-center font-semibold">
        Fill in the Book Details Below:
      </h2>
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
          className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Add Book
        </button>
      </div>
    </form>
  );
}

export default AddBookForm;
