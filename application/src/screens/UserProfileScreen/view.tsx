import React, { useCallback, useRef } from 'react';

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

export type userProfileScreenPresenterProps = {};

const HEADER_MAX_VALUE: number = 390;

const UserProfileScreenPresenter: React.FC<userProfileScreenPresenterProps> = ({}) => {
  const stickyHeaderAnim = useRef(new Animated.Value(0)).current;
  const headerImageAnim = useRef(new Animated.Value(1)).current;

  const handleSettingsPress = useCallback(() => {

  }, []);

  const handleNameAndBirthdaySettingsPress = useCallback(() => {

  }, []);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset: { y } } = event.nativeEvent;
    const currentPercent = (y / HEADER_MAX_VALUE) * 100;
    if (currentPercent > 100) return;
    stickyHeaderAnim.flattenOffset();
    headerImageAnim.flattenOffset();
    stickyHeaderAnim.setValue(currentPercent);
    headerImageAnim.setValue(currentPercent);
  }, [headerImageAnim, stickyHeaderAnim]);

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
      <Animated.View
        style={[
          { opacity: headerImageAnim.interpolate({
            inputRange: [0, 90],
            outputRange: [0, 1],
          }) },
          Styles.Layout.flexCenter,
          Styles.Layout.absolute,
          Styles.Layout.zIndex10,
          Styles.Layout.w100,
          Styles.MarginPadding.pt20,
          Styles.MarginPadding.pb10,
        ]}
      >
        <View>
          <TextView styles={[Styles.Text.mediumText24Black, Styles.Text.textCenter]} text="my_profile" />
          <TextView styles={[Styles.Text.smallText12_40Black, Styles.Text.textCenter]} text="Evgeniy Kokaiko" />
        </View>
      </Animated.View>
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
                onPress={handleSettingsPress}
                styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]}
                width={18}
                height={18}
                Icon={SettingsIcon}
              />
            )}
          />
        </View>
        <View style={{ backgroundColor: '#000000' }}>
          <Animated.Image
            style={{ width: DEVICE_WIDTH,
              height: hDP(415),
              resizeMode: 'cover',
              opacity: headerImageAnim.interpolate({
                inputRange: [0, 90],
                outputRange: [1, 0],
              }) }}
            source={require('@assets/img/photo.png')}
          />
        </View>
        <View
          style={
        { zIndex: 15,
          position: 'relative',
          top: -40,
          backgroundColor: 'white',
          borderTopStartRadius: 45,
          borderTopEndRadius: 45,
          paddingHorizontal: 40,
          paddingVertical: 30,
          height: '100%',
          gap: hDP(30),
        }
}
        >
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
            text="location"
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
            <Text style={Styles.Text.smallText14Black_070}>
              +38093965847
            </Text>
          </UserProfileRowView>
          {/* Tags */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="tags"
            rightSide={renderSettingGearButton(() => {})}
          >
            <Text style={Styles.Text.smallText14Black_070}>
              +38093965847
            </Text>
          </UserProfileRowView>
          {/* Interests */}
          <UserProfileRowView
            style={{ textStyle: [Styles.Text.mediumText24Black] }}
            text="gallery"
            rightSide={renderSettingGearButton(() => {})}
          >
            <Text style={Styles.Text.smallText14Black_070}>
              +38093965847
            </Text>
          </UserProfileRowView>
        </View>
      </ScrollView>
    </ScreenLayoutView>
  );
};

export { UserProfileScreenPresenter };
