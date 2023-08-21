import { ChangeEvent, FormEvent, useState } from "react";

export const useForm = (callback: () => Promise<void>, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
