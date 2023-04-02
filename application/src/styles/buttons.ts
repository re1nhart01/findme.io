import { StyleSheet } from 'react-native';
import { colors } from '@utils/colors';
import { hDP, wDP } from '@utils/scaling';

export default StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.redE9,
    borderRadius: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hDP(18),
  },
  secondaryButton: {
    backgroundColor: colors.whiteFF,
    borderRadius: 15,
    borderColor: colors.whiteF3,
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hDP(18),
  },
  imageButton: {
    backgroundColor: colors.whiteFF,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.whiteF3,
    width: wDP(64),
    height: wDP(64),
  },
});
