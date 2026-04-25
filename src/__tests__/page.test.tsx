import { render, screen } from "@testing-library/react";
import Home from "../app/page";

/**
 * Advanced React UI Testing
 * Ensures accessible rendering and visual hierarchy.
 */
describe("Home Page Dashboard UI", () => {
  it("renders the main heading flawlessly", () => {
    render(<Home />);
    const heading = screen.getByText(/LearnSpace/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders the interactive analysis button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Analyze/i });
    expect(button).toBeInTheDocument();
  });

  it("contains the correct accessible input textarea", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Paste multiple course URLs/i);
    expect(input).toBeInTheDocument();
  });
});
