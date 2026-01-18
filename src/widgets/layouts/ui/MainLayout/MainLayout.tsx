import './MainLayout.scss';
import type { ReactNode } from 'react';
import { Layout } from 'antd';
import { bem } from '@shared/libs';
import { Sider } from '@widgets/layouts/ui/MainLayout/Sider/Sider';

const b = bem('main-layout');

interface MainLayoutProps {
  className?: string;
  children: ReactNode;
}

export const MainLayout = ({ className, children }: MainLayoutProps) => {
  return (
    <Layout className={b(null, [className])} style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        <Layout.Content className={b('content')}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
