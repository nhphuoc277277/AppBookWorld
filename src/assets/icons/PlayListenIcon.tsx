import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
import { memo } from 'react';

const SvgComponent = (props: SvgProps) => {
  const { height, width, color } = props;
  return (
    <Svg
      width={width || 56}
      height={height || 56}
      fill="none"
      {...props}
      preserveAspectRatio="xMaxYMid meet"
      viewBox="0 0 56 56">
      <Circle cx={28} cy={28} r={28} fill={color || '#2F3142'} />
      <Path
        d="M37.643 28.848a1 1 0 0 0 0-1.696L24.53 18.956a1 1 0 0 0-1.53.848v16.392a1 1 0 0 0 1.53.848l13.113-8.196Z"
        fill={'#fff'}
      />
    </Svg>
  );
};

export const PlayListenIcon = memo(SvgComponent);
