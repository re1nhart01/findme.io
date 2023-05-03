import { useTypedDispatch, useTypedSelector } from '@reacts/hooks/useRedux';
import { useCallback, useRef, useState } from 'react';
import { Boundary } from '@core/http/Boundary';
import { globalActions } from '@redux/slices/global.slice';
import { RootState } from '@redux/store/store';
import { Arguments, ValueOf } from '@type/ts_extension';
import { queueMicrotask } from '@utils/helpers';
import { AxiosResponse } from '@type/service';

export const useSafeHTTP = (getStorage: ((state: RootState) => RootState) | null = null) => {
  const dispatch = useTypedDispatch();
  const prevValue = useRef<any>(null);
  const state = useTypedSelector(getStorage || ((state) => state));

  const httpCaller = useCallback(async <T extends (args: any) => any>(method: T, args: Arguments<T>): Promise<AxiosResponse<Exclude<Awaited<ReturnType<T>>, Boundary>> | null> => {
    if (getStorage === null) {
      const response = await method(args);
      if (response instanceof Boundary) {
        dispatch(globalActions.openFatalModal({ show: true, boundary: response }));
        return null;
      }
      prevValue.current = response;
      return response;
    }
    queueMicrotask(() => {
      dispatch(method(args));
    }).then();
    return null;
  }, [dispatch, getStorage]);

  return { prevValue, state, httpCaller };
};
