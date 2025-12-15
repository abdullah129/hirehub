import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback,
  size = 'md',
  className,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const getFallbackText = () => {
    if (fallback) {
      return fallback
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return '?';
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-300',
        sizes[size],
        className
      )}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-medium text-gray-700">{getFallbackText()}</span>
      )}
    </div>
  );
};
