import React, { PropsWithChildren, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { MOCK_CAROUSEL_IMAGES } from '@utils/__remove__/mocks/images';
import { TransitionCarouselView } from '@components/TransitionCarouselView';

export type mainNavigationPresenterProps = PropsWithChildren<{}>;
const MainNavigationPresenter: React.FC<
  mainNavigationPresenterProps
> = ({}) => {
  const Tab = createBottomTabNavigator();
  return (
    <ScreenLayoutView backgroundColor="white">
      <TransitionCarouselView autoscroll firstIndexActive={0} photoList={MOCK_CAROUSEL_IMAGES} />
    </ScreenLayoutView>
  );
};

export { MainNavigationPresenter };
