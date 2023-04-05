import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, wDP } from '@utils/scaling';

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
  w20pc: {
    width: '20%',
  },
  w60pc: {
    width: '60%',
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
  jc_sb: {
    justifyContent: 'space-between',
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
  w_device: {
    width: DEVICE_WIDTH,
  },
  h_device: {
    height: DEVICE_HEIGHT,
  },
});
