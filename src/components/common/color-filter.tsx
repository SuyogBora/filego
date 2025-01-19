import { DEFAULT_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Button } from '../ui/button';

interface ColorFilterProps {
    isActiveQrColor: boolean;
    onColorSelect: (color: string) => void;
    selectedColor: string;
  }
  
  const ColorFilter: FC<ColorFilterProps> = ({ isActiveQrColor, onColorSelect, selectedColor }) => {
    return (
      <div className="flex items-center gap-1 py-1 px-2 border border-border rounded-sm">
        {DEFAULT_COLORS.map((color) => (
          <Button
            key={color}
            variant="outline"
            size="icon"
            onClick={() => onColorSelect(color)}
            className={cn(
              'w-[22px] h-[22px] !rounded-full',
              {
                'ring-1 ring-offset-1 ring-primary': selectedColor === color && isActiveQrColor
              }
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    );
  };

  export default ColorFilter