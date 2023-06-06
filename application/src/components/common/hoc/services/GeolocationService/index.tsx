import React, { PropsWithChildren, memo, useCallback } from 'react';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { __app__ } from '@core/MainActivity';

type geolocationServiceProps = PropsWithChildren<{}>;
const GeolocationService: React.FC<geolocationServiceProps> = ({ children }) => {
  const { httpCaller } = useSafeHTTP();

  const onRequestGeolocation = useCallback(async () => {
    await __app__.geo.requestGeoPermissions(() => {
      const geoResult = __app__.geo.updateGeo();
    });
  }, []);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default memo(GeolocationService);
