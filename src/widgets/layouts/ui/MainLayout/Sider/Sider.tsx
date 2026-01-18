import './Sider.scss';
import { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Drawer, Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from '@shared/config/router';

const SIDE_MENU_ITEMS: MenuProps['items'] = [
  { key: RoutePath.Main, label: 'Главная страница' },
  { key: RoutePath.CategoryList, label: 'Список категорий' },
  { key: RoutePath.TranscriptionList, label: 'Список транскрипций' },
  { key: RoutePath.ScenarioList, label: 'Список сценариев' },
  { key: RoutePath.UserChannelList, label: 'Список каналов' },
];

export const Sider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isSiderHide = [
    RoutePath.ScenarioDetail.replace(':id', location.pathname.split('/')[2]),
  ].includes(location.pathname);

  if (isSiderHide) return null;

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const menuContent = (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={SIDE_MENU_ITEMS}
      onClick={handleMenuClick}
      style={{ height: '100%', borderRight: 0 }}
    />
  );

  if (isMobile) {
    return (
      <>
        <button
          className="sider__burger-btn"
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={200}
          styles={{ body: { padding: 0 } }}
        >
          {menuContent}
        </Drawer>
      </>
    );
  }

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={
        collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: '16px' }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: '16px' }} />
        )
      }
      width={200}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      {menuContent}
    </Layout.Sider>
  );
};
