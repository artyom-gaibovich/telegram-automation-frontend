import './Sider.scss';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RoutePath } from '@shared/config/router';
import { bem } from '@shared/libs';
import { Icon } from '@shared/ui';

const b = bem('sider');

const SIDE_MENU_ITEMS = [
  {
    key: RoutePath.Main,
    label: `Главная страница`,
  },
  {
    key: RoutePath.CategoryList,
    label: `Список категорий`,
  },
  {
    key: RoutePath.TranscriptionList,
    label: `Список транскрипций`,
  },
];

export const Sider = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const isSiderHide = [].includes(location.pathname);

  if (isSiderHide) {
    return null;
  }

  return (
    <aside className={b({ open: isOpen })}>
      <ul>
        {SIDE_MENU_ITEMS.map((i) => (
          <li key={i.key}>
            <NavLink
              to={i.key}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {i.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={'prl-3 pb-4'}>
        <button
          className={b('toggle-button', { open: isOpen })}
          onClick={toggleIsOpen}
        >
          <Icon color={'var(--color-blue-6)'} />
        </button>
      </div>
    </aside>
  );
};
