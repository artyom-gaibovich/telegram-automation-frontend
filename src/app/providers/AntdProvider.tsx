import type { PropsWithChildren } from 'react';
import { App, ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import { antdTheme } from '@shared/config/antd';
import '@ant-design/v5-patch-for-react-19';

export const AntdProvider = ({ children }: PropsWithChildren) => (
  <ConfigProvider locale={locale} theme={antdTheme} wave={{ disabled: true }}>
    <App
      notification={{ placement: 'topRight' }}
      message={{ top: 50, duration: 5 }}
    >
      {children}
    </App>
  </ConfigProvider>
);
