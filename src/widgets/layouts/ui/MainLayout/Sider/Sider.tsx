import './Sider.scss';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '@shared/config/router';
import { bem } from '@shared/libs';
import { Icon } from '@shared/ui';

const b = bem('sider');

const SIDE_MENU_ITEMS = [
  { key: RoutePath.Main, label: `Главная страница` },
  { key: RoutePath.CategoryList, label: `Список категорий` },
  { key: RoutePath.TranscriptionList, label: `Список транскрипций` },
  { key: RoutePath.ScenarioList, label: `Список сценариев` },

  { key: RoutePath.UserChannelList, label: `Список каналов` },
];

export const Sider = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

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

  return (
    <>
      {isMobile && (
        <button className={b('burger-btn')} onClick={toggleIsOpen}>
          <span />
          <span />
          <span />
        </button>
      )}

      <aside className={b({ open: isOpen, mobile: isMobile })}>
        <ul>
          {SIDE_MENU_ITEMS.map((i) => (
            <li key={i.key}>
              <NavLink
                to={i.key}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => isMobile && setIsOpen(false)}
              >
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={'prl-3 pb-4'}>
          {!isMobile && (
            <button
              className={b('toggle-button', { open: isOpen })}
              onClick={toggleIsOpen}
            >
              <Icon color={'var(--color-blue-6)'} name={'document'} />
            </button>
          )}
        </div>
      </aside>

      {/* DARK BACKDROP FOR MOBILE */}
      {isMobile && isOpen && (
        <div className={b('backdrop')} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};
