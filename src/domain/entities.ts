export interface User {
  readonly id: number;
  readonly name: string;
  readonly username: string;
}

export interface Post {
  readonly id: number;
  readonly userId: number;
  readonly title: string;
  readonly body: string;
}
