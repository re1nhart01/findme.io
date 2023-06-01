import React from 'react';
import { View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import OptionsInputView from '@components/OptionsInputView';
import { FlexibleListView } from '@components/FlexibleListView';
import TextPathView from '@components/TextPathView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { TextView } from '@components/TextView';
import { ITags } from '@type/models/tags';

export type selectTagsScreenPresenterProps = {
  handleAddNewTag(v: string): void;
  handleAddExistsTag(item: object): void;
  removeFromSelected(id: string | number): void;
  handleSaveTags(): void;
  storedTags: ITags;
  selectedTags: ITags;
};

const SelectTagsScreenPresenter: React.FC<selectTagsScreenPresenterProps> = ({ handleAddNewTag, handleAddExistsTag, selectedTags, storedTags, removeFromSelected, handleSaveTags }) => {
  return (
    <ScreenLayoutView
      disableKeyboardPersist
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView
        headerText="select_tags"
      />
      <View style={[Styles.MarginPadding.mt32]}>
        <OptionsInputView
          onPressExist={handleAddExistsTag}
          onPressAdd={handleAddNewTag}
          list={storedTags}
          inputProps={{
            placeholderColor: colors.black00_40,
            placeholder: 'write_tag',
            onChange: () => {},
          }}
        />
      </View>
      <View style={[Styles.Layout.w100, Styles.MarginPadding.mt20, Styles.MarginPadding.mb10]}>
        <TextView text="selected_tags" styles={[Styles.Text.smallText13Black, Styles.Layout.w100]} />
      </View>
      <View
        style={[
          Styles.Layout.w100,
          Styles.Layout.h400,
          Styles.Container.grayBorder1,
          Styles.Layout.borderR15,
          Styles.MarginPadding.pl16,
        ]}
      >
        <FlexibleListView
          empty={<View />}
          loader={<View />}
          isLoading={false}
          horizontal
          keyExtractor={(item) => `${item.value}`}
          items={selectedTags}
          wrapped
          scrollStyles={[Styles.MarginPadding.pt8]}
          contentContainerStyles={[Styles.MarginPadding.g6]}
          renderItem={(item) => {
            return (
              <TextPathView<typeof item>
                containerStyle={Styles.Container.tagBody}
                textStyle={Styles.Text.smallTextRedBold14}
                text={`#${item.label}`}
                val={item}
                onPress={() => removeFromSelected(item.value)}
              />
            );
          }}
        />
      </View>
      <View style={[Styles.MarginPadding.mt20]}>
        <PrimaryButtonView
          disabled={false}
          onPress={handleSaveTags}
          styles={{
            outline: Styles.Button.primaryButton,
            text: Styles.Text.primaryButtonText,
            disabled: { backgroundColor: colors.redE9_50 },
          }}
          text="continue"
        />
      </View>
    </ScreenLayoutView>
  );
};

export { SelectTagsScreenPresenter };
