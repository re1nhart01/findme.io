export interface ISliceBaseModel {
  loading: boolean;
  error: {
    isError: boolean;
    errorMessage: string;
  };
}

export interface Action {
  type: string;
  payload?: unknown;
}

export interface ISliceError {
  errorMessage: string;
  isError: boolean;
}
