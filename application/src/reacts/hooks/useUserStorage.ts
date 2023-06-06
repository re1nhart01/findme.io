import { useCallback, useState } from 'react';
import { __current_user__ } from '@core/CurrentUser';
import { preferences, tokens, userData } from '@type/models/user';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';

export const useUserStorage = () => {
  const { httpCaller } = useSafeHTTP();
  const currentUser = __current_user__;
  const [userState, setUserState] = useState<{ user: userData; tokens: tokens; preferences: preferences }>({
    user: currentUser.userData,
    tokens: currentUser.tokens,
    preferences: currentUser.preferences,
  });

  const updateUser = useCallback(async (user: userData) => {
    if (!user.user_hash) return;
    currentUser.updateUser(user).then(() => {
      setUserState((prev) => ({ ...prev, user }));
    });
    await currentUser.saveUser();
  }, [currentUser]);

  const updateTokens = useCallback(async (tokenData: tokens) => {
    if (!tokenData.refresh_token || !tokenData.access_token || !tokenData.expiration_time) return;
    currentUser.saveTokens(tokenData).then(() => {
      setUserState((prev) => ({ ...prev, tokens: tokenData }));
    });
    await currentUser.saveUser();
  }, [currentUser]);

  return {
    userState,
    setUserState,
    logOut: currentUser.logOut,
    updateTokens,
    updateUser,
  };
};
