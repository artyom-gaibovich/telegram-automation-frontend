import './Input.scss';
import type { FC } from 'react';
import { Input as AntInput, type InputProps as AntInputProps } from 'antd';
import { bem } from '@shared/libs';

export interface InputProps
  extends Omit<AntInputProps, 'rootClassName' | 'classNames'> {
  className?: string;
}

const b = bem('input');

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return <AntInput rootClassName={b(null, [className])} {...props} />;
};
