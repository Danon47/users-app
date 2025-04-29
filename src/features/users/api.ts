import { api } from '@/shared/api/axiosInstance';
import { User } from './types';

export const UsersApi = {
  fetchAll: () => api.get<User[]>('/users'),
  fetchById: (id: number) => api.get<User>(`/users/${id}`),
};