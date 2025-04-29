import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPage } from '@/features/users/usersSlice';

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { users, pagination } = useAppSelector((state) => state.users);
  const { currentPage, itemsPerPage } = pagination;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border ${
              currentPage === page
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
}