import React, { useCallback } from 'react';

import DotsIcon from '@assets/svg/dots.svg';
import SettingsGearIcon from '@assets/svg/settings_val.svg';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { hDP } from '@utils/scaling';
import { FieldRowView } from '@components/UserProfileRowView';
import { ImageButtonView } from '@components/ImageButtonView';
import ReadMoreTextView from '@components/ReadMoreTextView';
import TextPathView from '@components/TextPathView';
import ImageGalleryView from '@components/ImageGalleryView';
import { FlexibleListView } from '@components/FlexibleListView';
import AnimatedAvatarView from '@components/common/animated/AnimatedAvatarView';
import AnimatedHeaderView from '@components/common/animated/AnimatedHeaderView';
import { userData } from '@type/models/user';
import { getAge } from '@utils/helpers';
import { handleSelectInterestsPress, handleSelectTagsPress } from '@screens/MyProfileScreen/utils';
import { TextView } from '@components/TextView';
import { InterestsList } from '@utils/constants/strings';
import GalleryIcon from '@assets/svg/gallery.svg';
import { ImageCarouselModal, imageCarouselModalForward } from '@components/common/modals/ImageCarouselModal';

export type userProfileScreenPresenterProps = {
  handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  carouselModalRef: React.RefObject<imageCarouselModalForward>;
  openFullScreenCarousel(): void;
  headerImageAnim: Animated.Value;
  userModel: userData;
};

const UserProfileScreenPresenter: React.FC<userProfileScreenPresenterProps> = ({ handleOnScroll, headerImageAnim, userModel, openFullScreenCarousel, carouselModalRef }) => {
  return (
    <ScreenLayoutView backgroundColor={colors.whiteFF}>
      <AnimatedHeaderView
        animationValue={headerImageAnim}
        inputValue={[0, 90]}
        outputValue={[0, 1]}
        text={userModel.full_name}
      />
      <ScrollView
        onScroll={handleOnScroll}
        bounces
        pagingEnabled={false}
        scrollEnabled
      >
        <View style={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader, Styles.Layout.absolute, Styles.Layout.zIndex10]}>
          <MainHeaderView
            rightButton={(
              <ImageButtonView
                onPress={() => {}}
                styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]}
                width={18}
                height={18}
                Icon={DotsIcon}
              />
            )}
          />
        </View>
        <AnimatedAvatarView
          animationValue={headerImageAnim}
          inputValue={[0, 90]}
          outputValue={[1, 0]}
          avatarUrl={userModel.photos ? userModel.photos[0] : ''}
        />
        <View style={Styles.Container.profileBlock}>
          {/* ~Username and age~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text={`${userModel.full_name}, ${getAge(userModel.birthday)}`}
          />
          {/* ~City and country~ */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="location"
          >
            <Text style={Styles.Text.smallText14Black_070}>
              {userModel.city}
              ,
              {' '}
              {userModel.country}
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
              text={userModel.details}
            />
          </FieldRowView>
          {/* Gender */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gender"
          >
            <Text style={Styles.Text.smallText14Black_070}>{ userModel.gender }</Text>
          </FieldRowView>
          {/* Interests */}
          <FieldRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="interests"
          >
            <FlexibleListView
              empty={<TextView styles={[Styles.Text.redSubHeader, Styles.Text.textCenter]} text="This user didn't add his(her) interests" />}
              loader={<View />}
              isLoading={false}
              horizontal
              wrapped
              keyExtractor={(item) => `${item.interests_id}`}
              items={userModel.interests || []}
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
          >
            <FlexibleListView
              empty={<TextView styles={[Styles.Text.redSubHeader, Styles.Text.textCenter]} text="This user didn't add his(her) custom tags" />}
              loader={<View />}
              isLoading={false}
              horizontal
              keyExtractor={(item) => `${item.user_hash_id}${item.id}`}
              items={userModel.tags || []}
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
              </View>
                )}
          >
            <ImageGalleryView
              photoList={userModel.photos || []}
              isFirebase
            />
          </FieldRowView>
        </View>
      </ScrollView>
      <ImageCarouselModal isFirebase images={userModel.photos || []} ref={carouselModalRef} />
    </ScreenLayoutView>
  );
};

export { UserProfileScreenPresenter };
