import React, { useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@utils/scaling';

type draggableItemViewProps = {};

const DraggableItemView: React.FC<draggableItemViewProps> = ({}) => {
  const pan = useRef(new Animated.ValueXY({ x: (DEVICE_WIDTH - 250) / 2, y: 0 })).current;
  const skewValue = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const x = gestureState.dx;
        console.log(x);
        skewValue.flattenOffset();
        skewValue.setValue(x);
        Animated.event([null, {
          dx: pan.x,
        }], {
          useNativeDriver: false,
        })(e, gestureState);
      },
      onPanResponderRelease: (event: GestureResponderEvent) => {
        console.log(event.nativeEvent);
        const x = event.nativeEvent.pageX;
        const y = event.nativeEvent.pageY;
        if (x <= 10 || x >= DEVICE_WIDTH - 20) {
          pan.flattenOffset();
          skewValue.flattenOffset();
          Animated.parallel(
            [
              Animated.spring(
                pan,
                { toValue: {
                  x: (DEVICE_WIDTH - 300) / 2,
                  y: 0 },
                useNativeDriver: false,
                },
              ),
              Animated.spring(
                skewValue,
                { toValue: 0,
                  useNativeDriver: false,
                },
              ),
            ],
          ).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { skewY: skewValue.interpolate({
          inputRange: [0, DEVICE_WIDTH],
          outputRange: ['0deg', '30deg'],
        }) }],
        position: 'absolute',
      }}
      {...panResponder.panHandlers}
    >
      <View style={{ width: 300, height: 500, backgroundColor: 'red' }}>
        <ScrollView
          disableScrollViewPanResponder
          snapToInterval={10}
          decelerationRate="fast"
        >
          <View>
            <Text>
              Textepdfweo[pfo[wefo[kwlpf
              Textepdfweo[pfo[wefo[kwlpf
              Textepdfweo[pfo[wefo[kwlpf
              Textepdfweo[pfo[wefo[kwlpf
              Textepdfweo[pfo[wefo[kwlpf
            </Text>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export { DraggableItemView };
