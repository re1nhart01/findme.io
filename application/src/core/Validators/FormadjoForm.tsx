import React, { useCallback, useMemo, useReducer } from 'react';
import { Formadjo, FormadjoValidator, errorPart, formValuesType } from './MainFormadjo';

type formadjoFormFuncValue<T> = {
  onSubmit(values: any): void;
  errorsList: { [key in keyof T]: errorPart };
  values: { [key in keyof T]: T[key] };
  updateFormState(k: keyof T, v: formValuesType): void;
  updateManyFormState(properties: { [key in keyof T]: formValuesType }): void;
};

type formadjoFormProps<T> = {
  form: FormadjoValidator;
  onFinishSubmit(values: { [key: string]: formValuesType }): void;
  children?: (data: formadjoFormFuncValue<T>) => JSX.Element;
  initialProps: { [key in keyof T]: formValuesType };
  customErrorMessages?: { [key in keyof T]:string }
};

type formadjoAction = {
  type: string;
  payload: any;
}

type reducerBody = {
  errorNumberFields: { [key: keyof reducerBody['formValues']]: errorPart };
  formValues: { [key: string]: formValuesType };
}

type Action = { type: 'CLEAR_ERRORS', payload: { [key: string]: errorPart } } |
  { type: 'UPDATE_FORM_VALUE', payload: { [key: string]: formValuesType } } |
  { type: 'UPDATE_ERROR_VALUE', payload: { [key: string]: formValuesType } };

function formadjoReducer(state: reducerBody, action: Action) {
  switch (action.type) {
    case 'UPDATE_FORM_VALUE':
      return { ...state, formValues: { ...state.formValues, ...action.payload } };
    case 'UPDATE_ERROR_VALUE':
      return { ...state, errorNumberFields: { ...state.errorNumberFields, ...action.payload as { [k: string]: errorPart } } };
    case 'CLEAR_ERRORS':
      return { ...state, errorNumberFields: action.payload };
    default:
      return state;
  }
}

const FormadjoForm = <T extends object>({ children, initialProps, customErrorMessages, form, onFinishSubmit }: formadjoFormProps<T>) => {
  const initialErrorList = useMemo(() => Object.keys({ ...initialProps }).reduce((acc, curr) => ({
    ...acc, [curr]: { isError: false, errorMessage: '' },
  }), {}), [initialProps]);

  const initialReducerProps: reducerBody = useMemo(() => ({
    errorNumberFields: { ...initialErrorList },
    formValues: { ...initialProps || {} },
  }), [initialProps, initialErrorList]);

  const [state, dispatch] = useReducer(formadjoReducer, initialReducerProps, void 0);

  const onSubmit = useCallback(() => {
    dispatch({ type: 'CLEAR_ERRORS', payload: initialErrorList });
    const errorList = new Formadjo(form);
    const res = errorList.validateForm(state.formValues);
    if (Object.values(res).some((el) => el.isError)) {
      for (const [key, value] of Object.entries(res)) {
        setErrorField(key, value);
      }
    } else {
      onFinishSubmit && onFinishSubmit(state.formValues);
    }
  }, [state, form, initialErrorList]);

  const setErrorField = useCallback((k: string, v: errorPart) => {
    dispatch({ type: 'UPDATE_ERROR_VALUE', payload: { [k]: v } });
  }, []);

  const updateFormState = useCallback((k: keyof T, v: formValuesType) => {
    dispatch({ type: 'UPDATE_FORM_VALUE', payload: { [k]: v } });
  }, [state, dispatch]);

  const updateManyFormState = useCallback((properties: { [key in keyof T]: formValuesType }) => {
    dispatch({ type: 'UPDATE_FORM_VALUE', payload: { ...properties } });
  }, [state, dispatch]);

  return (
    <React.Fragment>
      {
        children ? children({
          onSubmit,
          errorsList: state.errorNumberFields as { [key in keyof T]: errorPart; },
          values: state.formValues as { [key in keyof T]: T[key]; },
          updateFormState,
          updateManyFormState,
        }) : null
      }
    </React.Fragment>
  );
};

export { FormadjoForm };
