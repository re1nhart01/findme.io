import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SVGImageSourcePropTypes } from '@type/service';

type commonPickerViewProps = {
    activeValue: string;
    selectValue(value: string): void;
    items: ReadonlyArray<string>;
    containerStyles?: {};
    buttonStyles?: {};
    textStyles?: {};
    activeButtonStyles?: {};
    activeTextStyles?: {};
    rightIcon?: SVGImageSourcePropTypes;
    activeRightIcon?: SVGImageSourcePropTypes;
};

const CommonPickerView: React.FC<commonPickerViewProps> = ({
  activeValue = '',
  selectValue = (v: string) => {},
  items = [],
  buttonStyles = {},
  containerStyles = {},
  textStyles = {},
  activeButtonStyles = {},
  activeTextStyles = {},
  activeRightIcon,
  rightIcon,
}) => {
  const handleOnPress = useCallback((value: string) => {
    if (activeValue !== value) {
      selectValue(value);
      return;
    }
    selectValue('');
  }, [activeValue, selectValue]);

  return (
    <View style={containerStyles}>
      {
            items.map((el, index) => {
              return (
                <TouchableOpacity key={`${el}${index}`} style={[buttonStyles, activeValue === el ? activeButtonStyles : {}]} onPress={() => handleOnPress(el)}>
                  <Text style={[textStyles, activeValue === el ? activeTextStyles : {}]}>{el}</Text>
                  {rightIcon ? (
                    <React.Fragment>
                      {activeValue === el ? activeRightIcon : rightIcon}
                    </React.Fragment>
                  ) : null}
                </TouchableOpacity>
              );
            })
        }
    </View>
  );
};

export default memo(CommonPickerView);
