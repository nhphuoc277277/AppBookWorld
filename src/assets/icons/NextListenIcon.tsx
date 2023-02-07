import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
import { memo } from 'react';

const SvgComponent = (props: SvgProps) => {
  const { height, width, color } = props;
  return (
    <Svg
      width={width || 24}
      height={height || 24}
      fill="none"
      {...props}
      preserveAspectRatio="xMaxYMid meet"
      viewBox="0 0 24 24">
      <Path
        d="M14.674 12.844a1 1 0 0 0 0-1.688L6.537 5.978A1 1 0 0 0 5 6.822v10.356a1 1 0 0 0 1.537.844l8.137-5.178Z"
        fill={color || '#fff'}
      />
      <Rect x={17} y={5} width={2} height={14} rx={1} fill={color || '#fff'} />
    </Svg>
  );
};

export const NextListenIcon = memo(SvgComponent);
