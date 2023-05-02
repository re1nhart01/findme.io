import { AxiosError } from "axios";
import { err } from "react-native-svg/lib/typescript/xml";

export class Boundary {
  private readonly ms: string;

  private readonly timeCode: number;

  private readonly trace: string | undefined;

  private readonly is500: boolean | undefined;

  constructor(error: AxiosError<unknown, unknown>) {
    this.ms = 'FATAL_ERROR_CAUSE';
    this.timeCode = Date.now();
    if (error.toJSON !== void 0) {
      this.trace = error.toJSON().toString();
      this.is500 = error.status === 500;
    }
  }

  public get boundaryBody() {
    return {
      ms: this.ms,
      timeCode: this.timeCode,
      trace: this.trace,
      isFatal500: this.is500,
    };
  }
}
