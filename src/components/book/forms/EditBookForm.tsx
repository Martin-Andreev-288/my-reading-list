import { useState, useEffect } from "react";
import { BookInputField } from "@/components";
import { useBooks } from "@/serviceHooks/useBooks";
import type { Book } from "@/utils/types";
import { toast } from "sonner";

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
    coverInput: book.imageURL,
  });

  useEffect(() => {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      totalPages: book.totalPages.toString(),
      coverInput: book.imageURL,
    });
  }, [book]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updates = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      totalPages: parseInt(formData.totalPages),
      imageURL: formData.coverInput?.trim(),
    };

    const hasChanges =
      updates.title !== book.title ||
      updates.author !== book.author ||
      updates.genre !== book.genre ||
      updates.totalPages !== book.totalPages ||
      updates.imageURL !== book.imageURL;

    if (!hasChanges) {
      toast.error("No changes detected");
      return;
    }

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

        <BookInputField
          label="Cover Image (ISBN or URL)"
          placeholder="Enter ISBN or paste image URL"
          onChange={(e) =>
            setFormData({ ...formData, coverInput: e.target.value })
          }
          tooltip="Find ISBN on book's back cover or online retailers/google OR paste direct image URL."
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
