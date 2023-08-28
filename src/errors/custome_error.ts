export class CError extends Error {
  constructor(
    message: string,
    readonly status_code = 500,
    readonly message_details: any[] = []
  ) {
    super(message);
  }

  is_there_message_details() {
    return this.message_details.length !== 0;
  }
}
