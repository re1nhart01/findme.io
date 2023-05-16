import { StyleSheet } from 'react-native';
import { hDP, wDP } from '@utils/scaling';
import { colors } from '@utils/colors';

export default StyleSheet.create({
  line: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
  },
  screenLayout: {
    paddingHorizontal: wDP(40),
  },
  serviceScreenLayoutHeader: {
    paddingTop: hDP(40),
  },
  serviceScreenLayout: {
    paddingTop: hDP(80),
  },
  grayBorder1: {
    borderColor: colors.grayE8,
    borderWidth: 1,
  },
  animatedInputContainer: {
    backgroundColor: colors.whiteFF,
    borderColor: colors.grayE8,
    borderWidth: 1,
    borderRadius: 15,
    zIndex: 9,
    height: hDP(60),
    paddingHorizontal: wDP(15),
  },
  animatedInputPlaceholder: {
    backgroundColor: colors.whiteFF,
    zIndex: 10,
    paddingHorizontal: wDP(6),
    marginLeft: wDP(10),
  },
  blackBorder1: {
    borderColor: colors.black00,
    borderWidth: 1,
  },
  redBorder3: {
    borderColor: colors.redE9,
    borderWidth: 3,
  },
  redBorder1: {
    borderColor: colors.redE9,
    borderWidth: 1,
  },
  redBackgroundColor: {
    backgroundColor: colors.redE9_10,
  },
  redE9BackgroundColor: {
    backgroundColor: colors.redE9,
  },
  whiteFFBackgroundColor: {
    backgroundColor: colors.whiteFF,
  },
  pinContainer: {
    width: wDP(61),
    height: hDP(34),
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  stepContainer: {
    width: wDP(20),
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  grayBorderContainer: {
    backgroundColor: colors.black00_50,
    borderRadius: 7,
  },
  stepItem: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    width: wDP(4),
    height: wDP(4),
    borderRadius: 100,
  },
  discoverCardInfo: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    bottom: 0,
    width: '100%',
    minHeight: hDP(120),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    paddingTop: 10,
  },
  dotsLayout: {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    top: hDP(150),
  },
  mapLayout: {
    position: 'absolute',
    zIndex: 999,
    left: 16,
    top: 20,
  },
});
