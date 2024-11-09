import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface InputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  placeholder: string;
  className?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
}

export default function TextArea<T extends FieldValues>({
  name,
  placeholder,
  label,
  resize = "none",
  className,
  register,
  error,
}: InputProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <div className="flex w-full flex-col gap-2">
        <textarea
          placeholder={placeholder}
          {...register(name)}
          className={`${className} w-full rounded-md border border-gray-300 p-2 ${resize === "none" ? "resize-none" : resize === "vertical" ? "resize-y" : resize === "horizontal" ? "resize-x" : "resize"}`}
        />
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}
