import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SVGImageSourcePropTypes } from '@type/service';
import { DEVICE_WIDTH } from '@utils/scaling';
import { Styles } from '@styles/load';

type buttonMatrixViewProps = {
  onNumberButtonPress(n: number): void;
  eraseButton: {
    disabled: boolean;
    onPress(): void;
    icon: SVGImageSourcePropTypes;
  };
};

const StatelessButtonMatrixView: React.FC<buttonMatrixViewProps> = ({ onNumberButtonPress, eraseButton: { onPress, icon, disabled } }) => {
  const handleEraseButtonPress = useCallback(() => {
    onPress && onPress();
  }, [onNumberButtonPress]);

  const handleNumberButtonPress = useCallback((num: number) => {
    onNumberButtonPress && onNumberButtonPress(num);
  }, [onNumberButtonPress]);

  const onRenderNumberView = useCallback((n: number) => {
    return (
      <View style={[{ width: '33.3%', height: 60, backgroundColor: 'gray' }, Styles.Layout.flexCenter]}>
        <TouchableOpacity style={[{ width: 70, height: 60, backgroundColor: 'red' }, Styles.Layout.flexCenter]} onPress={() => handleNumberButtonPress(n)}>
          <Text style={[Styles.Text.mediumText24Black, { backgroundColor: 'yellow', textAlign: 'center' }]}>{n}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [handleNumberButtonPress]);

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        rowGap: 30,
        backgroundColor: 'blue',
      }}
    >
      {onRenderNumberView(7)}
      {onRenderNumberView(8)}
      {onRenderNumberView(9)}
      {onRenderNumberView(4)}
      {onRenderNumberView(5)}
      {onRenderNumberView(6)}
      {onRenderNumberView(3)}
      {onRenderNumberView(2)}
      {onRenderNumberView(1)}
      <View style={{ width: '33.3%', height: 100 }} />
      {onRenderNumberView(0)}
      <TouchableOpacity style={{ width: '33.3%', height: 100, marginBottom: 24 }} onPress={handleEraseButtonPress}>
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export { StatelessButtonMatrixView };
