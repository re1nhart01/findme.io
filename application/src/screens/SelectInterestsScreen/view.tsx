import React from 'react';
import {Text, View} from 'react-native';

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
import { InterestsList } from '@utils/constants/strings';

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
              <View style={[Styles.MarginPadding.mt10]}>
                <View style={Styles.MarginPadding.pl16}>
                  <TextView styles={Styles.Text.bigBoldBlack34} numberOfLines={1} text="your_interests" />
                </View>
                <View style={[Styles.MarginPadding.mt20, Styles.MarginPadding.mb15]}>
                  <MultiplePickerView
                    containerStyles={[Styles.MarginPadding.g10]}
                    activeValue={values.interests}
                    items={InterestsList}
                    numOfColumns={2}
                    selectValue={(v) => { updateFormState('interests', v); }}
                    buttonStyles={[Styles.Container.pickerStyleContainer, Styles.Layout.w48pc]}
                    activeTextStyles={Styles.Text.smallTextWhiteBold14}
                    textStyles={Styles.Text.smallTextBlackBold14}
                    activeButtonStyles={Styles.Container.pickerActiveContainer}
                  />
                </View>
                {errorsList.interests.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mb10]}>{errorsList.interests.errorMessage}</Text>}
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
