import { useHttpPostFile } from '@/app/http';
import type { FileResponse } from '@/app/type';

export async function uploadImage(image: File, folder: string) {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await useHttpPostFile<FileResponse>(`/images/upload/${folder}`, formData);
    const { filePath, data, message } = response.data;

    return { filePath, data, message };
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Failed to upload image');
  }
}
