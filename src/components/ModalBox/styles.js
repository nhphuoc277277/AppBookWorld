import { getSize } from '@utils/responsive';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0,
  },
  content: position => ({
    justifyContent: position === 'center' ? 'center' : 'flex-end',
    paddingHorizontal: position === 'center' ? getSize.m(12) : 0,
    top: position === 'top-right' ? -130 : null,
    alignSeft: 'right',
  }),
});
