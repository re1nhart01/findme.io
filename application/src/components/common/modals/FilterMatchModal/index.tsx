import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@utils/scaling';
import { colors } from '@utils/colors';
import { calendarModalForward } from '@components/common/modals/CalendarModal';
import CheckBox from '@react-native-community/checkbox';
import { TextView } from '@components/TextView';
import { Styles } from '@styles/load';
import { Slider } from '@miblanchard/react-native-slider';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { MatchesFiltering } from '@type/defaults';

type filterMatchModalProps = {
  'by_interests': boolean;
  'by_tags': boolean;
  'by_coords': boolean;
  'by_birthday': boolean;
  'by_gender': boolean
  'by_relation': boolean;
  'distance': number;
  'years': number;
  setFilterState: React.Dispatch<React.SetStateAction<MatchesFiltering>>;
  handleOnSave(): void;
};
const FilterMatchModal = forwardRef<calendarModalForward, filterMatchModalProps>(({
  by_coords,
  by_gender,
  by_interests,
  by_tags,
  by_relation,
  years,
  distance,
  by_birthday,
  setFilterState,
  handleOnSave,

}, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, []);

  useImperativeHandle(ref, () => ({
    onClose,
    onOpen,
  }));
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      hardwareAccelerated
      transparent
    >
      <TouchableOpacity onPress={onClose} style={{ position: 'absolute', width: DEVICE_WIDTH, height: DEVICE_HEIGHT, backgroundColor: colors.black00_40 }}>
        <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: DEVICE_WIDTH, height: 600, backgroundColor: colors.whiteFF, borderWidth: 1, borderColor: colors.grayE8, position: 'absolute', bottom: 0 }}>
          <View>
            <MainHeaderView
              headerText="Filtering"
              LeftButton={{ hide: true }}
            />
          </View>
          <View style={[Styles.Container.screenLayout]}>
            <PrimaryButtonView
              onPress={() => setFilterState((prev) => ({ ...prev, by_interests: !prev.by_interests }))}
              styles={{
                outline: [
                  Styles.MarginPadding.mb10,
                  Styles.Button.primaryButton,
                  Styles.Button.primaryButtonSmall,
                  by_interests && { backgroundColor: colors.redE9_50 }],
                text: Styles.Text.primaryButtonText,
              }}
              text="Check by interests"
            />
            <PrimaryButtonView
              onPress={() => setFilterState((prev) => ({ ...prev, by_tags: !prev.by_tags }))}
              styles={{
                outline: [
                  Styles.MarginPadding.mb10,
                  Styles.Button.primaryButton,
                  Styles.Button.primaryButtonSmall,
                  !by_tags && { backgroundColor: colors.redE9_50 }],
                text: Styles.Text.primaryButtonText,
              }}
              text="Check by tags"
            />
            <PrimaryButtonView
              onPress={() => setFilterState((prev) => ({ ...prev, by_coords: !prev.by_coords }))}
              styles={{
                outline: [
                  Styles.MarginPadding.mb10,
                  Styles.Button.primaryButton,
                  Styles.Button.primaryButtonSmall,
                  by_coords && { backgroundColor: colors.redE9_50 }],
                text: Styles.Text.primaryButtonText,
              }}
              text="Check by coordinates"
            />
            <PrimaryButtonView
              onPress={() => setFilterState((prev) => ({ ...prev, by_birthday: !prev.by_birthday }))}
              styles={{
                outline: [
                  Styles.MarginPadding.mb10,
                  Styles.Button.primaryButton,
                  Styles.Button.primaryButtonSmall,
                  by_birthday && { backgroundColor: colors.redE9_50 }],
                text: Styles.Text.primaryButtonText,
              }}
              text="Check by birthday"
            />
            <PrimaryButtonView
              onPress={() => setFilterState((prev) => ({ ...prev, by_gender: !prev.by_gender }))}
              styles={{
                outline: [
                  Styles.MarginPadding.mb10,
                  Styles.Button.primaryButton,
                  Styles.Button.primaryButtonSmall,
                  by_gender && { backgroundColor: colors.redE9_50 }],
                text: Styles.Text.primaryButtonText,
              }}
              text="Check by gender"
            />
            <PrimaryButtonView
              onPress={() => setFilterState((prev) => ({ ...prev, by_relation: !prev.by_relation }))}
              styles={{
                outline: [
                  Styles.MarginPadding.mb10,
                  Styles.Button.primaryButton,
                  Styles.Button.primaryButtonSmall,
                  by_relation && { backgroundColor: colors.redE9_50 }],
                text: Styles.Text.primaryButtonText,
              }}
              text="Check by relations"
            />
            <TextView text="Check by distance" styles={[Styles.Text.smallText13Black, Styles.MarginPadding.mb10, Styles.MarginPadding.mt10]} />
            <Slider
              startFromZero
              value={distance}
              animateTransitions
              maximumTrackTintColor="#d3d3d3"
              maximumValue={10000}
              minimumTrackTintColor="#1fb28a"
              minimumValue={10}
              step={2}
              thumbTintColor="#1a9274"
            />
            <Text>{distance}</Text>
            <TextView text="Check by years" styles={[Styles.Text.smallText13Black, Styles.MarginPadding.mb10, Styles.MarginPadding.mt10]} />
            <Slider
              animateTransitions
              maximumTrackTintColor="#d3d3d3"
              maximumValue={20}
              minimumTrackTintColor="#1fb28a"
              minimumValue={4}
              step={2}
              thumbTintColor="#1a9274"
            />
            <PrimaryButtonView
              onPress={handleOnSave}
              styles={{
                outline: [
                  Styles.MarginPadding.mt20,
                  Styles.Button.primaryButton],
                text: Styles.Text.primaryButtonText,
              }}
              text="Save"
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

export { FilterMatchModal };
