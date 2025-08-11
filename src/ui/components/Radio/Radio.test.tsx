import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';

describe('Radio', () => {
  test('renders id', () => {
    const id = "id"
    render(
      <Radio id={id} name="name" onChange={jest.fn()}>
        Option
      </Radio>
    );

    expect(screen.getByRole('radio')).toHaveAttribute('id', id);
  });

  test('renders name', () => {
    const name = 'name'
    render(
      <Radio id="id" name={name} onChange={jest.fn()}>
        Option
      </Radio>
    );

    expect(screen.getByRole('radio')).toHaveAttribute('name', name);
  });

  test('calls onChange when changing options', async () => {
    const onChange = jest.fn();

    render(
      <Radio id="id" name="name" onChange={onChange}>
        Option
      </Radio>
    );

    await userEvent.click(screen.getByRole('radio'));

    expect(onChange).toHaveBeenCalled();
  });

  test('renders children', () => {
    render(
      <Radio id="id" name="name" onChange={jest.fn()}>
        Option
      </Radio>
    );

    expect(screen.getByText('Option')).toBeInTheDocument();
  });

  test('renders radio with checked when checked is true', () => {
    render(
      <Radio id="id" name="name" onChange={jest.fn()} checked>
        Option
      </Radio>
    );

    expect(screen.getByRole('radio')).toBeChecked();
  });

  test('does not render radio with checked when checked is false', () => {
    render(
      <Radio id="radio-id" name="name" onChange={jest.fn()}>
        Option
      </Radio>
    );

    expect(screen.getByRole('radio')).not.toBeChecked();
  });
});
