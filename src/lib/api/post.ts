import { http } from '@/app/http';

export async function getRecentPosts(token: string) {
  const response = await http.get('/posts', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}
