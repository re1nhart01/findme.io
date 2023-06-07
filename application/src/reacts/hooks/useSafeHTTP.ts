import { useTypedDispatch } from '@reacts/hooks/useRedux';
import { useCallback, useRef, useState } from 'react';
import { Boundary } from '@core/http/Boundary';
import { globalActions } from '@redux/slices/global.slice';
import { Arguments } from '@type/ts_extension';

export const useSafeHTTP = () => {
  const [{ loading, error }, setState] = useState<{loading: boolean, error: boolean}>({
    error: false,
    loading: false,
  });
  const dispatch = useTypedDispatch();
  const prevValue = useRef<any>(null);

  const httpCaller = useCallback(async <T extends (args: any) => any>(method: T, args: Arguments<T>): Promise<Exclude<Awaited<ReturnType<T> | null>, Boundary>> => {
    setState((prev) => ({ ...prev, loading: true }));
    const response: ReturnType<T> | Boundary = await method(args);
    if (!response) {
      setState((prev) => ({ ...prev, loading: false, error: false }));
    }
    if (response instanceof Boundary) {
      setState((prev) => ({ ...prev, loading: false, error: true }));
      dispatch(globalActions.openFatalModal({ show: true, boundary: response }));
      return null;
    }
    prevValue.current = response;
    setState((prev) => ({ ...prev, loading: false, error: response?.status > 204 }));
    return response?.status > 204 ? null : response;
  }, [dispatch]);

  const reduxCaller = useCallback(async <T extends (args: any) => any>(
    actionList: {[key: string]: Function},
    method: T,
    args: Arguments<T>,
    successMethod: Function,
    callback: Function = () => {},
  ): Promise<void> => {
    try {
      dispatch(actionList.loadStart());
      const response = await method(args);
      if (response instanceof Boundary) {
        dispatch(globalActions.openFatalModal({ show: true, boundary: response }));
        return;
      }
      if (response.status > 204) {
        dispatch(actionList.loadError(response.data.customStatusMessage));
        return;
      }
      console.log(response.data, 'abab')
      dispatch(successMethod(response.data));
      await callback(response.data);
    } catch (e) {
      dispatch(actionList.loadError('reduxCaller ex.'));
      console.log('userRegisterThunk.ex', e);
    }
  }, [dispatch]);

  return { prevValue, httpCaller, reduxCaller, error, loading };
};
