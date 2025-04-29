'use client'; 

import { useAppSelector } from '@/store/hooks';
import { fetchUserById } from '@/features/users/usersSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import Error from '@/shared/components/Error';
import Link from 'next/link';
import Loading from '@/shared/components/Loading';
import { useRouter } from 'next/navigation'; 

interface UserPageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  const dispatch = useAppDispatch();
  const { currentUser, status, error } = useAppSelector((state) => state.users);
  const userId = parseInt(params.id);

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Error message={error || 'User not found'} />
        <Link href="/users" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Users
        </Link>
      </div>
    );
  }

  if (status !== 'succeeded' || !currentUser) {
    return <Loading />;
  }

  if (!currentUser) {
    router.push('/404'); 
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/users" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Users
      </Link>

      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={`https://i.pravatar.cc/150?u=${currentUser.email}`}
              alt={`${currentUser.name}'s avatar`}
              className="rounded-full w-32 h-32 border-4 border-blue-500"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold mb-2">{currentUser.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{currentUser.email}</p>

            <div className="space-y-3">
              <p><span className="font-medium">Username:</span> {currentUser.username}</p>
              <p><span className="font-medium">Phone:</span> {currentUser.phone}</p>
              <p><span className="font-medium">Website:</span> {currentUser.website}</p>

              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Address</h2>
                <p>{currentUser.address.street}, {currentUser.address.suite}</p>
                <p>{currentUser.address.city}, {currentUser.address.zipcode}</p>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Company</h2>
                <p>{currentUser.company.name}</p>
                <p className="text-gray-600">{currentUser.company.catchPhrase}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}