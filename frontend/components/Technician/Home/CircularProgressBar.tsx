// components/CircularProgressBar.tsx
import React from 'react';

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => {
  const radius = 30;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="" // Rotate the entire SVG 90 degrees counter-clockwise
    >
      {/* Incomplete part */}
      <circle
        stroke="#FFC000"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset: 0 }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Complete part */}
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="text-[#27A857]"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="font-semibold text-gray-700"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
