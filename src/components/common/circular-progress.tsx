import { cn } from '@/lib/utils';
import React from 'react';

interface CircularProgressProps {
  percentage?: number;
  size?: "sm" | "md" | "lg" | "xl";
  strokeWidth?: "thin" | "normal" | "thick";
  showPercentage?: boolean;
  className?: string;
  circleClassName?: string;
  progressClassName?: string;
  textClassName?: string;
  animate?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 0,
  size = "md",
  strokeWidth = "normal",
  showPercentage = true,
  animate = true,
  className = '',
  circleClassName = 'stroke-gray-200',
  progressClassName = 'stroke-blue-500',
  textClassName = ''
}) => {
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));

  // Size mappings
  const sizeMap = {
    sm: {
      container: 'w-20 h-20',
      text: 'text-sm'
    },
    md: {
      container: 'w-32 h-32',
      text: 'text-xl'
    },
    lg: {
      container: 'w-40 h-40',
      text: 'text-2xl'
    },
    xl: {
      container: 'w-48 h-48',
      text: 'text-3xl'
    }
  };

  // Stroke width mappings
  const strokeWidthMap = {
    thin: '4',
    normal: '8',
    thick: '12'
  };

  // Calculate dimensions based on container size
  const getContainerSize = () => {
    const sizes = { sm: 80, md: 128, lg: 160, xl: 192 };
    return sizes[size];
  };

  const containerSize = getContainerSize();
  const strokeW = strokeWidthMap[strokeWidth];
  const radius = (containerSize / 2) - (parseInt(strokeW) * 2);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedPercentage / 100) * circumference;

  const animationClass = animate ? 'transition-all duration-1000 ease-in-out' : '';

  return (
    <div className={cn(
      'relative inline-flex items-center justify-center',
      sizeMap[size].container,
      className
    )}>
      {/* Background circle */}
      <svg className="absolute w-full h-full">
        <circle
          className={cn("stroke-current", circleClassName)}
          fill="none"
          strokeWidth={strokeW}
          r={radius}
          cx={containerSize / 2}
          cy={containerSize / 2}
        />
      </svg>

      {/* Progress circle */}
      <svg className="absolute w-full h-full -rotate-90">
        <circle
          className={cn(
            "stroke-current",
            progressClassName,
            animationClass
          )}
          fill="none"
          strokeWidth={strokeW}
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
          r={radius}
          cx={containerSize / 2}
          cy={containerSize / 2}
        />
      </svg>

      {/* Percentage text */}
      {showPercentage && (
        <div className={cn(
          'absolute',
          sizeMap[size].text,
          'font-semibold',
          textClassName,
          animationClass
        )}>
          {Math.round(normalizedPercentage)}%
        </div>
      )}
    </div>
  );
};

export default CircularProgress;