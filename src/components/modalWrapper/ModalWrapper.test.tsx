import { render } from "@testing-library/react";
import { vi } from "vitest";
import ModalWrapper from "./ModalWrapper";

// Mock the createPortal function
vi.mock("react-dom", () => ({
  ...vi.importActual("react-dom"),
  createPortal: (node: React.ReactNode) => node
}));

describe("ModalWrapper", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ModalWrapper>
        <div>Test Content</div>
      </ModalWrapper>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies the correct styles to the modal container", () => {
    const { container } = render(
      <ModalWrapper>
        <div>Test Content</div>
      </ModalWrapper>
    );
    const modalContainer = container.firstChild;
    expect(modalContainer).toHaveClass(
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    );
  });
});
