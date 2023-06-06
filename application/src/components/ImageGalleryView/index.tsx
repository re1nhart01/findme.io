import React, {memo, useCallback, useMemo} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Styles } from '@styles/load';
import { FlexibleListView } from '@components/FlexibleListView';
import { useLoader } from '@reacts/hooks/useLoader';
import { TextView } from '@components/TextView';
import { firebase_base_url } from '@utils/constants/strings';

type imageGalleryViewProps = {
    photoList: Array<string>;
    bigImagesCount?: number;
    contentContainerStyles?: {};
    onPressSmallImage?(uri: string): void;
    onPressBigImage?(uri: string): void;
    isFirebase?: boolean;
};

const ImageGalleryView: React.FC<imageGalleryViewProps> = ({
  photoList = [],
  bigImagesCount = 2,
  contentContainerStyles,
  onPressBigImage = () => {},
  onPressSmallImage = () => {},
  isFirebase,
}) => {
  const isLoadedGallery = useLoader(500);
  const renderPhoto = useCallback(<T extends object = any>(item: string, index: number) => {
    if (index < bigImagesCount) {
      const bigWidthPercent = bigImagesCount >= 2 ? '48%' : bigImagesCount === 1 ? '100%' : '66%';
      return (
        <TouchableOpacity onPress={() => onPressBigImage(item)} style={{ width: bigWidthPercent, height: 200 }}>
          <Image style={[Styles.Layout.w100, Styles.Layout.h100, { resizeMode: 'cover' }, Styles.Layout.borderR5]} source={{ uri: isFirebase ? `${firebase_base_url(item)}&d=${new Date().toString()}` : item }} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => onPressSmallImage(item)} style={{ width: '31%', height: 122 }}>
        <Image style={[Styles.Layout.w100, Styles.Layout.h100, { resizeMode: 'cover' }, Styles.Layout.borderR5]} source={{ uri: isFirebase ? `${firebase_base_url(item)}&d=${new Date().toString()}` : item }} />
      </TouchableOpacity>
    );
  }, []);

  const renderEmptyView = useCallback(() => {
    return (
      <View
        style={[Styles.Layout.w100,
          Styles.Layout.h150,
          Styles.MarginPadding.mt20,
          Styles.Container.grayBorder1,
          Styles.Layout.flexCenter,
          Styles.Layout.borderR15,
          Styles.Layout.flexCol,
          Styles.MarginPadding.pl16]}
      >
        <TextView styles={[Styles.Text.redHeader, Styles.Text.textCenter]} text="Oops" />
        <TextView styles={[Styles.Text.smallTextBold18, Styles.Text.textCenter]} text="Photos not found" />
      </View>
    );
  }, []);

  return (
    <FlexibleListView
      empty={renderEmptyView()}
      loader={<View />}
      isLoading={!isLoadedGallery}
      scrollStyles={[Styles.MarginPadding.pt8]}
      contentContainerStyles={[Styles.MarginPadding.g10, Styles.Layout.wrap, Styles.Layout.max_w_100pc, Styles.Layout.flexCenter, contentContainerStyles]}
      horizontal
      keyExtractor={(item, index) => `${item}`}
      renderItem={renderPhoto}
      items={photoList}
    />
  );
};

export default memo(ImageGalleryView);
