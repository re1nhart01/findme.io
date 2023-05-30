import { SVGImageSourcePropTypes } from '@type/service';
import React, { memo, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

type multiplePickerViewProps = {
  activeValue: Array<string | number>;
  selectValue(value: Array<string | number>): void;
  items: ReadonlyArray<{label: string; value: string | number}>;
  containerStyles?: {};
  buttonStyles?: {};
  textStyles?: {};
  activeButtonStyles?: {};
  activeTextStyles?: {};
  rightIcon?: SVGImageSourcePropTypes;
  leftIcon?: SVGImageSourcePropTypes;
  activeRightIcon?: SVGImageSourcePropTypes;
  activeLeftIcon?: SVGImageSourcePropTypes;
  numOfColumns?: number;
};

const MultiplePickerView: React.FC<multiplePickerViewProps> = ({
  activeValue = [],
  selectValue = (v: Array<string | number>) => {},
  items = [],
  buttonStyles = {},
  containerStyles = {},
  textStyles = {},
  activeButtonStyles = {},
  activeTextStyles = {},
  activeRightIcon,
  rightIcon,
  numOfColumns = 2,
  activeLeftIcon,
  leftIcon,
}) => {
  const handleOnPress = useCallback((value: string | number) => {
    if (!activeValue.includes(value)) {
      const copyWithItem = [...activeValue, value];
      selectValue(copyWithItem);
      return;
    }
    const copyWithoutItem = activeValue.filter((el) => { return el !== value; });
    selectValue(copyWithoutItem);
  }, [activeValue, selectValue]);

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={containerStyles}
      numColumns={numOfColumns}
      horizontal={false}
      pagingEnabled={false}
      scrollEnabled
      keyExtractor={(item, index) => `${item.label}${index}`}
      data={items}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => { handleOnPress(item.value); }} style={[buttonStyles, activeValue.includes(item.value) && activeButtonStyles]}>
          {leftIcon ? (
            <React.Fragment>
              {activeValue.includes(item.value) ? activeLeftIcon : leftIcon}
            </React.Fragment>
          ) : null}
          <Text style={[textStyles, activeValue.includes(item.value) && activeTextStyles]}>{item.label}</Text>
          {rightIcon ? (
            <React.Fragment>
              {activeValue.includes(item.value) ? activeRightIcon : rightIcon}
            </React.Fragment>
          ) : null}
        </TouchableOpacity>
      )}
    />
  );
};

export default memo(MultiplePickerView);
