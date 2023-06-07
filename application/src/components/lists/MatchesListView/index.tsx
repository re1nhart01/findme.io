import { IUserDiscoverModelShort, IUserDiscoverType, UserMatchesListItem } from '@type/models/user';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { userSectionShort } from '@utils/__remove__/mocks/usermodel';
import { RefreshControl, ScrollView, SectionList, Text, View } from 'react-native';
import { MatchesItemView } from '@components/list-items/MatchesItemView';
import { renderColumnsInSection } from '@screens/DiscoverScreen/utils';
import { Styles } from '@styles/load';
import { LineView } from '@components/LineView';
import { TextView } from '@components/TextView';
import { useSafeHTTP } from '@reacts/hooks/useSafeHTTP';
import { RequestForge } from '@core/http/RequestForge';
import { SwipeRequest } from '@core/http/types';

type matchesListViewProps = {
    type: IUserDiscoverType;
};

const MatchesListView: React.FC<matchesListViewProps> = ({ type }) => {
  const { httpCaller } = useSafeHTTP();
  const [items, setItems] = useState<{title: string; data: UserMatchesListItem[]}[]>([]);

  const fetchList = useCallback(async () => {
    const response = await httpCaller(RequestForge.getLists, type);
    if (response && response.data) {
      setItems([]);
      if (Array.isArray(response.data)) {
        setItems([{
          title: 'Today',
          data: response.data,
        }]);
      }
    }
  }, [httpCaller, type]);

  const onLike = useCallback(async (user_hash_refer: string) => {
    const body: SwipeRequest = {
      user_hash_refer,
      operation: 'LIKE',
    };
    const response = await httpCaller(RequestForge.updateMatchItem, body);
    if (response && response.statusCode === 200) {
      if (items[0].data.length === 1) {
        setItems([]);
      } else {
        await fetchList();
      }
    }
  }, [fetchList, httpCaller, items]);

  const onRemove = useCallback(async (userReferHash: string) => {
    const response = await httpCaller(RequestForge.removeMatchItem, userReferHash);
    if (response && response.statusCode === 200) {
      if (items[0].data.length === 1) {
        setItems([]);
      } else {
        await fetchList();
      }
    }
  }, [fetchList, httpCaller, items]);

  useEffect(() => {
    fetchList().then();
  }, []);

  if (items.length === 0) {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={fetchList} />}>
        <View
          style={[Styles.Layout.w100,
            Styles.Layout.h150,
            Styles.MarginPadding.mt20,
            Styles.Layout.flexCenter,
            Styles.Layout.borderR15,
            Styles.Layout.flexCol,
            Styles.MarginPadding.pl16]}
        >
          <TextView styles={[Styles.Text.redHeader, Styles.Text.textCenter]} text="Oops" />
          <TextView styles={[Styles.Text.smallTextBold18, Styles.Text.textCenter]} text="Items not found" />
        </View>
      </ScrollView>
    );
  }

  return (
    <SectionList
      refreshControl={<RefreshControl refreshing={false} onRefresh={fetchList} />}
      contentContainerStyle={[Styles.MarginPadding.pb100, Styles.Layout.wh100_pc, Styles.Layout.h600]}
      sections={items}
      renderSectionHeader={({ section: { title } }) => (
        <View style={[Styles.Layout.w100, Styles.Layout.flexCenter, Styles.MarginPadding.mt20, Styles.MarginPadding.mb10]}>
          <LineView paddingTop={2} width="25%" height={0.5} />
          <Text style={[Styles.Text.smallText12_40Black, Styles.Text.textCenter, Styles.Layout.w20pc]}>{title}</Text>
          <LineView paddingTop={2} width="25%" height={0.5} />
        </View>
      )}
      renderItem={renderColumnsInSection<UserMatchesListItem>((model) => (
        <MatchesItemView onLike={onLike} onRemove={onRemove} type={type} model={model} />
      ),
      (items) => (
        <View
          style={[
            Styles.Layout.w100,
            Styles.Layout.flexRow,
            Styles.Layout.jc_sb,
            Styles.MarginPadding.ph40,
            Styles.MarginPadding.mb15,
          ]}
        >
          {items}
        </View>
      ))}
    />
  );
};

export default memo(MatchesListView);
