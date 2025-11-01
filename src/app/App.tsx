import './styles/index.scss';
import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';

export const App = () => {
  return (
    <div id="app" className={'app'}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </div>
  );
};
