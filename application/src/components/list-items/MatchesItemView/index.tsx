import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IUserDiscoverModelShort, IUserDiscoverType, UserMatchesListItem } from '@type/models/user';
import { ImageButtonView } from '@components/ImageButtonView';
import { Styles } from '@styles/load';

import XMarkIcon from '@assets/svg/close-small.svg';
import HeartIcon from '@assets/svg/like.svg';
import { colors } from '@utils/colors';
import { forceNavigator } from '@core/Navigator';
import { firebase_base_url } from '@utils/constants/strings';
import { getAge } from '@utils/helpers';

type matchesItemViewProps = {
  model: UserMatchesListItem;
  type: IUserDiscoverType;
  onRemove(user_hash: string): void;
  onLike(user_hash: string): void;
};

const MatchesItemView: React.FC<matchesItemViewProps> = ({ model, type, onRemove, onLike }) => {
  const onItemPress = useCallback(() => {
    forceNavigator.navigate('UserProfileScreen', { user_hash: model.user_hash });
  }, []);

  const getURI = () => {
    if (model.storage_bucket_id) {
      return { uri: `${firebase_base_url(model.storage_bucket_id)}&d=${new Date().toString()}` };
    }
    return require('@assets/img/photo.png');
  };

  return (
    <TouchableOpacity onPress={onItemPress} style={Styles.Container.matchesCardBody}>
      <Image style={[Styles.Layout.wh100_pc]} source={getURI()} />
      <View style={[Styles.Layout.absolute_bottom]}>
        <Text style={[Styles.Layout.flexRow, Styles.Text.primaryButtonText, Styles.MarginPadding.pb4, Styles.MarginPadding.pl16]}>
          <Text numberOfLines={1} style={[]}>
            {model.full_name}
            ,
            {' '}
          </Text>
          <Text style={[]}>{getAge(model.birthday)}</Text>
        </Text>
        <View style={[Styles.Container.matchesCardActions, Styles.Layout.flexRow, Styles.Layout.ai_c, type !== 'incoming' ? [Styles.Layout.w100, Styles.Layout.flexCenter] : {}]}>
          <ImageButtonView
            color={colors.whiteFF}
            onPress={() => onRemove(model.user_hash)}
            styles={[Styles.Button.matchesActions, Styles.Layout.flexCenter, type === 'incoming' ? [Styles.Layout.w100] : {}]}
            width={24}
            height={24}
            Icon={XMarkIcon}
          />
          <View />
          {type !== 'incoming' ? (
            <ImageButtonView
              color={colors.whiteFF}
              onPress={() => onLike(model.user_hash)}
              styles={[Styles.Button.matchesActions, Styles.Layout.flexCenter]}
              width={24}
              height={24}
              Icon={HeartIcon}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { MatchesItemView };
