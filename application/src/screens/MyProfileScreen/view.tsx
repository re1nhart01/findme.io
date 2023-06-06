import React, { useCallback } from 'react';

import GalleryIcon from '@assets/svg/gallery.svg';
import SettingsIcon from '@assets/svg/settings.svg';
import SettingsGearIcon from '@assets/svg/settings_val.svg';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import {
  Animated,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { FieldRowView } from '@components/UserProfileRowView';
import { ImageButtonView } from '@components/ImageButtonView';
import ReadMoreTextView from '@components/ReadMoreTextView';
import TextPathView from '@components/TextPathView';
import ImageGalleryView from '@components/ImageGalleryView';
import { FlexibleListView } from '@components/FlexibleListView';
import AnimatedAvatarView from '@components/common/animated/AnimatedAvatarView';
import AnimatedHeaderView from '@components/common/animated/AnimatedHeaderView';
import {
  ImageCarouselModal,
  imageCarouselModalForward,
} from '@components/common/modals/ImageCarouselModal';
import { IUserStorage } from '@reacts/hooks/useUserStorage';
import { getAge } from '@utils/helpers';
import { InterestsList } from '@utils/constants/strings';
import { TextView } from '@components/TextView';
import {
  handleEditBasicInformation,
  handleEditImages,
  handleEditMood,
  handleSelectGendersPress,
  handleSelectInterestsPress,
  handleSelectTagsPress,
  handleSettingsPress,
} from '@screens/MyProfileScreen/utils';

export type myProfileScreenPresenterProps = {
  handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  headerImageAnim: Animated.Value;
  carouselModalRef: React.RefObject<imageCarouselModalForward>;
  openFullScreenCarousel(): void;
  userState: IUserStorage;
  handleRemovePhotos(item: string): void;
};

const MyProfileScreenPresenter: React.FC<myProfileScreenPresenterProps> = ({
  handleOnScroll,
  headerImageAnim,
  carouselModalRef,
  openFullScreenCarousel,
  handleRemovePhotos,
  userState: { user },
}) => {
  const renderSettingGearButton = useCallback((handler: (event: GestureResponderEvent) => void): JSX.Element => {
    return (
      <ImageButtonView
        onPress={handler}
        styles={[Styles.Button.gearImageButton, Styles.Layout.flexCenter]}
        width={24}
        height={24}
        Icon={SettingsGearIcon}
      />
    );
  }, []);

  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF}>
      <AnimatedHeaderView
        animationValue={headerImageAnim}
        inputValue={[0, 90]}
        outputValue={[0, 1]}
        text={user.full_name}
      />
      <ScrollView
        onScroll={handleOnScroll}
        bounces
        pagingEnabled={false}
        scrollEnabled
      >
        <View style={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader, Styles.Layout.absolute, Styles.Layout.zIndex999]}>
          <MainHeaderView
            LeftButton={{ hide: true }}
            rightButton={(
              <ImageButtonView
                onPress={handleSettingsPress}
                styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]}
                width={18}
                height={18}
                Icon={SettingsIcon}
              />
            )}
          />
        </View>
        <AnimatedAvatarView
          animationValue={headerImageAnim}
          inputValue={[0, 90]}
          outputValue={[1, 0]}
        />
        <View style={Styles.Container.profileBlock}>
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="basic_info"
            rightSide={renderSettingGearButton(handleEditBasicInformation)}
          />
          {/* ~Username and age~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="Name"
          >
            <Text style={Styles.Text.smallText14Black_070}>{user.full_name}</Text>
          </FieldRowView>
          {/* ~Age~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="age"
          >
            <Text style={Styles.Text.smallText14Black_070}>
              { getAge(user.birthday) }
              {' '}
              years
            </Text>
          </FieldRowView>
          {/* ~City and country~relations */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="Location"
          >
            <Text style={Styles.Text.smallText14Black_070}>
              { user.city }
              {' '}
              { user.country }
            </Text>
          </FieldRowView>
          {/* ~About~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="about"
          >
            <ReadMoreTextView
              expandLines={3}
              buttonText="read_more"
              unfoldText="read_less"
              style={[Styles.Text.smallText14Black_070, Styles.MarginPadding.mv3]}
              text={user.details}
            />
          </FieldRowView>
          {/* ~Relations~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="relations"
            rightSide={renderSettingGearButton(handleEditMood)}
          >
            <Text style={Styles.Text.smallText14Black_070}>{ user.relations }</Text>
          </FieldRowView>
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="Mood"
            rightSide={renderSettingGearButton(handleEditMood)}
          >
            <Text style={Styles.Text.smallText14Black_070}>{ user.mood }</Text>
          </FieldRowView>
          {/* Gender */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gender"
            rightSide={renderSettingGearButton(handleSelectGendersPress)}
          >
            <Text style={Styles.Text.smallText14Black_070}>{ user.gender }</Text>
          </FieldRowView>
          {/* Interests */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="interests"
            rightSide={renderSettingGearButton(handleSelectInterestsPress)}
          >
            <FlexibleListView
              empty={<TextView styles={[Styles.Text.redSubHeader, Styles.Text.textCenter]} text="This user didn't add his(her) interests" />}
              loader={<View />}
              isLoading={false}
              horizontal
              wrapped
              keyExtractor={(item) => `${item.interests_id}`}
              items={user.interests || []}
              scrollStyles={[Styles.MarginPadding.pt8]}
              contentContainerStyles={[Styles.MarginPadding.g6, Styles.Layout.max_w_100pc]}
              renderItem={(item, index) => {
                return (
                  <TextPathView<typeof item>
                    containerStyle={Styles.Container.interestsBody}
                    textStyle={Styles.Text.smallTextWhiteBold14}
                    text={`${InterestsList[item.interests_id - 1].label}`}
                    val={item}
                    onPress={(val) => console.log(val)}
                  />
                );
              }}
            />
          </FieldRowView>
          {/* Tags */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="tags"
            rightSide={renderSettingGearButton(handleSelectTagsPress)}
          >
            <FlexibleListView
              empty={<TextView styles={[Styles.Text.redSubHeader, Styles.Text.textCenter]} text="This user didn't add his(her) custom tags" />}
              loader={<View />}
              isLoading={false}
              horizontal
              keyExtractor={(item) => `${item.user_hash_id}${item.id}`}
              items={user.tags || []}
              wrapped
              scrollStyles={[Styles.MarginPadding.pt8]}
              contentContainerStyles={[Styles.MarginPadding.g6]}
              renderItem={(item, index) => {
                return (
                  <TextPathView<typeof item>
                    containerStyle={Styles.Container.tagBody}
                    textStyle={Styles.Text.smallTextRedBold14}
                    text={`#${item.tag_label}`}
                    val={item}
                    onPress={(val) => console.log(val)}
                  />
                );
              }}
            />
          </FieldRowView>
          {/* Gallery  */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gallery"
            rightSide={(
              <View style={[Styles.Layout.flexRow, Styles.MarginPadding.g10]}>
                <ImageButtonView
                  onPress={openFullScreenCarousel}
                  styles={[Styles.Button.gearImageButton, Styles.Layout.flexCenter]}
                  width={24}
                  height={24}
                  Icon={GalleryIcon}
                />
                {renderSettingGearButton(handleEditImages)}
              </View>
          )}
          >
            <ImageGalleryView
              onPressSmallImage={handleRemovePhotos}
              onPressBigImage={handleRemovePhotos}
              photoList={user.photos || []}
              isFirebase
            />
          </FieldRowView>
        </View>
      </ScrollView>
      <ImageCarouselModal images={[]} ref={carouselModalRef} />
    </ScreenLayoutView>
  );
};

export { MyProfileScreenPresenter };
