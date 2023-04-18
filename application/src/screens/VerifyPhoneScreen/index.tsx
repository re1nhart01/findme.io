import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VerifyScreenPresenter, verifyScreenPresenterProps } from '@screens/VerifyPhoneScreen/view';
import { CONSTANTS } from '@utils/constants/strings';

type verifyScreenContainerProps = {};

type verifyScreenContainerState = {
  codeInputValue: string;
};

const VerifyScreenContainer: React.FC<verifyScreenContainerProps> = ({}) => {
  // this stuff after all steps markup should be in redux;
  const [getState, setState] = useState<verifyScreenContainerState>({
    codeInputValue: '',
  });
  const timerRef = useRef({
    runTimer: () => {},
  });

  const onEraseInput = useCallback(() => {
    const v = getState.codeInputValue;
    if (v.length <= 0) {
      return;
    }
    setState({ ...getState, codeInputValue: v.substring(0, v.length - 1) });
  }, [getState]);

  const onPressNumber = useCallback((n: number) => {
    const v = getState.codeInputValue;
    if (v.length >= CONSTANTS.countOfNums) {
      return;
    }
    const newInputVal = v + n;
    setState({ ...getState, codeInputValue: newInputVal });
    if (newInputVal.length === 4) {
      // here it should be checking code;
      console.warn('bebra', newInputVal);
    }
  }, [getState]);

  useEffect(() => {
    if (timerRef && timerRef.current) {
      timerRef.current.runTimer();
    }
  }, []);

  const onCodeInputChange = useCallback((v: string) => {
    setState({ ...getState, codeInputValue: v });
  }, [getState]);

  const ViewProps: verifyScreenPresenterProps = {
    codeInputValue: getState.codeInputValue,
    onCodeInputChange,
    onPressNumber,
    onEraseInput,
    timerRef,
  };

  return (
    <VerifyScreenPresenter {...ViewProps} />
  );
};

export { VerifyScreenContainer };
