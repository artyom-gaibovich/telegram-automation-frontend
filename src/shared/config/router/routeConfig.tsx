import type { RouteProps } from 'react-router-dom';
import CategoryListPage from '@pages/category-list/CategoryListPage';
import CreateCategoryPage from '@pages/create-category/CreateCategoryPage';
import EditCategoryPage from '@pages/edit-category/EditCategoryPage';
import LoginPage from '@pages/login/LoginPage';
import MainPage from '@pages/main/MainPage';
import { ScenarioCreatePage } from '@pages/scenario-create/ScenarioCreatePage';
import { ScenarioDetailPage } from '@pages/scenario-detail/ScenarioPage';
import { ScenarioEditPage } from '@pages/scenario-edit/ScenarioEditPage';
import ScenarioListPage from '@pages/scenario-list/ScenarioListPage';
import TranscriptionDetailPage from '@pages/transcription-detail/TranscriptionDetailPage';
import TranscriptionListPage from '@pages/transcription-list/TranscriptionListPage';
import TranscriptionUploadPage from '@pages/transcription-upload/TranscriptionUploadPage';
import { UserChannelCreatePage } from '@pages/user-channel-create/UserChannelCreatePage';
import { UserChannelDetailPage } from '@pages/user-channel-detail/UserChannelDetailPage';
import { UserChannelEditPage } from '@pages/user-channel-edit/UserChannelEditPage';
import { UserChannelsListPage } from '@pages/user-channel-list/UserChannelsListPage';
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
    path: RoutePath.TranscriptionUpload,
    Component: TranscriptionUploadPage,
  },
  {
    path: RoutePath.EditCategory,
    Component: EditCategoryPage,
  },
  {
    path: RoutePath.TranscriptionList,
    Component: TranscriptionListPage,
  },
  {
    path: RoutePath.TranscriptionDetail,
    Component: TranscriptionDetailPage,
  },

  {
    path: RoutePath.ScenarioDetail,
    Component: ScenarioDetailPage,
  },
  {
    path: RoutePath.ScenarioList,
    Component: ScenarioListPage,
  },
  {
    path: RoutePath.ScenarioEdit,
    Component: ScenarioEditPage,
  },
  {
    path: RoutePath.ScenarioCreate,
    Component: ScenarioCreatePage,
  },

  {
    path: RoutePath.UserChannelDetail,
    Component: UserChannelDetailPage,
  },

  {
    path: RoutePath.UserChannelEdit,
    Component: UserChannelEditPage,
  },

  {
    path: RoutePath.UserChannelList,
    Component: UserChannelsListPage,
  },

  {
    path: RoutePath.UserChannelCreate,
    Component: UserChannelCreatePage,
  },

  {
    path: RoutePath.FormConstructor,
    Component: () => <div>Конструктор форм</div>,
  },
];
