import React from 'react';

const Paginations = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`mx-2 px-3 py-1 rounded ${page === currentPage ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Paginations;
