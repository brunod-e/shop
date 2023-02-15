import { ComponentProps } from 'react';
import { SkeletonContainer, SkeletonItem } from './styles';

type SkeletonProps = ComponentProps<typeof SkeletonContainer>;

export const Skeleton = ({ ...props }: SkeletonProps) => {
  return (
    <SkeletonContainer {...props}>
      <SkeletonItem />
      <div>
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </SkeletonContainer>
  );
};
