export type ValueOf<T> = T[keyof T]

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};

export type Arguments<T extends (args: any) => any> = T extends (args: infer A) => any ? A : never;
