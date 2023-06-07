import React from 'react';
import { View } from 'react-native';
import { hDP, wDP } from '@utils/scaling';

import { UserActionButtonsView } from '@components/UserActionButtonsView';
import { Styles } from '@styles/load';
import { user_short } from '@utils/__remove__/mocks/usermodel';
import { IUserDiscoverModelShort } from '@type/models/user';
import { TextView } from '@components/TextView';
import { DraggableItemView } from '../DraggableItemView';

type draggableContainerViewProps = {
  matchesList: IUserDiscoverModelShort[];
  handleSwipePress: (user_hash: string, op: ('LIKE' | 'DISLIKE'), quick?: boolean) => Promise<boolean>
};

const DraggableContainerView: React.FC<draggableContainerViewProps> = ({ matchesList, handleSwipePress }) => {
  const renderMatchingCards = (): Array<JSX.Element> | null => {
    if (!matchesList || matchesList.length <= 0) {
      return null;
    }
    return matchesList.map((user, index) => {
      return (
        <React.Fragment key={user.user_hash}>
          <DraggableItemView
            model={user}
            index={index}
            handleSwipePress={handleSwipePress}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <View style={{ paddingHorizontal: wDP(40), width: '100%' }}>
      <View
        style={[{
          width: '100%',
          height: hDP(480),
          backgroundColor: 'white',
          position: 'relative',
          marginTop: hDP(24),
        },
        Styles.Container.grayBorder1,
        Styles.Layout.borderR15]}
      >
        <View style={[Styles.Layout.flexCenter, Styles.Layout.flexCol, Styles.Layout.wh100_pc]}>
          <TextView styles={[Styles.Text.redHeader, Styles.Text.textCenter]} text="Oops" />
          <TextView styles={[Styles.Text.smallTextBold18, Styles.Text.textCenter]} text="There is no active users :(" />
        </View>
        {renderMatchingCards()}
      </View>
      <UserActionButtonsView
        handleFavoritePress={() => {}}
        handleLikePress={() => handleSwipePress(matchesList[matchesList.length - 1]?.user_hash, 'LIKE', true)}
        handleSkipPress={() => handleSwipePress(matchesList[matchesList.length - 1]?.user_hash, 'DISLIKE', true)}
      />
    </View>
  );
};

export { DraggableContainerView };
