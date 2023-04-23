import React from 'react';
import { View } from 'react-native';
import { TextView } from '@components/TextView';

type selectBirthdayViewProps = {};
const SelectBirthdayView: React.FC<selectBirthdayViewProps> = ({}) => {
  return (
    <React.Fragment>
      <View style={{}}>
        <TextView text="choose_birthday" />
      </View>

    </React.Fragment>
  );
};

export { SelectBirthdayView };
