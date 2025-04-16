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

  it("handles search input changes", async () => {
    const user = userEvent.setup();
    render(<BookControls searchQuery="" {...mockHandlers} />);

    const input = screen.getByPlaceholderText(
      "Search by title, author, or genre..."
    );
    await user.type(input, "test query");

    expect(mockHandlers.onSearchChange).toHaveBeenCalledWith("t");
    expect(mockHandlers.onSearchChange).toHaveBeenLastCalledWith("y");
    expect(mockHandlers.onSearchChange).toHaveBeenCalledTimes(10);
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
