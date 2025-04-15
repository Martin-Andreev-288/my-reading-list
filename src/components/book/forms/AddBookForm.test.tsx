import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBookForm from "./AddBookForm";
import { useBooks } from "@/serviceHooks/useBooks";
import { toast } from "sonner";

// Mock dependencies
vi.mock("@/serviceHooks/useBooks");
vi.mock("sonner");

const mockUseBooks = vi.mocked(useBooks);
const mockToastError = vi.mocked(toast.error);

describe("AddBookForm", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<AddBookForm />);
    return { user };
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBooks.mockReturnValue({
      addBook: vi.fn().mockResolvedValue(true),
    } as any);
  });

  it("renders required fields with proper label associations", () => {
    setup();

    // Use getByRole with name selector for proper accessibility checking
    expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: /total pages/i })
    ).toBeInTheDocument();
  });

  it("submits valid form with required fields", async () => {
    const { user } = setup();
    const addBookMock = mockUseBooks().addBook;

    await user.type(
      screen.getByRole("textbox", { name: /title/i }),
      "Test Book"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: /total pages/i }),
      "300"
    );
    await user.click(screen.getByRole("button", { name: /add book/i }));

    await waitFor(() => {
      expect(addBookMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Test Book",
          totalPages: "300",
        })
      );
    });
  });

  it("validates ISBN format", async () => {
    const { user } = setup();
    const addBookMock = mockUseBooks().addBook;

    await user.type(
      screen.getByRole("textbox", { name: /cover image/i }),
      "invalid-isbn"
    );
    await user.type(
      screen.getByRole("textbox", { name: /title/i }),
      "Test Book"
    );
    await user.type(
      screen.getByRole("spinbutton", { name: /total pages/i }),
      "300"
    );
    await user.click(screen.getByRole("button", { name: /add book/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalled();
      expect(addBookMock).not.toHaveBeenCalled();
    });
  });
});
