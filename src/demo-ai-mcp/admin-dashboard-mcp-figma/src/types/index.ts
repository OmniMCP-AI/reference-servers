// Product type definition
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  quantity: string;
  image: string;
  colors: string[];
}

/**
 * Navigation item interface for sidebar
 */
export interface NavItem {
  name: string;
  path: string;
  isActive: boolean;
}

/**
 * Navigation section interface for sidebar
 */
export interface NavSection {
  title?: string;
  items: NavItem[];
}

/**
 * User role type
 */
export type UserRole = "admin" | "user";
