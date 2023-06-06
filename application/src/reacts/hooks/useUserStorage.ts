import { useCallback, useState } from 'react';
import { __current_user__ } from '@core/CurrentUser';
import { preferences, tokens, userData } from '@type/models/user';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { firebase_base_url } from '@utils/constants/strings';

export type IUserStorage = {
  user: userData;
  tokens: tokens;
  preferences: preferences
};

export const useUserStorage = () => {
  const { httpCaller } = useSafeHTTP();
  const currentUser = __current_user__;
  const [userState, setUserState] = useState<IUserStorage>({
    user: currentUser.userData,
    tokens: currentUser.tokens,
    preferences: currentUser.preferences,
  });

  const updateUser = useCallback(async (user: userData, preferences: preferences | null = null) => {
    if (!user.user_hash) return;
    currentUser.updateUser(user).then(() => {
      setUserState((prev) => ({ ...prev, user, preferences: preferences || currentUser.preferences }));
    });
    await currentUser.saveUser();
  }, [currentUser]);

  const fetchUser = useCallback(async () => {
    const userData = await httpCaller(RequestForge.getMeCall, {});
    if (userData?.data) {
      const { user, preferences } = userData.data;
      await updateUser(user, preferences);
    }
  }, [httpCaller, updateUser]);

  const updateUserField = useCallback((k: keyof userData, value: any) => {
    currentUser.userData[k] = value as never;
    setUserState((prev) => ({ ...prev, user: { ...prev.user, [k]: value } }));
  }, [currentUser.userData, setUserState]);

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
    updateUserField,
    fetchUser,
    userData: __current_user__.userData,
  };
};
