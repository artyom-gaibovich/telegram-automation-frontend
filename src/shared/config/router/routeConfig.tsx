import type { RouteProps } from 'react-router-dom';
import CategoryListPage from '@pages/category-list/CategoryListPage';
import CreateCategoryPage from '@pages/create-category/CreateCategoryPage';
import EditCategoryPage from '@pages/edit-category/EditCategoryPage';
import LoginPage from '@pages/login/LoginPage';
import MainPage from '@pages/main/MainPage';
import { RoutePath } from './routePath';

export const routeConfig: ReadonlyArray<RouteProps> = [
  {
    path: RoutePath.Main,
    Component: MainPage,
  },
  {
    path: RoutePath.Login,
    Component: LoginPage,
  },
  {
    path: RoutePath.CategoryList,
    Component: CategoryListPage,
  },
  {
    path: RoutePath.CategoryCreate,
    Component: CreateCategoryPage,
  },
  {
    path: RoutePath.EditCategory,
    Component: EditCategoryPage,
  },
  {
    path: RoutePath.FormConstructor,
    Component: () => <div>Конструктор форм</div>,
  },
];
