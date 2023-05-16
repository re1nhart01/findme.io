import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, hDP, wDP } from '@utils/scaling';
import { colors } from '@utils/colors';

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
  jc_fe: {
    justifyContent: 'flex-end',
  },
  h480: {
    height: hDP(480),
  },
  cover: {
    resizeMode: 'cover',
  },
  ai_c: {
    alignItems: 'center',
  },
  ai_fs: {
    alignItems: 'flex-start',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
  },
  borderR15: {
    borderRadius: 15,
  },
  absolute0: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  // bg
  whiteFF_bg: {
    backgroundColor: colors.whiteFF,
  },
  fullRad: {
    borderRadius: 999,
  },
  rad15: {
    borderRadius: 15,
  },
  wh45_px: {
    width: wDP(45),
    height: wDP(45),
  },
  wh65_px: {
    width: wDP(65),
    height: wDP(65),
  },
  wh70_px: {
    width: wDP(70),
    height: wDP(70),
  },
  w33_3pc: {
    width: '33.3%',
  },
  h60: {
    height: hDP(60),
  },
  wrap: {
    flexWrap: 'wrap',
  },
  none: {
    display: 'none',
  },
  w0: {
    width: 0,
  },
  h0: {
    height: 0,
  },
  h100_px: {
    height: 100,
  },
  w100_px: {
    width: 100,
  },
  min52_h: {
    minHeight: hDP(52),
  },
});
