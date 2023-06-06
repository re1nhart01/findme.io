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
    .setMinLength(4)
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
    .setRegexpValidation(new RegExp('^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$', 'mi')),
  city: new FormadjoField('City', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100)
    .setRegexpValidation(new RegExp('^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$', 'mi')),
});

export type IPhoneFormTemplate = {
  phone: string;
}

export const phoneFormTemplate = new FormadjoFormer<IPhoneFormTemplate>({
  phone: new FormadjoField('Phone', 'string')
    .setIsRequired(true)
    .setMinLength(10)
    .setMaxLength(25),
});

// Login

export type ILoginFormTemplate = {
  login: string;
  password: string;
};

export const loginFormTemplate = new FormadjoFormer<ILoginFormTemplate>({
  login: new FormadjoField('Login', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(500),
  password: new FormadjoField('Password', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(500),
});

export type IGenderFormTemplate = {
  gender: string;
  lookingForGender: string;
};

export const genderSelectTemplate = new FormadjoFormer<IGenderFormTemplate>({
  gender: new FormadjoField('Gender', 'string')
    .setIsRequired(true)
    .setMinLength(3)
    .setMaxLength(500),
  lookingForGender: new FormadjoField('LookingForGender', 'string')
    .setIsRequired(true)
    .setMinLength(3)
    .setMaxLength(500),
});

export type IInterestsFormTemplate = {
  interests: Array<number>;
};

export const interestSelectTemplate = new FormadjoFormer<IInterestsFormTemplate>({
  interests: new FormadjoField('Interest', 'object')
    .setMinLength(3)
    .setMaxLength(3)
    .setArrayValueType('number')
    .setIsRequired(true)
    .setType('object'),
});

export type IEditProfileForm = {
  firstName: string;
  lastName: string;
  birthday: number;
  city: string;
  country: string;
  details: string;
}

export const editProfileForm = new FormadjoFormer<IEditProfileForm>({
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
  country: new FormadjoField('Country', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100)
    .setRegexpValidation(new RegExp('^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$', 'mi')),
  city: new FormadjoField('City', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(100)
    .setRegexpValidation(new RegExp('^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$', 'mi')),
});

export type IEditMoodRelationsForm = {
  mood: string;
  relationship: string;
}

export const editMoodRelationsForm = new FormadjoFormer<IEditMoodRelationsForm>({
  mood: new FormadjoField('Mood', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(250),
  relationship: new FormadjoField('Relationship', 'string')
    .setIsRequired(true)
    .setMinLength(5)
    .setMaxLength(250),
});
