import { useState } from "react";
import { BookInputField } from "@/components";
import { useBooks } from "@/serviceHooks/useBooks";
import { isURL, validateOpenLibraryISBN } from "@/utils/helpers";
import { toast } from "sonner";

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
    coverInput: "", // Combined field for ISBN/URL
  });

  const { addBook } = useBooks();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Generate appropriate image URL
    const imageURL = formData.coverInput
      ? isURL(formData.coverInput)
        ? formData.coverInput.trim()
        : `https://covers.openlibrary.org/b/isbn/${formData.coverInput.trim()}-L.jpg`
      : "";

    if (
      imageURL.startsWith("https://covers.openlibrary.org") &&
      !validateOpenLibraryISBN(imageURL)
    ) {
      toast.error(
        "Invalid URL (must start with 'https://') or ISBN format (must be 10 or 13 digits)"
      );
      return;
    }

    // Validate ISBN if using Open Library URL
    if (
      imageURL.startsWith("https://covers.openlibrary.org") &&
      !validateOpenLibraryISBN(imageURL)
    ) {
      toast.error("Invalid ISBN format (must be 10 or 13 digits) or URL");
      return;
    }

    const success = await addBook({
      ...formData,
      imageURL,
    });

    if (success) {
      setFormData({
        title: "",
        author: "",
        genre: "",
        totalPages: "",
        coverInput: "",
      });
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
        <BookInputField
          label="Cover Image (ISBN or URL)"
          placeholder="Enter ISBN or paste image URL"
          value={formData.coverInput}
          onChange={(e) =>
            setFormData({ ...formData, coverInput: e.target.value })
          }
          tooltip="Find ISBN on book's back cover or online retailers/google OR paste direct image URL."
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
