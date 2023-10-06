import get from "lodash/get";

export default class ApiError extends Error {
  constructor(error: unknown) {
    super();

    this.name = get(error, "response.data.name", "unexpected_error");

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
