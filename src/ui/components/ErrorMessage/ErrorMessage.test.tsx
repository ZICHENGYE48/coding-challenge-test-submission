import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  test("renders with provided children", () => {
    const children = "This is an error";
    render(<ErrorMessage>{children}</ErrorMessage>);

    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
