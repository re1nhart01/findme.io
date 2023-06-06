import React from 'react';

import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { colors } from '@utils/colors';
import { Styles } from '@styles/load';
import { MainHeaderView } from '@src/core/Headers/MainHeader';
import { FormadjoAsyncSubmitFn, FormadjoForm, FormadjoSubmitFn } from '@core/Validators/FormadjoForm';
import CommonPickerView from '@components/common/pickers/CommonPickerView';
import { IGenderFormTemplate, genderSelectTemplate } from '@utils/forms';
import { gendersList } from '@utils/constants/strings';
import { View } from 'react-native';
import { PrimaryButtonView } from '@components/PrimaryButtonView';

import CheckMarkIcon from '@assets/svg/check-small.svg';
import RightArrowIcon from '@assets/svg/right.svg';
import { TextView } from '@components/TextView';
import { IUserStorage } from '@reacts/hooks/useUserStorage';
import { DefaultLoaderView } from '@components/loaders/DefaultLoaderView';

export type selectGenderScreenPresenterProps = {
  userState: IUserStorage;
  handleOnSave: FormadjoSubmitFn<IGenderFormTemplate> | FormadjoAsyncSubmitFn<IGenderFormTemplate>;
  loading: boolean;
};

const SelectGenderScreenPresenter: React.FC<selectGenderScreenPresenterProps> = ({ handleOnSave, loading, userState: { user: { gender, looking_for } } }) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView
        headerText="select_gender"
        subHeaderText="select_gender2"
      />
      <FormadjoForm<IGenderFormTemplate>
        initialProps={{
          gender,
          looking_for,
        }}
        removeErrorOnChange
        onFinishSubmit={handleOnSave}
        form={genderSelectTemplate}
      >
        {
          ({
            updateFormState,
            isDisabled,
            values,
            onSubmit,
          }) => {
            return (
              <View style={[Styles.MarginPadding.mt32]}>
                <View style={Styles.MarginPadding.pl16}>
                  <TextView styles={Styles.Text.bigBoldBlack34} numberOfLines={1} text="i_am" />
                </View>
                <View style={[Styles.MarginPadding.mt20]}>
                  <CommonPickerView
                    containerStyles={[Styles.MarginPadding.g10]}
                    activeValue={values.gender}
                    selectValue={(value) => updateFormState('gender', value)}
                    items={gendersList}
                    buttonStyles={Styles.Container.pickerStyleContainer}
                    activeTextStyles={Styles.Text.smallText16White}
                    textStyles={Styles.Text.smallText14Black}
                    activeButtonStyles={Styles.Container.pickerActiveContainer}
                    rightIcon={<RightArrowIcon />}
                    activeRightIcon={<CheckMarkIcon />}
                  />
                </View>
                <View style={[Styles.MarginPadding.pl16, Styles.MarginPadding.mt20]}>
                  <TextView styles={Styles.Text.bigBoldBlack34} numberOfLines={1} text="looking_for" />
                </View>
                <View style={[Styles.MarginPadding.mb15, Styles.MarginPadding.mt20]}>
                  <CommonPickerView
                    containerStyles={[Styles.MarginPadding.g10]}
                    activeValue={values.looking_for}
                    selectValue={(value) => updateFormState('looking_for', value)}
                    items={gendersList}
                    activeTextStyles={Styles.Text.smallText16White}
                    textStyles={Styles.Text.smallText14Black}
                    buttonStyles={Styles.Container.pickerStyleContainer}
                    activeButtonStyles={Styles.Container.pickerActiveContainer}
                    rightIcon={<RightArrowIcon />}
                    activeRightIcon={<CheckMarkIcon />}
                  />
                </View>
                <PrimaryButtonView
                  disabled={loading || isDisabled}
                  onPress={onSubmit}
                  styles={{
                    outline: Styles.Button.primaryButton,
                    text: Styles.Text.primaryButtonText,
                    disabled: { backgroundColor: colors.redE9_50 },
                  }}
                  text="continue"
                />
                <DefaultLoaderView show={loading} color={colors.redE9} size={30} />
              </View>
            );
          }
        }
      </FormadjoForm>
    </ScreenLayoutView>
  );
};

export { SelectGenderScreenPresenter };
