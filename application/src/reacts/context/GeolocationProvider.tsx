import { createContext, useState } from 'react';

const Geolocation = createContext(null);

const GeolocationProvider = () => {
  return (
    <Geolocation.Provider value={null} />
  );
};

export { GeolocationProvider, Geolocation };
