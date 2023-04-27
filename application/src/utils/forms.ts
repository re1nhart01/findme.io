import { FormadjoValidator } from '@core/Validators/MainFormadjo';
import { FormadjoFormer } from '@core/Validators/FormadjoFormer';
import { FormadjoField } from '@core/Validators/Formadjo';

export type IBasicInformationFormTemplate = {
  email: string;
  password: string;
  rePassword: string;
}

export const basicInformationFormTemplate = new FormadjoFormer<IBasicInformationFormTemplate>({
  email: new FormadjoField('email', 'string')
    .setRegexpValidation(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .setMinLength(7)
    .setIsRequired(true),
  password: new FormadjoField('password', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100),
  rePassword: new FormadjoField('rePassword', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100)
    .setDependingField('password'),
});

export type IPersonalInformationFormTemplate = {
  firstName: string;
  lastName: string;
  details: string;
  birthday: number;
};

export const personalInformationFormTemplate = new FormadjoFormer<IPersonalInformationFormTemplate>({
  firstName: new FormadjoField('firstName', 'string')
    .setMinLength(2)
    .setIsRequired(true),
  lastName: new FormadjoField('lastName', 'string')
    .setIsRequired(true)
    .setMinLength(2)
    .setMaxLength(100),
  details: new FormadjoField('details', 'string')
    .setIsRequired(true)
    .setMinLength(10)
    .setMaxLength(100),
  birthday: new FormadjoField('birthday', 'number')
    .setIsRequired(true)
    .setMinLength(1005)
    .setMaxLength(Date.now()),
});

export type ILocationFormTemplate = {
  country: string;
  city: string;
};

export const locationFormTemplate = new FormadjoFormer<ILocationFormTemplate>({
  country: new FormadjoField('Country', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100)
    .setRegexpValidation(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/gm),
  city: new FormadjoField('City', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100)
    .setRegexpValidation(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/gm),
});