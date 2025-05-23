export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border rounded ${
            currentPage === i + 1 ? "bg-primary text-white" : ""
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
