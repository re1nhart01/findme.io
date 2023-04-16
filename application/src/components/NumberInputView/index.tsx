import React from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { Styles } from '@styles/load';

type numberInputViewProps = {
  value: string;
  onChange(v: string): void;
  disabled: boolean;
};
const NumberInputView: React.FC<numberInputViewProps> = ({ onChange, value, disabled }) => {
  return (
    <PhoneInput
      textContainerStyle={Styles.Layout.whiteFF_bg}
      codeTextStyle={[Styles.Text.smallText14Black, Styles.Layout.whiteFF_bg]}
      textInputStyle={[Styles.Text.smallText14Black, Styles.Layout.whiteFF_bg]}
      containerStyle={[Styles.Container.animatedInputContainer, { height: void 0 }, Styles.Layout.w100]}
      disabled={disabled}
      value={value}
      onChangeFormattedText={onChange}
    />
  );
};

export { NumberInputView };
