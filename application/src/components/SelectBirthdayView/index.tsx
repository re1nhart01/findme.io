import React from 'react';
import { View } from 'react-native';
import { TextView } from '@components/TextView';
import BirthdayIcon from '@assets/svg/birthday.svg';
import { wDP } from '@utils/scaling';
import { Styles } from '@styles/load';

type selectBirthdayViewProps = {};
const SelectBirthdayView: React.FC<selectBirthdayViewProps> = ({}) => {
  return (
    <React.Fragment>
      <View style={[Styles.Layout.flexRow, Styles.Container.redBackgroundColor, Styles.Layout.rad15]}>
        <View style={[Styles.Layout.flexRow, Styles.MarginPadding.pv20, Styles.MarginPadding.ph20]}>
          <BirthdayIcon width={wDP(20)} height={wDP(20)} />
          <TextView text="choose_birthday" styles={[Styles.MarginPadding.ml8, Styles.Text.smallText16RedBold]} />
        </View>
      </View>

    </React.Fragment>
  );
};

export { SelectBirthdayView };
