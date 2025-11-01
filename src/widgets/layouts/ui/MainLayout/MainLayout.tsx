import './MainLayout.scss';
import type { ReactNode } from 'react';
import { bem } from '@shared/libs';

const b = bem('main-layout');

interface MainLayoutProps {
  className?: string;
  children: ReactNode;
}

export const MainLayout = ({ className, children }: MainLayoutProps) => {
  return (
    <div className={b(null, [className])}>
      <div className={b('content')}>{children}</div>
    </div>
  );
};
