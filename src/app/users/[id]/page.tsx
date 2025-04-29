'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserById } from '@/features/users/usersSlice';
import Error from '@/shared/components/Error';
import Loader from '@/shared/components/Loading';
import Image from 'next/image';
import Link from 'next/link';

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { currentUser, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!currentUser) return <p className="text-center mt-10">Пользователь не найден.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/users" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Назад к списку пользователей
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={`https://i.pravatar.cc/150?u=${currentUser.email}`}
            alt={`${currentUser.name} avatar`}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
        </div>

        <ul className="space-y-2 text-gray-800">
          <li><strong>Телефон:</strong> {currentUser.phone}</li>
          <li><strong>Город:</strong> {currentUser.address.city}</li>
          <li><strong>Улица:</strong> {currentUser.address.street}</li>
          <li><strong>Компания:</strong> {currentUser.company.name}</li>
          <li><strong>Сайт:</strong> <a href={`http://${currentUser.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{currentUser.website}</a></li>
        </ul>
      </div>
    </div>
  );
}
