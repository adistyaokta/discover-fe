import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

export const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>();
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });
  return (
    <div
      {...getRootProps()}
      className='flex flex-col justify-center items-center bg-slate-400 cursor-pointer rounded-md'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {fileUrl ? (
        <>
          <div className='w-full flex justify-center items-center p-4'>
            <img src={fileUrl} />
          </div>
          <p className='font-light mb-2'>Click or drag photo to replace</p>
        </>
      ) : (
        <div className='w-full flex justify-center items-center h-20'>
          <p className='font-thin'>Select file or drag photo here.</p>
        </div>
      )}
    </div>
  );
};
