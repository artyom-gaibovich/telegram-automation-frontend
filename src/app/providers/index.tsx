import { type PropsWithChildren, Suspense } from 'react';
import dayjs from 'dayjs';
import { BrowserRouter } from 'react-router-dom';
import { AntdProvider } from '@app/providers/AntdProvider';
import { QueryProvider } from '@app/providers/QueryProvider';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <AntdProvider>
      <QueryProvider>
        <BrowserRouter basename={import.meta.env.VITE_URL_PREFIX}>
          <Suspense fallback="">{children}</Suspense>
        </BrowserRouter>
      </QueryProvider>
    </AntdProvider>
  );
};
