import React, { ChangeEvent } from 'react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="file-upload"
        className="hidden"
      />

      {/* Styled button */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-[#8e44ad] text-white py-2 px-4 rounded-full shadow-lg hover:[#9b59b6] transition duration-300 ease-in-out transform hover:scale-105"
      >
        Upload Image
      </label>
    </div>
  );
};

export default ImageUpload;
