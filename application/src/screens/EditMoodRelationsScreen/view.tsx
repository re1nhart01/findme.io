import React from 'react';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import { ScrollView, Text, View } from 'react-native';
import { FormadjoAsyncSubmitFn, FormadjoForm, FormadjoSubmitFn } from '@core/Validators/FormadjoForm';
import {
  IEditMoodRelationsForm,
  IEditProfileForm, editMoodRelationsForm,
} from '@utils/forms';
import { TextView } from '@components/TextView';
import CheckMarkIcon from '@assets/svg/check-small.svg';
import RightArrowIcon from '@assets/svg/right.svg';
import CommonPickerView from '@components/common/pickers/CommonPickerView';
import { moodList, relationsList } from '@utils/constants/strings';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { IUserStorage } from '@reacts/hooks/useUserStorage';
import { DefaultLoaderView } from '@components/loaders/DefaultLoaderView';

export type editMoodRelationsPresenterProps = {
    userState: IUserStorage;
    handleOnSave: FormadjoSubmitFn<IEditMoodRelationsForm> | FormadjoAsyncSubmitFn<IEditMoodRelationsForm>;
    loading: boolean;
};

const EditMoodRelationsScreenPresenter: React.FC<editMoodRelationsPresenterProps> = ({ userState: { user: { mood, relations } }, handleOnSave, loading }) => {
  return (
    <ScrollView>
      <ScreenLayoutView
        disableKeyboardPersist
        backgroundColor={colors.whiteFF}
        styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
      >
        <MainHeaderView
          headerText="edit"
          subHeaderText="basic_info"
        />
        <FormadjoForm<IEditMoodRelationsForm>
          form={editMoodRelationsForm}
          initialProps={{
            mood,
            relations,
          }}
          onFinishSubmit={handleOnSave}
        >
          {
          ({
            errorsList: {
              mood,
              relations,
            },
            isDisabled,
            onSubmit,
            updateFormState,
            updateManyFormState,
            values,
          }) => (
            <View>
              <View>
                <View style={Styles.MarginPadding.mt50}>
                  <View style={[Styles.MarginPadding.ml8]}>
                    <TextView text="your_mood" styles={Styles.Text.smallTextBold18} />
                  </View>
                </View>
                <View style={[Styles.MarginPadding.mb15, Styles.MarginPadding.mt20]}>
                  <CommonPickerView
                    containerStyles={[Styles.MarginPadding.g10]}
                    activeValue={values.mood}
                    selectValue={(value) => updateFormState('mood', value)}
                    items={moodList}
                    activeTextStyles={Styles.Text.smallText16White}
                    textStyles={Styles.Text.smallText13Black}
                    buttonStyles={Styles.Container.pickerStyleContainer}
                    activeButtonStyles={Styles.Container.pickerActiveContainer}
                    rightIcon={<RightArrowIcon />}
                    activeRightIcon={<CheckMarkIcon />}
                  />
                  {mood.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{mood.errorMessage}</Text>}
                </View>
                <View style={Styles.MarginPadding.mt50}>
                  <View style={[Styles.MarginPadding.ml8]}>
                    <TextView text="your_relationship" styles={Styles.Text.smallTextBold18} />
                  </View>
                </View>
                <View style={[Styles.MarginPadding.mb15, Styles.MarginPadding.mt20]}>
                  <CommonPickerView
                    containerStyles={[Styles.MarginPadding.g10]}
                    activeValue={values.relations}
                    selectValue={(value) => updateFormState('relations', value)}
                    items={relationsList}
                    activeTextStyles={Styles.Text.smallText16White}
                    textStyles={Styles.Text.smallText13Black}
                    buttonStyles={Styles.Container.pickerStyleContainer}
                    activeButtonStyles={Styles.Container.pickerActiveContainer}
                    rightIcon={<RightArrowIcon />}
                    activeRightIcon={<CheckMarkIcon />}
                  />
                  {mood.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{mood.errorMessage}</Text>}
                </View>
              </View>
              <View style={[Styles.MarginPadding.mt10]}>
                <PrimaryButtonView
                  disabled={loading || isDisabled}
                  styles={{
                    outline: Styles.Button.primaryButton,
                    text: Styles.Text.primaryButtonText,
                    disabled: { backgroundColor: colors.redE9_50 },
                  }}
                  text="save"
                  onPress={onSubmit}
                />
              </View>
              <DefaultLoaderView show={loading} color={colors.redE9} size={30} />
            </View>
          )
          }
        </FormadjoForm>
      </ScreenLayoutView>
    </ScrollView>

  );
};

export { EditMoodRelationsScreenPresenter };
