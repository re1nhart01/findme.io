export interface ISliceBaseModel {
  loading: boolean;
  error: {
    isError: boolean;
    errorMessage: string;
  };
}
