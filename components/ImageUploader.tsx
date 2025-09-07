import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon } from './icons';
import { useTranslation } from '../hooks/useTranslation';

interface ImageUploaderProps {
    onImageUpload: (file: File, previewUrl: string) => void;
    imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { t } = useTranslation();

    const handleFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(file, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onImageUpload]);

    return (
        <div className="w-full">
            <label 
                htmlFor="dropzone-file" 
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors
                    ${isDragging ? 'border-green-500' : 'border-gray-300'}
                    ${imagePreview ? 'border-solid p-2 h-auto' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {imagePreview ? (
                    <img src={imagePreview} alt="Crop preview" className="object-contain max-h-80 w-auto rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon />
                        <p className="mb-2 text-sm text-gray-500 text-center"><span className="font-semibold">{t('uploaderText1')}</span> {t('uploaderText2')}</p>
                        <p className="text-xs text-gray-500">{t('uploaderText3')}</p>
                    </div>
                )}
                <input 
                    ref={fileInputRef} 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => handleFileChange(e.target.files)}
                />
            </label>
        </div>
    );
};

export default ImageUploader;