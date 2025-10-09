/** Deeply remove optionals from a type and replace them with `| undefined`. */
export type NoOptionals<T> = {
  [P in keyof T]-?: undefined extends T[P]
    ? T[P]
    : T[P] extends undefined
      ? T[P]
      : T[P] extends object
        ? NoOptionals<T[P]>
        : T[P];
};
