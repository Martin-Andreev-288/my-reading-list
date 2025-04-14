import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import BackToTopBtn from "./BackToTopBtn";

describe("BackToTopButton", async () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    window.scrollY = 0;
  });

  it("should not be visible initially", () => {
    render(<BackToTopBtn />);
    const button = screen.getByTestId("back-to-top-btn");
    expect(button).toHaveClass("opacity-0");
    expect(button).toHaveClass("pointer-events-none");
  });

  it("becomes visible when scrolled", () => {
    render(<BackToTopBtn />);
    window.scrollY = 500;
    fireEvent.scroll(window);
    expect(screen.getByTestId("back-to-top-btn")).toBeInTheDocument();
  });

  it("scrolls to top when clicked", () => {
    render(<BackToTopBtn />);
    window.scrollY = 500;
    fireEvent.scroll(window);
    fireEvent.click(screen.getByTestId("back-to-top-btn"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
