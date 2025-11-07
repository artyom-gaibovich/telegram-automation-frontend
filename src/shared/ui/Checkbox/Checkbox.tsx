import './Checkbox.scss';
import type { FC } from 'react';
import {
  Checkbox as AntCheckbox,
  type CheckboxProps as AntCheckboxProps,
} from 'antd';
import { bem } from '@shared/libs';

export interface CheckboxProps
  extends Omit<AntCheckboxProps, 'className' | 'rootClassName'> {
  className?: string;
}

const b = bem('checkbox');

export const Checkbox: FC<CheckboxProps> = ({ className, ...props }) => {
  return <AntCheckbox rootClassName={b(null, [className])} {...props} />;
};
