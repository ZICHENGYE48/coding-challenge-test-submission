import React from "react";

type FormFields<T> = {
  [K in keyof T]: T[K];
};

type UseFormFieldsReturn<T> = {
  fields: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFields: React.Dispatch<React.SetStateAction<T>>;
  clearFields: () => void;
};

const useFormFields = <T extends Record<string, string>>(initialState: T): UseFormFieldsReturn<T> => {
  const [fields, setFields] = React.useState<FormFields<T>>(initialState);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: value,
    }));
  }, [setFields]);

  const clearFields = React.useCallback(() => {
    setFields(initialState);
  }, [initialState]);

  return { fields, onChange, setFields, clearFields };
}

export default useFormFields