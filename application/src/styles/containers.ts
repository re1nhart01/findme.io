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
  serviceScreenLayout: {
    paddingTop: hDP(80),
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
  },
});
