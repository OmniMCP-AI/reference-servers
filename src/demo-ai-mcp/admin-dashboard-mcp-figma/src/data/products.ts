import { Product } from "../types";

// Import product images
import appleWatch from "../assets/images/products/apple-watch.png";
import microsoftHeadset from "../assets/images/products/microsoft-headset.png";
import womensDress from "../assets/images/products/womens-dress.png";
import samsungA50 from "../assets/images/products/samsung-A50.png";
import camera from "../assets/images/products/camera.png";

/**
 * Sample product data for the dashboard
 * These items represent the product stock shown in the dashboard table
 */
export const productData: Product[] = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "$690.00",
    quantity: "63",
    image: appleWatch,
    colors: ["#000000", "#9F9F9F", "#E98F8F"],
  },
  {
    id: 2,
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    quantity: "13",
    image: microsoftHeadset,
    colors: ["#000000", "#F57C7C", "#4D88EF", "#E9C157"],
  },
  {
    id: 3,
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    quantity: "635",
    image: womensDress,
    colors: ["#882853", "#7CB7F5", "#12163C", "#4343EE"],
  },
  {
    id: 4,
    name: "Samsung A50",
    category: "Mobile",
    price: "$400.00",
    quantity: "67",
    image: samsungA50,
    colors: ["#283988", "#000000", "#A32147"],
  },
  {
    id: 5,
    name: "Camera",
    category: "Electronic",
    price: "$420.00",
    quantity: "52",
    image: camera,
    colors: ["#283988", "#000000", "#A32147"],
  },
  {
    id: 6,
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    quantity: "635",
    image: womensDress,
    colors: ["#882853", "#7CB7F5", "#12163C", "#4343EE"],
  },
];
