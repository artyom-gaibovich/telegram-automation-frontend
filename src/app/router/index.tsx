import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@shared/config/router';
import { MainLayout } from '@widgets/layouts';

export const AppRouter = () => {
  return (
    <MainLayout>
      <Routes>
        {routeConfig.map((routeProps) => (
          <Route key={routeProps.path} {...routeProps} />
        ))}
      </Routes>
    </MainLayout>
  );
};
