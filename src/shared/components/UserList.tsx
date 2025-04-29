'use client';
import { useAppSelector } from '@/store/hooks';
import { fetchUsers } from '@/features/users/usersSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import UserCard from './UserCard';
import Pagination from './Pagination';
import Loading from './Loading';
import Error from './Error';

export default function UserList() {
  const dispatch = useAppDispatch();
  const { users, status, error, pagination  } = useAppSelector((state) => state.users);
  const { currentPage, itemsPerPage } = pagination;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error || 'Unknown error'} />;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}