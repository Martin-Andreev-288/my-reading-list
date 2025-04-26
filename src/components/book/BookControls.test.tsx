import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookControls from "./BookControls";

describe("BookControls", () => {
  const mockHandlers = {
    onSearchChange: vi.fn(),
    onSearchApply: vi.fn(),
    onSortChange: vi.fn(),
    onFilterChange: vi.fn(),
  };

  it("handles search input changes without auto-applying", async () => {
    const user = userEvent.setup();
    render(<BookControls searchQuery="" {...mockHandlers} />);

    const input = screen.getByPlaceholderText(
      "Search by title, author, or genre..."
    );
    await user.type(input, "test query");

    expect(mockHandlers.onSearchApply).not.toHaveBeenCalled();
    expect(mockHandlers.onSearchChange).toHaveBeenCalledTimes(10);
  });

  it("triggers search on Enter key press", async () => {
    const user = userEvent.setup();
    render(<BookControls searchQuery="test" {...mockHandlers} />);

    const input = screen.getByPlaceholderText(
      "Search by title, author, or genre..."
    );
    await user.type(input, "{Enter}");

    expect(mockHandlers.onSearchApply).toHaveBeenCalledTimes(1);
  });

  it("triggers search on icon click", async () => {
    const user = userEvent.setup();
    mockHandlers.onSearchApply.mockClear();

    render(<BookControls searchQuery="test" {...mockHandlers} />);
    const icon = screen.getByRole("button", { name: /search/i });
    await user.click(icon);

    expect(mockHandlers.onSearchApply).toHaveBeenCalledTimes(1);
  });

  it("handles sorting changes", async () => {
    const user = userEvent.setup();
    render(<BookControls searchQuery="" {...mockHandlers} />);

    const sortSelect = screen.getByLabelText("Sort By");
    await user.selectOptions(sortSelect, "z-a");

    expect(mockHandlers.onSortChange).toHaveBeenCalledWith("z-a");
  });

  it("handles filtering changes", async () => {
    const user = userEvent.setup();
    render(<BookControls searchQuery="" {...mockHandlers} />);

    const filterSelect = screen.getByLabelText("Filter By Status");
    await user.selectOptions(filterSelect, "reading");

    expect(mockHandlers.onFilterChange).toHaveBeenCalledWith("reading");
  });
});
