import './FormItem.scss';
import type { FC, ReactNode } from 'react';
import { Form as AntForm, type FormItemProps as AntFormItemProps } from 'antd';
import { bem } from '@shared/libs';

export interface FormItemProps
  extends Omit<AntFormItemProps, 'rootClassName' | 'className'> {
  className?: string;
  label?: ReactNode;
  isRequired?: boolean;
  error?: string;
  touched?: boolean;
}

const b = bem('form-item');

export const FormItem: FC<FormItemProps> = ({
  className,
  label,
  isRequired = false,
  error,
  touched,
  ...props
}) => {
  return (
    <AntForm.Item
      rootClassName={b(null, [className])}
      label={label}
      required={isRequired}
      validateStatus={touched && error ? 'error' : undefined}
      help={touched && error ? error : undefined}
      {...props}
    />
  );
};
