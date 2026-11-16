export interface AsyncIdle {
  readonly status: 'idle';
}

export interface AsyncLoading {
  readonly status: 'loading';
}

export interface AsyncSuccess<T> {
  readonly status: 'success';
  readonly data: T;
}

export interface AsyncError {
  readonly status: 'error';
  readonly error: string;
}

export type AsyncState<T> =
  | AsyncIdle
  | AsyncLoading
  | AsyncSuccess<T>
  | AsyncError;

export interface NewPostInput {
  readonly title: string;
  readonly body: string;
}
