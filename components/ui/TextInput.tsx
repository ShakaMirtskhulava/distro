import ErrorMessage from "./ErrorMessage";
import { UseFormRegister, FieldError, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder: string;
  className?: string;
  type?: "text" | "password" | "email" | "number";
  disabled?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
}

export default function TextInput<T extends FieldValues>({
  name,
  placeholder,
  label,
  type = "text",
  className,
  disabled,
  register,
  error,
}: InputProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <div className="flex w-full flex-col gap-2">
        <input
          type={type}
          placeholder={placeholder}
          className={`${className} w-full rounded-md border border-gray-300 p-2`}
          {...register(name, {
            valueAsNumber: type === "number" ? true : false,
          })}
          disabled={disabled}
          min={0}
        />
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}
