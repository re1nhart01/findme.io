import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { IFlatListRender } from '@type/service';
import { TransitionCarouselItemView } from '@components/TransitionItemView';

type transitionCarouselViewProps = PropsWithChildren<{
    autoscroll: boolean;
    photoList: Array<string>;
    firstIndexActive: number;
    styles?: {
        outerStyles?: {};
        scrollStyles?: {};
        itemStyles?: {};
    }
}>;

const TransitionCarouselView: React.FC<transitionCarouselViewProps> = ({ autoscroll, firstIndexActive, photoList, styles }) => {
  const [get, set] = useState(firstIndexActive);
  const listRef = useRef(null);

  const _renderList = useCallback(({ item, index }: IFlatListRender<string>) => {
    return (
      <TransitionCarouselItemView uri={item} currentIndex={index} activeIndex={get} styles={{}} />
    );
  }, [get, set]);

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width - 30;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / viewSize);
    if (get !== currentIndex) {
      set(currentIndex);
    }
  }, [set, get]);

  return (
    <FlatList
      contentContainerStyle={{ backgroundColor: 'green' }}
      horizontal
      pagingEnabled
      decelerationRate={0}
      snapToAlignment="center"
      onScroll={handleOnScroll}
      ref={listRef}
      keyExtractor={(item) => item}
      data={photoList}
      renderItem={_renderList as unknown as ListRenderItem<string>}
    />
  );
};

export { TransitionCarouselView };
