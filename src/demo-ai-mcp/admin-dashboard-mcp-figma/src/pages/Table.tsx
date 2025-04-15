import React, { useState } from "react";
import ProductTable from "../components/product/ProductTable";
import Pagination from "../components/ui/Pagination";
import { productData } from "../data/products";
import { Product } from "../types";

const Table: React.FC = () => {
  // State for products and pagination
  const [products, setProducts] = useState<Product[]>(productData);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Changed to 6 to match Figma design

  // Handle product edit
  const handleEdit = (id: number) => {
    console.log(`Editing product with ID: ${id}`);
    // In a real application, you would open an edit modal or navigate to an edit page
  };

  // Handle product delete
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get current page products
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  return (
    <main className="px-8 py-6">
      {/* Order List Section */}
      <div className="bg-white rounded-[14px] border border-[#B9B9B9]/30 shadow-sm overflow-hidden mb-8">
        {/* Header Row */}
        <div className="grid grid-cols-6 bg-[#FCFDFD] px-6 py-4 border-b border-[#D5D5D5]">
          <h3 className="text-sm font-semibold text-[#202224]/90">ID</h3>
          <h3 className="text-sm font-semibold text-[#202224]/90">NAME</h3>
          <h3 className="text-sm font-semibold text-[#202224]/90">ADDRESS</h3>
          <h3 className="text-sm font-semibold text-[#202224]/90">DATE</h3>
          <h3 className="text-sm font-semibold text-[#202224]/90">TYPE</h3>
          <h3 className="text-sm font-semibold text-[#202224]/90">STATUS</h3>
        </div>

        {/* Order Rows */}
        <div className="grid grid-cols-6 px-6 py-4 border-b border-[#979797]/60 hover:bg-gray-50">
          <span className="text-sm font-semibold text-[#202224]/90">00001</span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Christine Brooks
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            089 Kutch Green Apt. 448
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            14 Feb 2019
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Electric
          </span>
          <span>
            <div className="inline-block px-3 py-1 text-xs font-bold rounded bg-[rgba(0,182,155,0.2)] text-[#00b69b]">
              Completed
            </div>
          </span>
        </div>

        <div className="grid grid-cols-6 px-6 py-4 border-b border-[#979797]/60 hover:bg-gray-50">
          <span className="text-sm font-semibold text-[#202224]/90">00002</span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Rosie Pearson
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            979 Immanuel Ferry Suite 526
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            14 Feb 2019
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">Book</span>
          <span>
            <div className="inline-block px-3 py-1 text-xs font-bold rounded bg-[rgba(98,38,239,0.2)] text-[#6226ef]">
              Processing
            </div>
          </span>
        </div>

        <div className="grid grid-cols-6 px-6 py-4 border-b border-[#979797]/60 hover:bg-gray-50">
          <span className="text-sm font-semibold text-[#202224]/90">00003</span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Darrell Caldwell
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            8587 Frida Ports
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            14 Feb 2019
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Medicine
          </span>
          <span>
            <div className="inline-block px-3 py-1 text-xs font-bold rounded bg-[rgba(239,56,38,0.2)] text-[#ef3826]">
              Rejected
            </div>
          </span>
        </div>

        <div className="grid grid-cols-6 px-6 py-4 border-b border-[#979797]/60 hover:bg-gray-50">
          <span className="text-sm font-semibold text-[#202224]/90">00004</span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Gilbert Johnston
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            768 Destiny Lake Suite 600
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            14 Feb 2019
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Mobile
          </span>
          <span>
            <div className="inline-block px-3 py-1 text-xs font-bold rounded bg-[rgba(0,182,155,0.2)] text-[#00b69b]">
              Completed
            </div>
          </span>
        </div>

        <div className="grid grid-cols-6 px-6 py-4 border-b border-[#979797]/60 hover:bg-gray-50">
          <span className="text-sm font-semibold text-[#202224]/90">00005</span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Alan Cain
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            042 Mylene Throughway
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            14 Feb 2019
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">Watch</span>
          <span>
            <div className="inline-block px-3 py-1 text-xs font-bold rounded bg-[rgba(98,38,239,0.2)] text-[#6226ef]">
              Processing
            </div>
          </span>
        </div>

        <div className="grid grid-cols-6 px-6 py-4 hover:bg-gray-50">
          <span className="text-sm font-semibold text-[#202224]/90">00006</span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Alfred Murray
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            543 Weimann Mountain
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            14 Feb 2019
          </span>
          <span className="text-sm font-semibold text-[#202224]/90">
            Medicine
          </span>
          <span>
            <div className="inline-block px-3 py-1 text-xs font-bold rounded bg-[rgba(0,182,155,0.2)] text-[#00b69b]">
              Completed
            </div>
          </span>
        </div>
      </div>

      {/* Product Table Section */}
      <div className="mt-8">
        {/* Product Table */}
        <ProductTable
          products={getCurrentPageProducts()}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default Table;
