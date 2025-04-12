import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "./SignUp";
import { useSignup } from "@/serviceHooks/useSignup";
import { toast } from "sonner";
import { createMemoryRouter, RouterProvider } from "react-router";

vi.mock("@/serviceHooks/useSignup");
vi.mock("sonner");
vi.mock("@/assets", () => ({
  videos: ["mock-video-path.mp4"],
}));

const mockUseSignup = vi.mocked(useSignup);
const mockToast = vi.mocked(toast);

describe("Signup", () => {
  beforeEach(() => {
    mockUseSignup.mockReturnValue({
      signup: vi.fn().mockResolvedValue(undefined),
    });
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <SignUp />,
        },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
  };

  it("renders the registration form with all inputs", () => {
    renderComponent();

    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("displays the login link", () => {
    renderComponent();

    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("handles successful registration", async () => {
    // Mock successful signup implementation
    const mockSignup = vi.fn().mockImplementation(() => {
      mockToast.success("Successful registration!");
    });
    mockUseSignup.mockReturnValue({ signup: mockSignup });

    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText("email"), "test@example.com");
    await user.type(screen.getByLabelText("password"), "password123");
    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(mockToast.success).toHaveBeenCalledWith(
        "Successful registration!"
      );
    });
  });

  it("handles registration error", async () => {
    // Mock failing signup implementation
    const mockSignup = vi.fn().mockImplementation(() => {
      mockToast.error("auth/email-already-in-use");
    });
    mockUseSignup.mockReturnValue({ signup: mockSignup });

    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText("email"), "error@test.com");
    await user.type(screen.getByLabelText("password"), "password123");
    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith("error@test.com", "password123");
      expect(mockToast.error).toHaveBeenCalledWith("auth/email-already-in-use");
    });
  });
});
