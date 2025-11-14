import { theme, type ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontSize: 16,
    controlHeight: 38,
    colorPrimary: '#d63a51', // --color-primary
    colorBgContainerDisabled: 'rgba(0,0,0,0.05)',
    colorTextDisabled: 'rgba(0,0,0,0.6)',
  },

  components: {
    Select: {
      optionActiveBg: 'rgba(from var(--color-blue-1) r g b / 75%)',
      optionSelectedBg: 'var(--color-secondary)',
      optionSelectedColor: 'white',
      optionFontSize: 14,
      optionHeight: 32,
    },
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      // color=blue
      blue1: 'var(--color-blue-1)',
      blue2: 'var(--color-blue-2)',
      blue3: 'var(--color-blue-3)',
      blue4: 'var(--color-blue-4)',
      blue5: 'var(--color-blue-5)',
      blue6: 'var(--color-blue-6)',
      blue7: 'var(--color-blue-7)',
      blue8: 'var(--color-blue-8)',
      blue9: 'var(--color-blue-9)',
      blue10: 'var(--color-blue-10)',
      // color=red
      red1: 'var(--color-red-1)',
      red2: 'var(--color-red-2)',
      red3: 'var(--color-red-3)',
      red4: 'var(--color-red-4)',
      red5: 'var(--color-red-5)',
      red6: 'var(--color-red-6)',
      red7: 'var(--color-red-7)',
      red8: 'var(--color-red-8)',
      red9: 'var(--color-red-9)',
      red10: 'var(--color-red-10)',
    },
    Input: {},
    DatePicker: {
      activeShadow: '0 0 0 1px var(--color-primary)',
    },
  },
};
