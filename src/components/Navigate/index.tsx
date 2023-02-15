import { CaretRight } from 'phosphor-react';
import { NavigateButton } from './styles';

interface NavigatePropType {
  enabled: boolean;
  direction: 'prev' | 'next';
  onClick: () => void;
}

export const Navigate: React.FC<NavigatePropType> = ({
  enabled,
  onClick,
  direction,
}: NavigatePropType) => {
  return (
    <NavigateButton direction={direction} onClick={onClick} disabled={!enabled}>
      <CaretRight size={33} />
    </NavigateButton>
  );
};
