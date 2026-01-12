import type { AnyObject } from 'yup';
import { Yup } from '@shared/libs';

export interface FormModel<
  T extends object,
  U extends object = never,
  V extends object = never,
> {
  initialValues: T;
  validationSchema?: Yup.ObjectSchema<AnyObject | null>;
  mapToServer?: (values: T) => U;
  mapFromServer?: (data: V) => T;
}
