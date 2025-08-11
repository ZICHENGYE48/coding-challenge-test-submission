import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form', () => {
  test('renders label', () => {
    render(
      <Form
        label="Find an address"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
      />
    );

    expect(screen.getByText('Find an address')).toBeInTheDocument();
  });

  test('renders input fields with placeholders and values', () => {
    render(
      <Form
        label="Find an address"
        formEntries={[
          {
            name: 'firstName',
            placeholder: 'First name',
            extraProps: {
              value: 'John',
              onChange: jest.fn(),
            },
          },
          {
            name: 'lastName',
            placeholder: 'Last name',
            extraProps: {
              value: 'Doe',
              onChange: jest.fn(),
            },
          },
        ]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
      />
    );

    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First name')).toHaveValue('John');

    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toHaveValue('Doe');
  });

  test('calls onFormSubmit when form is submitted', async () => {
    const onFormSubmit = jest.fn()

    render(
      <Form
        label="Find an address"
        formEntries={[]}
        onFormSubmit={onFormSubmit}
        submitText="Submit"
      />
    );

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onFormSubmit).toHaveBeenCalled();
  });

  test('renders button text', () => {
    const submitText = 'Submit';

    render(
      <Form
        label="Test Form"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText={submitText}
      />
    );

    expect(screen.getByRole('button', { name: submitText })).toBeInTheDocument();
  });

  test('renders loading spinner', () => {
    render(
      <Form
        label="Loading Form"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
        loading
      />
    );

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('does not render loading spinner', () => {
    render(
      <Form
        label="Loading Form"
        formEntries={[]}
        onFormSubmit={jest.fn()}
        submitText="Submit"
      />
    );

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});
