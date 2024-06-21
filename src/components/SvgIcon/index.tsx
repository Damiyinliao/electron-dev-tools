import { css } from '@emotion/css';
import { useMemo } from 'react';

interface SvgIconProps {
  prefix?: string;
  name: string;
  color?: string;
  size?: string | number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const SvgIcon = (props: SvgIconProps) => {
  const {
    prefix = 'icon',
    name,
    color = 'currentColor',
    size = 16,
    className,
    style = {cursor: 'pointer'},
    onClick
  } = props;
  const symboldId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
  return (
    <svg
      style={style}
      className={className}
      aria-hidden="true"
      width={size}
      height={size}
      fill={color}
      onClick={onClick}
    >
      <use xlinkHref={symboldId} />
    </svg>
  );
};

export default SvgIcon;