import { Text, View } from 'react-native';
import React from 'react';
import { ScreenLayoutView } from '@components/hoc/ScreenLayout';
import { NumberInputView } from '@components/NumberInputView';
import { colors } from '@utils/colors';
import { MainHeaderView } from '@core/Headers/MainHeader';
import { Styles } from '@styles/load';
import { TextView } from '@components/TextView';
import { PrimaryButtonView } from '@components/PrimaryButtonView';
import { FormadjoForm } from '@core/Validators/FormadjoForm';
import { phoneFormTemplate } from '@utils/forms';

export type phoneScreenPresenterProps = {
  onContinuePress(values: { phone: string }): Promise<void>;
};
const PhoneScreenPresenter: React.FC<phoneScreenPresenterProps> = ({ onContinuePress }) => {
  return (
    <ScreenLayoutView
      backgroundColor={colors.whiteFF}
      styles={[Styles.Container.screenLayout, Styles.Container.serviceScreenLayoutHeader]}
    >
      <MainHeaderView />
      <FormadjoForm
        form={phoneFormTemplate}
        initialProps={{
          phone: '',
        }}
        onFinishSubmit={onContinuePress}
      >
        {
          ({
            onSubmit,
            values,
            errorsList: { phone },
            updateFormState,
          }) => {
            return (
              <React.Fragment>
                <View style={[Styles.MarginPadding.mt32]}>
                  <TextView text="my_phone" styles={Styles.Text.bigBoldBlack34} />
                  <TextView text="my_phone_msg" styles={Styles.Text.smallText13Black} />
                </View>
                <View style={[Styles.Layout.w100, Styles.MarginPadding.mt32]}>
                  <NumberInputView
                    value={values.phone}
                    disabled={false}
                    onChange={(v) => updateFormState('phone', v)}
                  />
                  {phone.isError && <Text style={[Styles.Text.smallTextRedBold14, Styles.MarginPadding.ml5, Styles.MarginPadding.mt5]}>{phone.errorMessage}</Text>}
                </View>
                <View style={Styles.MarginPadding.mt18pc}>
                  <PrimaryButtonView
                    onPress={onSubmit}
                    styles={{ outline: Styles.Button.primaryButton, text: Styles.Text.primaryButtonText }}
                    text="continue"
                  />
                </View>
              </React.Fragment>
            );
          }
        }
      </FormadjoForm>
    </ScreenLayoutView>
  );
};

export { PhoneScreenPresenter };
