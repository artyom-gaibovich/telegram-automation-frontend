import type { RouteProps } from 'react-router-dom';
import MainPage from '@pages/main/MainPage';
import { RoutePath } from './routePath';

export const routeConfig: ReadonlyArray<RouteProps> = [
  {
    path: RoutePath.Main,
    Component: MainPage,
  },
  {
    path: RoutePath.FormConstructor,
    Component: () => <div>Конструктор форм</div>,
  },
];
