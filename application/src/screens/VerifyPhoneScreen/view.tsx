import React, { MutableRefObject, RefObject } from "react";
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { colors } from '@utils/colors';
import { StatelessButtonMatrixView } from '@components/ButtonMatrixView';
import EraseIcon from '@assets/svg/erase.svg';
import { CodeNumberInputView } from '@components/CodeNumberInputView';
import { CONSTANTS } from '@utils/constants/strings';
import { TimerTextView } from '@components/TimerTextView';

export type verifyScreenPresenterProps = {
  codeInputValue: string;
  onCodeInputChange(s: string): void;
  onEraseInput(): void;
  onPressNumber(n: number): void;
  timerRef: MutableRefObject<{ runTimer: () => void; }>;
};

const VerifyScreenPresenter: React.FC<verifyScreenPresenterProps> = ({ codeInputValue, onCodeInputChange, onEraseInput, onPressNumber, timerRef }) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView />
      <View style={[Styles.MarginPadding.mt32, Styles.MarginPadding.mb32]}>
        <TimerTextView ref={timerRef} onEnd={() => { console.warn('zxc') }} />
        <TextView text="text_timer" styles={[Styles.Text.smallTextRegular18, Styles.Text.textCenter]} />
      </View>
      <View style={[Styles.MarginPadding.mb64]}>
        <CodeNumberInputView
          onChange={onCodeInputChange}
          overValue={codeInputValue}
          countOfDigits={CONSTANTS.numberOfSeconds}
        />
      </View>
      <View>
        <StatelessButtonMatrixView
          onNumberButtonPress={onPressNumber}
          eraseButton={{
            icon: <EraseIcon />,
            disabled: false,
            onPress: onEraseInput }}
        />
      </View>
    </ScreenLayoutView>
  );
};

export { VerifyScreenPresenter };
