/**
 * useForm<T> — custom hook nâng cao GENERIC (Tuần 2, cùng tinh thần useFetch<T>).
 *
 * Tách toàn bộ logic form (state, validate, reset, submit) ra khỏi UI:
 * - T là kiểu giá trị form (Record<string, string>) — dùng lại cho mọi form
 * - hàm validate được tiêm từ ngoài, trả về map lỗi theo từng field (Partial<Record<...>>)
 * - handleSubmit nhận callback onValid chỉ chạy khi validate sạch lỗi
 */
import { useCallback, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export type FormValues = Record<string, string>;
export type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface UseFormResult<T extends FormValues> {
  values: T;
  errors: FormErrors<T>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (onValid: (values: T) => void) => (event: FormEvent<HTMLFormElement>) => void;
  reset: (nextValues?: T) => void;
}

export function useForm<T extends FormValues>(
  initialValues: T,
  validate?: (values: T) => FormErrors<T>
): UseFormResult<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      // computed key nên TS chỉ suy ra index signature — assertion giữ lại kiểu T
      setValues((prev) => ({ ...prev, [name]: value }) as T);
    },
    []
  );

  const handleSubmit = useCallback(
    (onValid: (values: T) => void) =>
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextErrors = validate?.(values) ?? {};
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
          onValid(values);
        }
      },
    [values, validate]
  );

  const reset = useCallback(
    (nextValues?: T) => {
      setValues(nextValues ?? initialValues);
      setErrors({});
    },
    [initialValues]
  );

  return { values, errors, handleChange, handleSubmit, reset };
}
