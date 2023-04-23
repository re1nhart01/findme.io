import React, { useCallback, useMemo, useReducer } from 'react';
import { Formadjo, FormadjoValidator, errorPart, formValuesType } from './MainFormadjo';

type formadjoFormFuncValue = {
  onSubmit(values: any): void;
  errorsList: { [key: string]: errorPart };
  values: { [key: string]: formValuesType };
  updateFormState(k: string, v: formValuesType): void;
  updateManyFormState(properties: { [key: string]: formValuesType }): void;
};

type formadjoFormProps = {
  form: FormadjoValidator;
  onFinishSubmit(values: { [key: string]: formValuesType }): void;
  children?: (data: formadjoFormFuncValue) => JSX.Element;
  initialProps: { [key: keyof formadjoFormProps['form']]: formValuesType };
  customErrorMessages?: { [key: keyof formadjoFormProps['initialProps'] ]:string }
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

const FormadjoForm: React.FC<formadjoFormProps> = ({ children, initialProps, customErrorMessages, form, onFinishSubmit }) => {
  const initialErrorList = useMemo(() => Object.keys({ ...initialProps }).reduce((acc, curr) => ({
    ...acc, [curr]: { isError: false, errorMessage: '' },
  }), {}), [initialProps]);

  const initialReducerProps: reducerBody = useMemo(() => ({
    errorNumberFields: { ...initialErrorList },
    formValues: { ...initialProps || {} },
  }), [initialProps, initialErrorList]);

  const [state, dispatch] = useReducer(formadjoReducer, initialReducerProps, void 0);

  const onSubmit = useCallback((value: { [key: string]: formValuesType }) => {
    dispatch({ type: 'CLEAR_ERRORS', payload: initialErrorList });
    const errorList = new Formadjo(form);
    const res = errorList.validateForm(state.formValues);
    if (Object.keys(res).length > 0) {
      for (const [key, value] of Object.entries(res)) {
        setErrorField(key, value);
      }
    } else {
      onFinishSubmit && onFinishSubmit(value);
    }
  }, [state, form, initialErrorList]);

  const setErrorField = useCallback((k: string, v: errorPart) => {
    dispatch({ type: 'UPDATE_ERROR_VALUE', payload: { [k]: v } });
  }, []);

  const updateFormState = useCallback((k: string, v: formValuesType) => {
    dispatch({ type: 'UPDATE_FORM_VALUE', payload: { [k]: v } });
  }, [state, dispatch]);

  const updateManyFormState = useCallback((properties: { [key: string]: formValuesType }) => {
    dispatch({ type: 'UPDATE_FORM_VALUE', payload: { ...properties } });
  }, [state, dispatch]);

  return (
    <React.Fragment>
      {
        children ? children({
          onSubmit,
          errorsList: state.errorNumberFields,
          values: state.formValues,
          updateFormState,
          updateManyFormState,
        }) : null
      }
    </React.Fragment>
  );
};

export { FormadjoForm };
