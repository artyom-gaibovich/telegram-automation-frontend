import './Button.scss';
import type { FC } from 'react';
import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import { bem } from '@shared/libs';

const b = bem('button');

export interface ButtonProps
  extends Omit<AntButtonProps, 'className' | 'rootClassName' | 'classNames'> {
  className?: string;
}

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return <AntButton rootClassName={b(null, [className])} {...props} />;
};
