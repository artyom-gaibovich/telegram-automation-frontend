import './InputTextarea.scss';
import type { FC } from 'react';
import { Input } from 'antd';
import type { TextAreaProps as AntTextareaProps } from 'antd/es/input';
import { bem } from '@shared/libs';

export interface InputTextareaProps
  extends Omit<AntTextareaProps, 'rootClassName' | 'classNames'> {
  className?: string;
}

const b = bem('textarea');

export const InputTextarea: FC<InputTextareaProps> = ({
  className,
  ...props
}) => {
  return <Input.TextArea rootClassName={b(null, [className])} {...props} />;
};
