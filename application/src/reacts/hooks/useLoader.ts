import { useEffect, useState } from 'react';

export const useLoader = (timeout: number = 0, isOptimized: boolean = true) => {
  const [getLoading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, timeout);
    return () => {
      setLoading(false);
    };
  }, []);
  console.log(getLoading, 'loading');
  return isOptimized ? getLoading : true;
};
