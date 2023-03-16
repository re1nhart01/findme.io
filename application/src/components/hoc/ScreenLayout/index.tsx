import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '@styles/load';

type screenLayoutViewProps = PropsWithChildren<{
    backgroundColor?: string;
    hasKeyboardAvoiding?: boolean;
}>
const ScreenLayoutView: React.FC<screenLayoutViewProps> = ({ children, backgroundColor, hasKeyboardAvoiding }) => {
  return (
    <SafeAreaView style={[Styles.Layout.flex1, { backgroundColor }]}>
      {
        hasKeyboardAvoiding ?
          children : children
      }
    </SafeAreaView>
  );
};

export { ScreenLayoutView };
