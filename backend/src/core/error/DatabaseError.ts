import { CustomError } from "./index";

export default class DatabaseError  extends CustomError {
  private static readonly _statusCode = 500;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: unknown };

  constructor(params?: { code?: number, message?: string, logging?: boolean, context?: { [key: string]: unknown } }) {
    const { code, message, logging } = params || {};

    super(message || "Database error");
    this._code = code || DatabaseError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {};
    this.name = "DatabaseError";

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}