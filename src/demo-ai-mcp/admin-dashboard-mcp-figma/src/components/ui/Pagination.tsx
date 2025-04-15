import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
}

/**
 * Pagination Component
 *
 * Displays pagination controls and information about displayed items
 *
 * @param {number} currentPage - Current active page
 * @param {number} totalItems - Total number of items across all pages
 * @param {number} itemsPerPage - Number of items displayed per page
 * @param {function} onPageChange - Optional callback when page changes
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 78, // Default from the design
  itemsPerPage = 9, // Default from the design (showing 1-09)
  onPageChange,
}) => {
  // Calculate start and end item numbers
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Handle pagination clicks
  const handlePrevClick = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage) && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-5 px-[5px]">
      <p className="text-sm font-semibold text-[rgba(32,34,36,0.6)]">
        Showing {start.toString().padStart(2, "0")}-
        {end.toString().padStart(2, "0")} of {totalItems}
      </p>
      <div className="flex items-center gap-[5px]">
        <button
          className={`w-8 h-8 bg-[#fafbfd] border border-[#d5d5d5] rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f5f6fa] opacity-60 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <span className="flex items-center justify-center">
            <FiChevronLeft />
          </span>
        </button>

        <div className="w-[1px] h-[15px] bg-[rgba(151,151,151,0.7)]"></div>

        <button
          className={`w-8 h-8 bg-[#fafbfd] border border-[#d5d5d5] rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f5f6fa] ${
            currentPage >= Math.ceil(totalItems / itemsPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={handleNextClick}
          disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
          aria-label="Next page"
        >
          <span className="flex items-center justify-center">
            <FiChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
