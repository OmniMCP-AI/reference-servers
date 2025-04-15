import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Product } from "../../types";
import ColorCircle from "../ui/ColorCircle";

interface ProductTableProps {
  products: Product[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

/**
 * ProductTable Component
 *
 * Displays product data in a responsive table layout
 *
 * @param {Product[]} products - Array of product objects to display
 * @param {function} onEdit - Optional callback when edit button is clicked
 * @param {function} onDelete - Optional callback when delete button is clicked
 */
const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  // Handle edit button click
  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  // Handle delete button click
  const handleDelete = (id: number) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white border border-[#b9b9b9] rounded-[14px] overflow-hidden mb-5 shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-[120px_1.5fr_1fr_1fr_0.5fr_1.5fr_0.5fr] bg-white border-b border-[#d5d5d5] p-[15px_20px] items-center">
        <div className="text-sm font-bold text-[#202224]">Image</div>
        <div className="text-sm font-bold text-[#202224]">Product Name</div>
        <div className="text-sm font-bold text-[#202224]">Category</div>
        <div className="text-sm font-bold text-[#202224]">Price</div>
        <div className="text-sm font-bold text-[#202224]">Piece</div>
        <div className="text-sm font-bold text-[#202224]">Available Color</div>
        <div className="text-sm font-bold text-[#202224]">Action</div>
      </div>

      {/* Table Rows */}
      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-[120px_1.5fr_1fr_1fr_0.5fr_1.5fr_0.5fr] p-[15px_20px] border-b border-opacity-60 border-[#979797] items-center transition-colors hover:bg-black hover:bg-opacity-[0.01]"
        >
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy" // Lazy load images for better performance
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="text-sm font-semibold text-[rgba(32,34,36,0.9)]">
            {product.name}
          </div>
          <div className="text-sm font-semibold text-[rgba(32,34,36,0.9)]">
            {product.category}
          </div>
          <div className="text-sm font-semibold text-[rgba(32,34,36,0.9)]">
            {product.price}
          </div>
          <div className="text-sm font-semibold text-[rgba(32,34,36,0.9)]">
            {product.quantity}
          </div>

          {/* Color Options */}
          <div className="text-sm font-semibold text-[rgba(32,34,36,0.9)]">
            <div className="flex gap-[5px]">
              {product.colors.map((color, index) => (
                <ColorCircle key={index} color={color} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[5px] items-center">
            <button
              className="w-[30px] h-[30px] bg-[#fafbfd] border border-[#d5d5d5] rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f5f6fa] opacity-60"
              onClick={() => handleEdit(product.id)}
              aria-label={`Edit ${product.name}`}
            >
              <span className="text-sm flex items-center justify-center">
                <FiEdit2 />
              </span>
            </button>
            <div className="w-[1px] h-[15px] bg-[rgba(151,151,151,0.7)]"></div>
            <button
              className="w-[30px] h-[30px] bg-[#fafbfd] border border-[#d5d5d5] rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-[#f5f6fa]"
              onClick={() => handleDelete(product.id)}
              aria-label={`Delete ${product.name}`}
            >
              <span className="text-sm flex items-center justify-center text-[#ef3826]">
                <FiTrash2 />
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTable;
