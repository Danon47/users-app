import { User } from '@/features/users/types';
import Image from 'next/image';
import Link from 'next/link';

export default function UserCard({ user }: { user: User }) {
  return (
    <Link href={`/users/${user.id}`} className="block border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <Image
          src={`https://i.pravatar.cc/150?u=${user.email}`}
          alt={`${user.name}'s avatar`}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h3 className="font-medium text-lg">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </Link>
  );
}