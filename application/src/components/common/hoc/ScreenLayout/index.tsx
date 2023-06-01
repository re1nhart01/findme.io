import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles } from '@styles/load';
import { KeyboardAvoidingComponent } from '@components/common/hoc/KeyboardAvoidingView';
import { colors } from '@utils/colors';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

type screenLayoutViewProps = PropsWithChildren<{
    disableKeyboardPersist?: boolean;
    backgroundColor?: string;
    hasKeyboardAvoiding?: boolean;
    header?: JSX.Element
    styles?: {};
    useKeyboardAvoid?: boolean;
}>
const ScreenLayoutView: React.FC<screenLayoutViewProps> = ({ children, backgroundColor, hasKeyboardAvoiding, styles, header, useKeyboardAvoid, disableKeyboardPersist }) => {
  return (
    <SafeAreaView style={[Styles.Layout.flex1, { backgroundColor }, styles]}>
      {useKeyboardAvoid ? (
        <KeyboardAvoidingComponent>
          {header}
          {children}
        </KeyboardAvoidingComponent>
      ) : (
        <>
          {disableKeyboardPersist ? (
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                {header}
                {children}
              </View>
            </TouchableWithoutFeedback>
          )
            : (
              <React.Fragment>
                {header}
                {children}
              </React.Fragment>
            ) }
        </>
      )}
    </SafeAreaView>
  );
};

ScreenLayoutView.defaultProps = {
  backgroundColor: colors.whiteFF,
};

export { ScreenLayoutView };
