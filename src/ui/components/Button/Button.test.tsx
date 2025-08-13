import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, { VARIANT } from "./Button";

describe("Button", () => {
  test("renders button with provided children", () => {
    const children = "Click me";
    render(<Button>{children}</Button>);

    expect(screen.getByRole("button", { name: children })).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Click me" }));

    expect(onClick).toHaveBeenCalled();
  });

  test("renders button with default button type", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  test("renders button with submit type", () => {
    render(<Button type="submit">Click me</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  test("renders loading spinner when loading is true", () => {
    render(<Button loading>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toContainElement(
      screen.getByTestId("loading-spinner")
    );
  });

  test("does not render loading spinner when loading is false", () => {
    render(<Button>Click me</Button>);

    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });

  test("renders button with default primary variant", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toHaveClass(
      VARIANT.primary
    );
  });

  test.each(["primary", "secondary"] as const)(
    'renders button with "%s" variant',
    (variant) => {
      render(<Button variant={variant}>Click me</Button>);

      expect(screen.getByRole("button", { name: "Click me" })).toHaveClass(
        VARIANT[variant]
      );
    }
  );
});
