import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface ProductSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

/**
 * ProductSearch Component
 *
 * Search input field for filtering products
 *
 * @param {function} onSearch - Optional callback when search query changes
 * @param {string} placeholder - Optional placeholder text for the input field
 */
const ProductSearch: React.FC<ProductSearchProps> = ({
  onSearch,
  placeholder = "Search product name",
}) => {
  const [query, setQuery] = useState("");

  // Handle search input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative w-full mb-5">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Search products"
        className="w-full h-[38px] bg-white border border-[#d5d5d5] rounded-[19px] py-0 pl-4 pr-10 text-sm outline-none font-[Nunito Sans] text-[#202224]"
      />
      <span className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[rgba(32,34,36,0.5)] flex items-center justify-center">
        <FiSearch />
      </span>
    </div>
  );
};

export default ProductSearch;
