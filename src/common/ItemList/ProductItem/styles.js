import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: getSize.s(170),
    borderTopLeftRadius: getSize.m(5),
    borderTopRightRadius: getSize.m(5),
  },
  icoNew: {
    height: getSize.s(28),
    width: getSize.s(28),
  },
});
