import React from 'react';
import { Text, View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { ImageButtonView } from '@components/ImageButtonView';
import SettingsIcon from '@assets/svg/settings.svg';
import { DraggableContainerView } from '@components/common/draggable/DraggableContainerView';
import { FilterMatchModal } from '@components/common/modals/FilterMatchModal';
import { calendarModalForward } from '@components/common/modals/CalendarModal';
import { MatchesFiltering } from '@type/defaults';
import { IUserDiscoverModelShort } from '@type/models/user';

export type matchesScreenPresenterProps = {
  handleSettingsPress(): void;
  handleSwipePress: (user_hash: string, op: ('LIKE' | 'DISLIKE'), quick?: boolean) => Promise<boolean>
  filterModelRef: React.RefObject<calendarModalForward>;
  filterState: MatchesFiltering;
  setFilterState: React.Dispatch<React.SetStateAction<MatchesFiltering>>
  handleOnSave(): void;
  matchesList: IUserDiscoverModelShort[];
  fetchMatches: () => Promise<void>;
};

const MatchesScreenPresenter: React.FC<matchesScreenPresenterProps> = ({
  handleSwipePress,
  handleSettingsPress,
  filterModelRef,
  filterState,
  setFilterState,
  handleOnSave,
  fetchMatches,
  matchesList }) => {
  return (
    <ScreenLayoutView
      useKeyboardAvoid={false}
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.serviceScreenLayoutHeader]}
    >
      <View style={Styles.Container.screenLayout}>
        <MainHeaderView
          onTouchCenter={() => fetchMatches}
          LeftButton={{ hide: true }}
          headerText="discover"
          subHeaderText="press_to_refresh"
          rightButton={(
            <ImageButtonView
              onPress={handleSettingsPress}
              styles={[Styles.Button.smallImageButton, Styles.Layout.flexCenter]}
              width={18}
              height={18}
              Icon={SettingsIcon}
            />
              )}
        />
      </View>
      <View>
        <DraggableContainerView
          handleSwipePress={handleSwipePress}
          matchesList={matchesList}
        />
      </View>
      <FilterMatchModal
        handleOnSave={handleOnSave}
        ref={filterModelRef}
        {...filterState}
        setFilterState={setFilterState}
      />
    </ScreenLayoutView>
  );
};

export { MatchesScreenPresenter };
