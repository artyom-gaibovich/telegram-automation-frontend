import * as Yup from 'yup';
import locale from './locale';

Yup.setLocale(locale);

/**
 * Запрет на латинские символы в строке
 */
Yup.addMethod(
  Yup.string,
  'noLatin',
  function (message = locale.mixed!.default) {
    return this.test('no-latin', message, function (value) {
      if (!value) return true;

      return !/[a-z]+/i.test(value);
    });
  },
);

export { Yup };

declare module 'yup' {
  interface StringSchema {
    noLatin(message?: string): StringSchema;
  }
}
