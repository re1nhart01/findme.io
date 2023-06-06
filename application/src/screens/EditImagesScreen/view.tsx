import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import ImageGalleryView from '@components/ImageGalleryView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { ImageButtonView } from '@components/ImageButtonView';
import PlusIcon from '@assets/svg/plus_circle.svg';
import { Asset } from 'react-native-image-picker';
import {
  ImageCarouselModal,
  imageCarouselModalForward,
} from '@components/common/modals/ImageCarouselModal';
import { DefaultLoaderView } from '@components/loaders/DefaultLoaderView';

export type editImagesScreenPresenterProps = {
  handleAddImage(): void;
  imageList: Array<Asset>
  imagesUri: Array<string>;
  carouselModalRef: React.RefObject<imageCarouselModalForward>;
  openFullScreenCarousel(images: string): void;
  handleOnSave(): Promise<void>;
    loading: boolean;
};

const maxImagesLength = 10;

const EditImagesScreenPresenter: React.FC<editImagesScreenPresenterProps> = ({ loading, handleAddImage, imageList, imagesUri, carouselModalRef, openFullScreenCarousel, handleOnSave }) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader, Styles.Container.screenLayout]}
    >
      <MainHeaderView
        customHeader={(
          <View>
            <Text style={[Styles.Text.smallTextBold18]}>
              { imagesUri.length }
              {' '}
              /
              {' '}
              { maxImagesLength }
            </Text>
          </View>
          )}
        headerText="edit_photos"
      />
      <ScrollView contentContainerStyle={[Styles.MarginPadding.pb10]}>
        <View>
          <ImageGalleryView
            onPressBigImage={openFullScreenCarousel}
            onPressSmallImage={openFullScreenCarousel}
            bigImagesCount={1}
            photoList={imagesUri}
          />
          { imagesUri.length <= 9 && (
          <ImageButtonView
            width={32}
            height={32}
            styles={[Styles.Button.imageButton, Styles.Layout.flexCenter, Styles.Layout.w100, Styles.Container.blackBorder1, Styles.MarginPadding.mt10]}
            Icon={PlusIcon}
            onPress={handleAddImage}
          />
          )}
        </View>
        <View style={[Styles.MarginPadding.mt10]}>
          <PrimaryButtonView
            disabled={loading}
            styles={{
              outline: Styles.Button.primaryButton,
              text: Styles.Text.primaryButtonText,
              disabled: { backgroundColor: colors.redE9_50 },
            }}
            text="save"
            onPress={handleOnSave}
          />
          <DefaultLoaderView show={loading} color={colors.redE9} size={40} />
        </View>
      </ScrollView>
      <ImageCarouselModal
        images={imagesUri}
        ref={carouselModalRef}
      />
    </ScreenLayoutView>
  );
};

export { EditImagesScreenPresenter };
