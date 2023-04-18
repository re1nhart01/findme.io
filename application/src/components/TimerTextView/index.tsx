import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Text } from 'react-native';
import { Styles } from '@styles/load';
import { CONSTANTS } from '@utils/constants/strings';
import { queueMicrotask } from '@utils/helpers';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

type timerTextViewProps = {
  onEnd(): void;
};
const TimerTextView = forwardRef<{ runTimer:() => void }, timerTextViewProps>(({ onEnd }, ref) => {
  const [getTextNum, setTextNum] = useState<number>(CONSTANTS.numberOfSeconds - 1);
  const timeoutId = useRef<TimeoutId>();
  const countRef = useRef(CONSTANTS.numberOfSeconds - 1);

  useImperativeHandle(ref, () => ({
    runTimer,
  }));

  const tickTimer = useCallback(() => {
    if (countRef.current <= 0) {
      onEnd && onEnd();
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current!);
        return;
      }
      return;
    }
    timeoutId.current = setTimeout(() => {
      tickTimer();
      setTextNum(countRef.current);
      countRef.current--;
    }, 1020);
  }, [getTextNum, onEnd, timeoutId]);

  const runTimer = useCallback(() => {
    setTextNum(CONSTANTS.numberOfSeconds);
    queueMicrotask(tickTimer).then();
  }, [tickTimer]);

  useEffect(() => {
    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current!);
      }
    };
  }, []);

  return (
    <Text style={[Styles.Text.bigBoldBlack34, Styles.Text.textCenter]}>
      {getTextNum}
    </Text>
  );
});

export { TimerTextView };
