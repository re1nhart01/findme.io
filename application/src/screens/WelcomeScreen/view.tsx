import React, { PropsWithChildren } from 'react';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { Text } from 'react-native';
import {TransitionCarouselView} from "@components/TransitionCarouselView";

export type welcomeScreenPresenterProps = PropsWithChildren<{

}>
const WelcomeScreenPresenter = ({}) => {
  return (
    <ScreenLayoutView>
        <TransitionCarouselView>

        </TransitionCarouselView>
    </ScreenLayoutView>
  );
};


export { WelcomeScreenPresenter }
