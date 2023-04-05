import { StyleSheet } from 'react-native';
import { wDP } from '@utils/scaling';

export default StyleSheet.create({
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  jc_c: {
    justifyContent: 'center',
  },
  ai_c: {
    alignItems: 'center',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  grow1: {
    flexGrow: 1,
  },
});
