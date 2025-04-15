import React from "react";

interface ColorCircleProps {
  color: string;
}

/**
 * ColorCircle Component
 *
 * Displays a color circle for product color options
 *
 * @param {string} color - The color to display
 */
const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  return (
    <div
      className="w-4 h-4 rounded-full shadow-sm"
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorCircle;
