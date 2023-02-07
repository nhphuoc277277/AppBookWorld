import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: (isReading, config) => ({
    flexDirection: 'row',
    backgroundColor: isReading
      ? `${config.general_active_color}2f`
      : theme.colors.white,
    padding: getSize.m(20),
  }),
  imageStyle: {
    width: getSize.s(45),
    height: getSize.s(45),
    borderRadius: getSize.m(5),
  },
  iconStyle: {
    height: getSize.s(12),
    width: getSize.s(12),
    tintColor: theme.colors.placeholder,
  },
});
