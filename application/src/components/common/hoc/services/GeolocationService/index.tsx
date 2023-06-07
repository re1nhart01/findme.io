import React, { PropsWithChildren, memo, useCallback, useEffect, useMemo } from 'react';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { __app__ } from '@core/MainActivity';
import { RequestForge } from '@core/http/RequestForge';
import { GeoError, GeoPosition } from 'react-native-geolocation-service';
import { useUserStorage } from '@reacts/hooks/useUserStorage';
import * as http from 'http';
import { __current_user__ } from '@core/CurrentUser';
import messaging from '@react-native-firebase/messaging';

type geolocationServiceProps = PropsWithChildren<{}>;
const GeolocationService: React.FC<geolocationServiceProps> = ({ children }) => {
  const { httpCaller } = useSafeHTTP();
  const { updateUserField } = useUserStorage();
  const notificationToken = useMemo(() => messaging().getToken(), []);
  const onRequestGeolocation = useCallback(async () => {
    await __app__.geo.requestGeoPermissions(async () => {
      __app__.geo.updateGeo().then((async (el) => {
        if ((el as GeoError).code !== void 0) {
        } else {
          const { coords: { longitude, latitude } } = el as GeoPosition;
          await httpCaller(RequestForge.requestUpdateGeolocationCall, { lat: latitude, long: longitude });
          updateUserField('lat', latitude);
          updateUserField('long', longitude);
        }
      }));
    });
  }, [httpCaller]);

  const onUpdateToken = useCallback(async () => {
    notificationToken.then(async (token) => {
      await httpCaller(RequestForge.updatePushToken, token);
    })
  }, []);

  useEffect(() => {
    onRequestGeolocation().then();
    onUpdateToken().then();
  }, []);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default memo(GeolocationService);
