import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
  test("renders label", () => {
    const label = "Find an address";
    render(
      <Form
        label={label}
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
      />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("renders input fields with placeholders and values", () => {
    const firstName = "John";
    const lastName = "Doe";

    render(
      <Form
        label="Find an address"
        formEntries={[
          {
            name: "firstName",
            placeholder: "First name",
            extraProps: {
              value: firstName,
              onChange: jest.fn(),
            },
          },
          {
            name: "lastName",
            placeholder: "Last name",
            extraProps: {
              value: lastName,
              onChange: jest.fn(),
            },
          },
        ]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
      />
    );

    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First name")).toHaveValue(firstName);

    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toHaveValue(lastName);
  });

  test("calls onFormSubmit when form is submitted", () => {
    const onFormSubmit = jest.fn();

    render(
      <Form
        label="Find an address"
        formEntries={[]}
        onFormSubmit={onFormSubmit}
        submitText="Submit"
      />
    );

    fireEvent.submit(screen.getByRole("form"));

    expect(onFormSubmit).toHaveBeenCalled();
  });

  test("renders button text", () => {
    const submitText = "Submit";

    render(
      <Form
        label="Test Form"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText={submitText}
      />
    );

    expect(
      screen.getByRole("button", { name: submitText })
    ).toBeInTheDocument();
  });

  test("renders loading spinner", () => {
    render(
      <Form
        label="Loading Form"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
        loading
      />
    );

    expect(screen.queryByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("does not render loading spinner", () => {
    render(
      <Form
        label="Loading Form"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
      />
    );

    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });
});
