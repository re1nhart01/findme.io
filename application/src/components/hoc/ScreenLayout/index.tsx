import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '@styles/load';

type screenLayoutViewProps = PropsWithChildren<{
    backgroundColor?: string;
    hasKeyboardAvoiding?: boolean;
    styles?: {};
}>
const ScreenLayoutView: React.FC<screenLayoutViewProps> = ({ children, backgroundColor, hasKeyboardAvoiding, styles }) => {
  return (
    <SafeAreaView style={[Styles.Layout.flex1, { backgroundColor }, styles]}>
      {
        hasKeyboardAvoiding ?
          children : children
      }
    </SafeAreaView>
  );
};

export { ScreenLayoutView };
