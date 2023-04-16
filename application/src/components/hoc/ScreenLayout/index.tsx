import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '@styles/load';
import { KeyboardAvoidingComponent } from '@components/hoc/KeyboardAvoidingView';
import { colors } from "@utils/colors";

type screenLayoutViewProps = PropsWithChildren<{
    backgroundColor?: string;
    hasKeyboardAvoiding?: boolean;
    header?: JSX.Element
    styles?: {};
}>
const ScreenLayoutView: React.FC<screenLayoutViewProps> = ({ children, backgroundColor, hasKeyboardAvoiding, styles, header }) => {
  return (
    <SafeAreaView style={[Styles.Layout.flex1, { backgroundColor }, styles]}>
      <KeyboardAvoidingComponent>
        {header}
        {
          hasKeyboardAvoiding ?
            children : children
        }
      </KeyboardAvoidingComponent>
    </SafeAreaView>
  );
};

ScreenLayoutView.defaultProps = {
  backgroundColor: colors.whiteFF,
};

export { ScreenLayoutView };
