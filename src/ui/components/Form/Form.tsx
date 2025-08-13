import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText from '../InputText/InputText';
import $ from './Form.module.css';

interface FormEntry {
  name: string;
  placeholder: string;
  extraProps: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'checked' | 'placeholder'
  > & {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
  };
}

interface FormProps {
  label: string;
  loading?: boolean;
  formEntries: FormEntry[];
  onFormSubmit: React.FormEventHandler<HTMLFormElement>;
  submitText: string;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading = false,
  formEntries,
  onFormSubmit,
  submitText
}) => {
  return (
    <form aria-labelledby="form-legend" onSubmit={onFormSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <legend id="form-legend">{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              name={name}
              placeholder={placeholder}
              {...extraProps}
            />
          </div>
        ))}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
