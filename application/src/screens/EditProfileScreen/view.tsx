import React from 'react';
import { ScreenLayoutView } from '@components/common/hoc/ScreenLayout';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { colors } from '@utils/colors';
import { ScrollView, Text, View } from 'react-native';
import { FormadjoAsyncSubmitFn, FormadjoForm } from '@core/Validators/FormadjoForm';
import { IEditProfileForm, editProfileForm } from '@utils/forms';
import { SelectBirthdayView } from '@components/SelectBirthdayView';
import { AnimatedTextInputView } from '@components/AnimatedTextInputView';
import { TextView } from '@components/TextView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { IUserStorage } from '@reacts/hooks/useUserStorage';
import { DefaultLoaderView } from '@components/loaders/DefaultLoaderView';

export type editProfileScreenPresenterProps = {
    userState: IUserStorage;
    handleOnSave: FormadjoAsyncSubmitFn<IEditProfileForm>;
    loading: boolean;
};

const EditProfileScreenPresenter: React.FC<editProfileScreenPresenterProps> = ({
  handleOnSave,
  loading,
  userState: { user: { birthday, city, country, details, full_name } } }) => {
  return (
    <ScreenLayoutView
      disableKeyboardPersist
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >

      <MainHeaderView
        headerText="edit"
        subHeaderText="basic_info"
      />
      <ScrollView>
        <FormadjoForm<IEditProfileForm>
          removeErrorOnChange
          form={editProfileForm}
          initialProps={{
            birthday: new Date(birthday).valueOf(),
            city,
            country,
            details,
            firstName: full_name.split(' ')[0],
            lastName: full_name.split(' ')[1],
          }}
          onFinishSubmit={handleOnSave}
        >
          {
          ({
            errorsList: {
              birthday,
              city,
              country,
              details,
              firstName,
              lastName,
            },
            isDisabled,
            onSubmit,
            updateFormState,
            values,
          }) => (
            <View>
              <View>
                <View style={Styles.MarginPadding.mt50}>
                  <View style={[Styles.MarginPadding.ml8]}>
                    <TextView text="some_info_about_you" styles={Styles.Text.smallTextBold18} />
                  </View>
                </View>
                <AnimatedTextInputView
                  defaultValue={values.firstName}
                  autoComplete="name"
                  isError={firstName.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="First Name"
                  onChange={(v) => updateFormState('firstName', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {firstName.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{firstName.errorMessage}</Text>}
                <AnimatedTextInputView
                  defaultValue={values.lastName}
                  autoComplete="email"
                  isError={firstName.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Last Name"
                  onChange={(v) => updateFormState('firstName', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {lastName.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{lastName.errorMessage}</Text>}
                <AnimatedTextInputView
                  defaultValue={values.details}
                  autoComplete="email"
                  isError={firstName.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Details"
                  onChange={(v) => updateFormState('details', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {details.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{details.errorMessage}</Text>}
                <View style={Styles.MarginPadding.mt10}>
                  <SelectBirthdayView
                    value={values.birthday as number}
                    setSelectedDate={(v) => updateFormState('birthday', v)}
                  />
                </View>
              </View>
              <View>
                <View style={Styles.MarginPadding.mt32}>
                  <View style={[Styles.MarginPadding.ml8]}>
                    <TextView text="your_location" styles={Styles.Text.smallTextBold18} />
                  </View>
                </View>
                <AnimatedTextInputView
                  defaultValue={values.country}
                  autoComplete="postal-address-country"
                  isError={country.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="Country"
                  onChange={(v) => updateFormState('country', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {country.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{country.errorMessage}</Text>}
                <AnimatedTextInputView
                  defaultValue={values.city}
                  isError={city.isError}
                  placeholderColor={colors.black00_40}
                  placeholder="City"
                  onChange={(v) => updateFormState('city', v.trim())}
                  styles={{
                    error: [Styles.Container.redBorder1],
                    outline: [Styles.Container.animatedInputContainer, Styles.MarginPadding.mt10],
                    input: [Styles.Input.animatedInputText, Styles.Text.smallText13Black] }}
                />
                {city.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{city.errorMessage}</Text>}
              </View>
              <View style={[Styles.MarginPadding.mt10]}>
                <PrimaryButtonView
                  disabled={isDisabled || loading}
                  styles={{
                    outline: Styles.Button.primaryButton,
                    text: Styles.Text.primaryButtonText,
                    disabled: { backgroundColor: colors.redE9_50 },
                  }}
                  text="save"
                  onPress={onSubmit}
                />
                <DefaultLoaderView show={loading} color={colors.redE9} size={20} />
              </View>
            </View>
          )
          }
        </FormadjoForm>
      </ScrollView>
    </ScreenLayoutView>

  );
};

export { EditProfileScreenPresenter };
