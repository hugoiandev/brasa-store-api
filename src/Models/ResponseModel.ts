class ResponseModel<T> {
  public message: string;
  public success: boolean;
  public data: T | null;
  public errors: string | string[] | null;

  constructor({
    message,
    success = true,
    data,
    errors,
  }: {
    message: string;
    success?: boolean;
    data?: T;
    errors?: string | string[];
  }) {
    this.message = message;
    this.success = success;
    this.data = data ?? null;
    this.errors = errors ?? null;
  }
}

export default ResponseModel;
