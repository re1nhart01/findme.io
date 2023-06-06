import { Coords } from '@type/defaults';
import { HaversineCalculation, toRadiansCoords } from '@utils/helpers';
import { PERMISSIONS, check, checkMultiple, request, requestMultiple } from 'react-native-permissions';
import { Alert } from 'react-native';
import Geolocation, { GeoError, GeoPosition } from 'react-native-geolocation-service';

export class GeolocationService {
  public calculateKilometers(coords1: Coords, coords2: Coords): number {
    const { x: x1, y: y1 } = coords1;
    const { x: x2, y: y2 } = coords2;

    const dLat = toRadiansCoords(x2 - x1);
    const dLon = toRadiansCoords(y2 - y1);

    return HaversineCalculation(dLat, dLon, x1, x2);
  }

  public async requestGeoPermissions(onGranted: Function) {
    const check = await checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ]);
    const fine = check['android.permission.ACCESS_FINE_LOCATION'];
    const coarse = check['android.permission.ACCESS_COARSE_LOCATION'];
    if (fine === 'granted' && coarse === 'granted') {
      onGranted && onGranted();
    } else if (fine === 'unavailable' && coarse === 'unavailable') {
      Alert.alert('Warning', 'Location on this device is unavailable');
    } else if (fine === 'denied' && coarse === 'denied') {
      await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]);
    } else if (fine === 'blocked' && coarse === 'blocked') {
      Alert.alert('Warning', 'Location on this device is blocked. Go to settings and change');
    }
  }

  public async updateGeo(): Promise<GeoPosition | GeoError> {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          // See error code charts below.
          resolve(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  }
}
