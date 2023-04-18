import { CONSTANTS } from '@utils/constants/strings';

export const toRadiansCoords = (degrees: number): number => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

export const HaversineCalculation = (dLat: number, dLon: number, lat1: number, lat2: number): number => {
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadiansCoords(lat1)) *
    Math.cos(toRadiansCoords(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(CONSTANTS.earthRadius * c).toFixed(3);
};

export const queueMicrotask = (cb: () => void) => Promise.resolve()
  .then(cb)
  .catch((err) => setTimeout(() => { throw err; }, 0));
