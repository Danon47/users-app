import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Link href="/users" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Перейти к списку пользователей
      </Link>
    </div>
  );
}
