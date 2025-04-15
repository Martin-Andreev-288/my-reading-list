import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteBookFormModal from "./DeleteBookFormModal";
import { useBooks } from "@/serviceHooks/useBooks";
import { Book } from "@/utils/types";

vi.mock("@/serviceHooks/useBooks");

const mockUseBooks = vi.mocked(useBooks);

describe("DeleteBookFormModal", () => {
  const mockBook: Book = {
    id: "book-123",
    title: "TestBook",
    author: "Test Author",
    genre: "Test Genre",
    totalPages: 300,
    status: "Reading",
    userId: "user-123",
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    // Create portal root element
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(portalRoot);

    vi.clearAllMocks();
    mockUseBooks.mockReturnValue({
      deleteBook: vi.fn().mockResolvedValue(true),
    } as any);
  });

  afterEach(() => {
    // Clean up portal root
    document.getElementById("modal-root")?.remove();
  });

  const setup = () => {
    const user = userEvent.setup();
    render(<DeleteBookFormModal book={mockBook} onClose={mockOnClose} />);
    return { user };
  };

  it("renders confirmation message with book title", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Delete Book" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`"${mockBook.title}"`))
    ).toBeInTheDocument();
  });

  it("deletes book when confirm button is clicked", async () => {
    const { user } = setup();
    const deleteBookMock = mockUseBooks().deleteBook;

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(deleteBookMock).toHaveBeenCalledWith(mockBook.id);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("does not delete book when cancel is clicked", async () => {
    const { user } = setup();
    const deleteBookMock = mockUseBooks().deleteBook;

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(deleteBookMock).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
