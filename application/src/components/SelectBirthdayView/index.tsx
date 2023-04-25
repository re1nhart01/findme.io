import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextView } from '@components/TextView';
import BirthdayIcon from '@assets/svg/birthday.svg';
import { wDP } from '@utils/scaling';
import { Styles } from '@styles/load';
import { Calendar, DateData } from 'react-native-calendars';
import { CalendarModal, calendarModalForward } from '@components/modals/CalendarModal';

type selectBirthdayViewProps = {
  value: number;
  setSelectedDate(num: number): void;
};
const SelectBirthdayView: React.FC<selectBirthdayViewProps> = ({ setSelectedDate, value }) => {
  const modalRef = useRef<calendarModalForward>(null);
  const handleDayPress = (day: DateData) => {
    const timestamp = Date.parse(day.dateString);
    console.log(day);
    setSelectedDate(timestamp);
  };

  const handlePressView = useCallback(() => {
    if (modalRef && modalRef.current) {
      modalRef.current.onOpen && modalRef.current.onOpen();
    }
  }, [modalRef]);

  return (
    <React.Fragment>
      <TouchableOpacity onPress={handlePressView} style={[Styles.Layout.flexRow, Styles.Container.redBackgroundColor, Styles.Layout.rad15]}>
        <View style={[Styles.Layout.flexRow, Styles.MarginPadding.pv20, Styles.MarginPadding.ph20]}>
          <BirthdayIcon width={wDP(20)} height={wDP(20)} />
          <TextView text="choose_birthday" styles={[Styles.MarginPadding.ml8, Styles.Text.smallText16RedBold]} />
        </View>
      </TouchableOpacity>
      <CalendarModal
        value={value}
        ref={modalRef}
        handleDayPress={handleDayPress}
      />
    </React.Fragment>
  );
};

export { SelectBirthdayView };
