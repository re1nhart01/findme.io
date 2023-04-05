import { StyleSheet } from 'react-native';
import { colors } from '@utils/colors';
import { fontSizeDP } from '@utils/scaling';

export default StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  redHeader: {
    color: colors.redE9,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: fontSizeDP(24),
  },
  mediumText24Black: {
    color: colors.black00,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: fontSizeDP(24),
  },
  redSubHeader: {
    color: colors.blue32,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(14),
  },
  primaryButtonText: {
    color: colors.whiteFF,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: fontSizeDP(16),
  },
  smallText14Black: {
    color: colors.black00,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(16),
  },
  smallText13Black: {
    color: colors.black00,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(14),
  },
  smallText16Red: {
    color: colors.redE9,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(16),
    textDecorationLine: 'underline',
  },
  smallText16RedBold: {
    color: colors.redE9,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: fontSizeDP(16),
  },
  smallText12Black: {
    color: colors.black00,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(12),
  },
  smallText12_40Black: {
    color: colors.black00_40,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(12),
  },
  smallTextBold18: {
    color: colors.black00,
    fontFamily: 'Sk-Modernist-Bold',
    fontSize: fontSizeDP(18),
  },
  smallTextRed14: {
    color: colors.redE9,
    fontFamily: 'Sk-Modernist-Regular',
    fontSize: fontSizeDP(14),
  },
  bigBoldBlack34: {
    fontSize: fontSizeDP(34),
    fontFamily: 'Sk-Modernist-Bold',
    color: colors.black00,
  },
  placeholderText: {
    fontSize: fontSizeDP(12),
    fontFamily: 'Sk-Modernist-Regular',
    color: colors.black00,
    opacity: 0.4,
  },

});
