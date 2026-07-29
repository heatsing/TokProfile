export type Result<T, E = Error> =
  | {
      data: T;
      error: null;
      ok: true;
    }
  | {
      data: null;
      error: E;
      ok: false;
    };
