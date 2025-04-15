import React, { useState } from "react";
import ProductTable from "../components/product/ProductTable";
import ProductSearch from "../components/product/ProductSearch";
import Pagination from "../components/ui/Pagination";
import { productData } from "../data/products";
import { Product } from "../types";

/**
 * ProductStock Page
 *
 * Main page for displaying and managing product inventory
 * Includes search functionality, product listing, and pagination
 */
const ProductStock: React.FC = () => {
  // State for products and pagination
  const [products, setProducts] = useState<Product[]>(productData);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter products based on search query
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#202224] -tracking-[0.11px]">
          Product Stock
        </h1>

        {/* Search Bar */}
        <div className="w-[300px]">
          <ProductSearch onSearch={handleSearch} />
        </div>
      </div>

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
    </main>
  );
};

export default ProductStock;
