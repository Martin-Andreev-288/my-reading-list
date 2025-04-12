import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { useLogin } from "@/serviceHooks/useLogin";
import { toast } from "sonner";
import { createMemoryRouter, RouterProvider } from "react-router";

vi.mock("@/serviceHooks/useLogin");
vi.mock("sonner");
vi.mock("@/assets", () => ({
  videos: ["mock-video-path.mp4"],
}));

const mockUseLogin = vi.mocked(useLogin);
const mockToast = vi.mocked(toast);

describe("Login", () => {
  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      login: vi.fn().mockResolvedValue(undefined),
    });
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Login />,
        },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
  };

  it("renders the login form with all inputs", () => {
    renderComponent();

    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("displays the login link", () => {
    renderComponent();

    const loginLink = screen.getByRole("link", { name: /register/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/signup");
  });

  it("handles successful login", async () => {
    // Mock successful login implementation
    const mockLogin = vi.fn().mockImplementation(() => {
      mockToast.success("Login successful!");
    });
    mockUseLogin.mockReturnValue({ login: mockLogin });

    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText("email"), "test@example.com");
    await user.type(screen.getByLabelText("password"), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockToast.success).toHaveBeenCalledWith("Login successful!");
    });
  });

  it("handles login error", async () => {
    // Mock failing login implementation
    const mockLogin = vi.fn().mockImplementation(() => {
      mockToast.error("auth/email-already-in-use");
    });
    mockUseLogin.mockReturnValue({ login: mockLogin });

    const user = userEvent.setup();
    renderComponent();

    await user.type(screen.getByLabelText("email"), "error@test.com");
    await user.type(screen.getByLabelText("password"), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("error@test.com", "password123");
      expect(mockToast.error).toHaveBeenCalledWith("auth/email-already-in-use");
    });
  });
});
