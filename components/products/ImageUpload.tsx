import { X } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";

interface ImageUploadProps {
  inputRef: React.RefObject<HTMLInputElement>;
  selectedImage: File[];
  setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUpload({ setSelectedImage, selectedImage, inputRef }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) {
       // Validate image size
      const validFiles = Array.from(files).filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          setError(`File ${file.name} is too large. Maximum file size is 10MB.`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      setSelectedImage((prev) => [...prev, ...validFiles]);
      setError(null);
    }
  }

  function removeImage(index: number) {
    setSelectedImage((prev) => {
      const updatedImages = prev.filter((_, idx) => idx !== index);

      if (updatedImages.length === 0 && inputRef.current) {
        inputRef.current.value = "";
      }

      if (inputRef.current?.files) {
        const newFiles = new DataTransfer();
        updatedImages.forEach((file) => {
          newFiles.items.add(file);
        });
        inputRef.current.files = newFiles.files;
      }

      return updatedImages;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-sm font-semibold">Upload Product Images</label>
      <input
        type="file"
        accept="image/*"
        name="ImageFiles"
        multiple
        onChange={handleImageChange}
        ref={inputRef}
        className="block w-full text-sm text-gray-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      {error && <ErrorMessage error={error} />}
      <div className="grid grid-cols-4 gap-2">
        {selectedImage.map((file, index) => (
          <div key={index} className="relative h-32 w-32">
            <img
              src={URL.createObjectURL(file)}
              alt="Selected Image"
              className="h-32 w-32 rounded-md object-cover shadow-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-0 top-0 rounded-full bg-secondary p-1 text-white"
            >
              <X size={15} color="white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
