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
        d="M9.326 12.844a1 1 0 0 1 0-1.688l8.137-5.178A1 1 0 0 1 19 6.822v10.356a1 1 0 0 1-1.537.844l-8.137-5.178Z"
        fill={color || '#fff'}
      />
      <Rect
        width={2}
        height={14}
        rx={1}
        transform="matrix(-1 0 0 1 7 5)"
        fill={color || '#fff'}
      />
    </Svg>
  );
};

export const PreviousListenIcon = memo(SvgComponent);
