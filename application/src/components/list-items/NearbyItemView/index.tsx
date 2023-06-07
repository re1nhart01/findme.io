import { IUserDiscoverModelShort } from '@type/models/user';
import React, { memo, useCallback, useMemo } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import { Styles } from '@styles/load';
import { firebase_base_url } from '@utils/constants/strings';
import { getAge } from '@utils/helpers';
import { forceNavigator } from '@core/Navigator';

type nearbyItemViewProps = {
  model: IUserDiscoverModelShort;
};

const NearbyItemView: React.FC<nearbyItemViewProps> = ({ model }) => {
  const age = useMemo(() => {
    return getAge(model.birthday);
  }, [model]);

  const avatar = useMemo(() => {
    if (model.avatar) {
      return { uri: `${firebase_base_url(model.avatar)}&d=${new Date().toString()}` };
    }
    return require('@assets/img/photo.png');
  }, [model]);

  const onPressItem = useCallback(() => {
    forceNavigator.navigate('UserProfileScreen', { user_hash: model.user_hash });
  }, [model.user_hash]);

  return (
    <TouchableOpacity onPress={onPressItem} style={[Styles.Layout.flexCol, Styles.Layout.jc_sb, Styles.Layout.ai_c]}>
      <View style={[Styles.Layout.wh85_px, Styles.Container.roundAvatar]}>
        <Image
          style={[Styles.Layout.w100,
            Styles.Layout.h100,
            Styles.Layout.fullRad,
            Styles.Container.whiteBorder2]}
          source={avatar}
        />
      </View>
      <View style={Styles.MarginPadding.pt8}>
        <Text style={[Styles.Text.smallText12Black, Styles.Text.textCenter]}>
          {model.full_name}
          {'\n'}
          {age}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(NearbyItemView);
