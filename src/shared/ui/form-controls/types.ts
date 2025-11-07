import type { ReactNode } from 'react';
import type { FormItemProps } from '@shared/ui/form-controls';

export interface BaseFormControlProps {
  name: string;
  label?: ReactNode;
  isRequired?: boolean;
  formItemProps?: Omit<FormItemProps, 'className'>;
}
