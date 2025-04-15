import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditBookForm from "./EditBookForm";
import { useBooks } from "@/serviceHooks/useBooks";
import { toast } from "sonner";
import type { Book } from "@/utils/types";

vi.mock("@/serviceHooks/useBooks");
vi.mock("sonner");

const mockUseBooks = vi.mocked(useBooks);
const mockToastError = vi.mocked(toast.error);

describe("EditBookForm", () => {
  const mockBook: Book = {
    id: "book-123",
    title: "Existing Book",
    author: "Existing Author",
    genre: "Existing Genre",
    totalPages: 200,
    status: "Reading",
    userId: "user-123",
    imageURL: "https://example.com/cover.jpg",
  };

  const setup = () => {
    const user = userEvent.setup();
    render(<EditBookForm book={mockBook} />);
    return { user };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBooks.mockReturnValue({
      updateBook: vi.fn().mockResolvedValue(true),
    } as any);
  });

  it("renders with initial book data", () => {
    setup();

    expect(screen.getByRole("textbox", { name: /title/i })).toHaveValue(
      mockBook.title
    );
    expect(screen.getByRole("textbox", { name: /author/i })).toHaveValue(
      mockBook.author
    );
    expect(screen.getByRole("textbox", { name: /genre/i })).toHaveValue(
      mockBook.genre
    );
    expect(
      screen.getByRole("spinbutton", { name: /total pages/i })
    ).toHaveValue(mockBook.totalPages);
    expect(screen.getByRole("textbox", { name: /cover image/i })).toHaveValue(
      ""
    );
  });

  it("submits updated book data", async () => {
    const { user } = setup();
    const updateBookMock = mockUseBooks().updateBook;

    await user.clear(screen.getByRole("textbox", { name: /title/i }));
    await user.type(
      screen.getByRole("textbox", { name: /title/i }),
      "Updated Title"
    );
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(updateBookMock).toHaveBeenCalledWith(mockBook.id, {
        title: "Updated Title",
        author: mockBook.author,
        genre: mockBook.genre,
        totalPages: mockBook.totalPages,
        imageURL: mockBook.imageURL,
      });
    });
  });

  it("shows error when submitting without changes", async () => {
    const { user } = setup();
    const updateBookMock = mockUseBooks().updateBook;

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("No changes detected");
      expect(updateBookMock).not.toHaveBeenCalled();
    });
  });
});
