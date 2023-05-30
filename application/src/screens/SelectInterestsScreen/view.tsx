import React from 'react';
import { View } from 'react-native';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import {
  FormadjoAsyncSubmitFn,
  FormadjoForm,
} from '@core/Validators/FormadjoForm';
import { TextView } from '@components/TextView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { IInterestsFormTemplate, interestSelectTemplate } from '@utils/forms';
import MultiplePickerView from '@components/common/pickers/MultiplePickerView';
import { MOCK_INTERESTS } from '@utils/__remove__/mocks/tags_interests';

export type selectInterestsScreenPresenterProps = {
  handleOnSave: FormadjoAsyncSubmitFn<IInterestsFormTemplate>;
};

const SelectInterestsScreenPresenter: React.FC<selectInterestsScreenPresenterProps> = ({ handleOnSave }) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView />
      <FormadjoForm<IInterestsFormTemplate>
        initialProps={{
          interests: [],
        }}
        removeErrorOnChange
        onFinishSubmit={handleOnSave}
        form={interestSelectTemplate}
      >
        {
          ({
            updateFormState,
            isDisabled,
            values,
            onSubmit,
            errorsList,
          }) => {
            return (
              <View style={[Styles.MarginPadding.mt32]}>
                <View style={Styles.MarginPadding.pl16}>
                  <TextView styles={Styles.Text.bigBoldBlack34} numberOfLines={1} text="your_interests" />
                </View>
                <View style={[Styles.MarginPadding.mt20, Styles.MarginPadding.mb15]}>
                  <MultiplePickerView
                    containerStyles={[Styles.MarginPadding.g10]}
                    activeValue={values.interests}
                    items={MOCK_INTERESTS}
                    numOfColumns={2}
                    selectValue={(v) => { updateFormState('interests', v); }}
                    buttonStyles={[Styles.Container.pickerStyleContainer, Styles.Layout.w48pc]}
                    activeTextStyles={Styles.Text.smallTextWhiteBold14}
                    textStyles={Styles.Text.smallTextBlackBold14}
                    activeButtonStyles={Styles.Container.pickerActiveContainer}
                  />
                </View>
                <PrimaryButtonView
                  disabled={isDisabled}
                  onPress={onSubmit}
                  styles={{
                    outline: Styles.Button.primaryButton,
                    text: Styles.Text.primaryButtonText,
                    disabled: { backgroundColor: colors.redE9_50 },
                  }}
                  text="continue"
                />
              </View>
            );
          }
        }
      </FormadjoForm>
    </ScreenLayoutView>
  );
};

export { SelectInterestsScreenPresenter };
