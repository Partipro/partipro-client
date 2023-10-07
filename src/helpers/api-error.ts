import get from "lodash/get";

export default class ApiError extends Error {
  constructor(error: unknown) {
    super();

    this.name = get(error, "response.data.error.name", "unexpected_error");
    this.message = get(
      error,
      "response.data.error.message",
      "unexpected_error",
    );

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
