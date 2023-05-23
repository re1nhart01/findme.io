import React, { useCallback } from 'react';

import SettingsIcon from '@assets/svg/settings.svg';
import SettingsGearIcon from '@assets/svg/settings_val.svg';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
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
import { DEVICE_WIDTH, hDP } from '@utils/scaling';
import { TextView } from '@components/TextView';
import { UserProfileRowView } from '@components/UserProfileRowView';
import { ImageButtonView } from '@components/ImageButtonView';
import ReadMoreTextView from '@components/ReadMoreTextView';
import { MOCK_INTERESTS, MOCK_TAGS } from '@utils/__remove__/mocks/tags_interests';
import TextPathView from '@components/TextPathView';
import ImageGalleryView from '@components/ImageGalleryView';
import { FlexibleListView } from '@components/FlexibleListView';
import AnimatedAvatarView from '@components/animated/AnimatedAvatarView';
import AnimatedHeaderView from '@components/animated/AnimatedHeaderView';

export type myProfileScreenPresenterProps = {
  handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  headerImageAnim: Animated.Value;
};

const MyProfileScreenPresenter: React.FC<myProfileScreenPresenterProps> = ({ handleOnScroll, headerImageAnim }) => {
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
          {/* ~Username and age~ */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="Jessica Parker, 23"
            rightSide={renderSettingGearButton(() => {})}
          >
            <Text style={Styles.Text.smallText14Black_070}>Current age - 23 years old</Text>
          </UserProfileRowView>
          {/* ~City and country~ */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="location"
            rightSide={renderSettingGearButton(() => {})}
          >
            <Text style={Styles.Text.smallText14Black_070}>Current age - 23 years old</Text>
          </UserProfileRowView>
          {/* ~About~ */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="about"
            rightSide={renderSettingGearButton(() => {})}
          >
            <ReadMoreTextView
              expandLines={3}
              buttonText="read_more"
              unfoldText="read_less"
              style={[Styles.Text.smallText14Black_070, Styles.MarginPadding.mv3]}
              text="My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience.
            I enjoy reading My name is Jessica Parker and I enjoy meeting new people
            and finding ways to help them have an uplifting experience."
            />
          </UserProfileRowView>
          {/* Gender */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gender"
            rightSide={renderSettingGearButton(() => {})}
          >
            <Text style={Styles.Text.smallText14Black_070}>Male</Text>
          </UserProfileRowView>
          {/* Phone */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="phone"
            rightSide={renderSettingGearButton(() => {})}
          >
            <Text style={Styles.Text.smallText14Black_070}>
              +38093965847
            </Text>
          </UserProfileRowView>
          {/* Interests */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="interests"
            rightSide={renderSettingGearButton(() => {})}
          >
            <FlexibleListView
              empty={<View />}
              loader={<View />}
              isLoading={false}
              horizontal
              keyExtractor={(item) => `${item.id}`}
              items={MOCK_INTERESTS}
              scrollStyles={[Styles.MarginPadding.pt8]}
              contentContainerStyles={[Styles.MarginPadding.g6, Styles.Layout.max_w_100pc]}
              renderItem={(item, index) => {
                return (
                  <TextPathView<typeof item>
                    containerStyle={Styles.Container.interestsBody}
                    textStyle={Styles.Text.smallTextWhiteBold14}
                    text={`${item.label}`}
                    val={item}
                    onPress={(val) => console.log(val)}
                  />
                );
              }}
            />
          </UserProfileRowView>
          {/* Tags */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="tags"
            rightSide={renderSettingGearButton(() => {})}
          >
            <FlexibleListView
              empty={<View />}
              loader={<View />}
              isLoading={false}
              horizontal
              keyExtractor={(item) => `${item.id}`}
              items={MOCK_TAGS}
              wrapped
              scrollStyles={[Styles.MarginPadding.pt8]}
              contentContainerStyles={[Styles.MarginPadding.g6]}
              renderItem={(item, index) => {
                return (
                  <TextPathView<typeof item>
                    containerStyle={Styles.Container.tagBody}
                    textStyle={Styles.Text.smallTextRedBold14}
                    text={`#${item.label}`}
                    val={item}
                    onPress={(val) => console.log(val)}
                  />
                );
              }}
            />
          </UserProfileRowView>
          {/* Gallery */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gallery"
            rightSide={renderSettingGearButton(() => {})}
          >
            <ImageGalleryView photoList={[]} />
          </UserProfileRowView>
        </View>
      </ScrollView>
    </ScreenLayoutView>
  );
};

export { MyProfileScreenPresenter };
