import './Icon.scss';
import { type SVGProps } from 'react';
import { bem } from '@shared/libs';
import { ICON_LIBRARY } from '@shared/ui/Icon/iconLibrary';

const b = bem('icon');

type SvgElementProps = Omit<SVGProps<SVGSVGElement>, 'title'>;

export interface IconProps extends SvgElementProps {
  name: keyof typeof ICON_LIBRARY;
  color?: string;
}

export const Icon = ({
  className = '',
  name,
  color,
  ...svgProps
}: IconProps) => {
  const IconComponent = ICON_LIBRARY[name];

  if (!IconComponent) {
    console.warn(`Иконка "${name}" не найдена в ICON_LIBRARY`);
    return null;
  }

  return (
    <span className={b(null, [className])} style={{ color }}>
      <IconComponent {...svgProps} />
    </span>
  );
};
