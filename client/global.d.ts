declare global {
  type User = {
    id: number;
    created_at: Date;
    updated_at: Date;
    name: string;
    deleted_at: Date | null;
  };

  interface StateAction {
    type: string;
    payload: any;
  }

  interface APIResponseResult<T> {
    users: T;
    message: string;
  }

  interface AbortController {
    readonly signal: AbortSignal;
  }
}

export {};
