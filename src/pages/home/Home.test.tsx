import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { useCollection } from "@/serviceHooks/useCollection";
import { useAuthContext } from "@/serviceHooks/useAuthContext";
import { MemoryRouter } from "react-router";

// Mock IntersectionObserver
class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

beforeAll(() => {
  // Type assertion to handle browser API type differences
  (
    window as typeof window & {
      IntersectionObserver: typeof IntersectionObserver;
    }
  ).IntersectionObserver = IntersectionObserver as typeof IntersectionObserver;
});

vi.mock("@/serviceHooks/useCollection");
vi.mock("@/serviceHooks/useAuthContext");
vi.mock("@/components", async () => ({
  ...(await vi.importActual("@/components")),
  AddBookFormModal: () => <div data-testid="add-book-modal" />,
  EmptyLibraryState: ({ onAddBook }: { onAddBook: () => void }) => (
    <button onClick={onAddBook}>Add Your First Book</button>
  ),
  BookList: () => <div data-testid="book-list" />,
}));

const mockUseCollection = vi.mocked(useCollection);
const mockUseAuthContext = vi.mocked(useAuthContext);

describe("Home", () => {
  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      user: { uid: "user-123" },
      loading: false,
    } as any);
  });

  it("opens add book modal when clicking add button in populated state", async () => {
    mockUseCollection.mockReturnValue({
      documents: [{ id: "1", title: "Test Book" }],
    } as any);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /add new book 📖/i }));
    await waitFor(() => {
      expect(screen.getByTestId("add-book-modal")).toBeInTheDocument();
    });
  });

  it("opens add book modal when clicking add button in empty state", async () => {
    mockUseCollection.mockReturnValue({ documents: [] } as any);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", { name: /add your first book/i })
    );
    await waitFor(() => {
      expect(screen.getByTestId("add-book-modal")).toBeInTheDocument();
    });
  });
});
