export enum RoutePath {
  Main = '/',
  FormConstructor = '/form-constructor',
  Login = '/login',
  CategoryList = '/category-list',
  CategoryCreate = '/category/create',
  EditCategory = '/category/edit/:id',
  TranscriptionUpload = '/transcription/upload',
  TranscriptionList = '/transcription/list',
  TranscriptionDetail = '/transcription/:id',

  ScenarioDetail = '/scenario/:id',
  ScenarioList = '/scenario',
  ScenarioCreate = '/scenario/create',
  ScenarioEdit = '/scenario/:id/edit',

  UserChannelList = '/user-channels',
  UserChannelCreate = '/user-channels/create',
  UserChannelDetail = '/user-channels/:id',
  UserChannelEdit = '/user-channels/:id/edit',
}
