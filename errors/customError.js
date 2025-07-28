import { StatusCodes } from "http-status-codes";
export class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = 'CustomError';
    }
  }

  export class NotFoundError extends CustomError {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';  
      this.statusCode = StatusCodes.NOT_FOUND;
    }
  }

  export class BadRequestError extends CustomError {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';  
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
  export class UnauthorizedError extends CustomError {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedError';  
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  export class ForbiddenError extends CustomError {
    constructor(message) {
      super(message);
      this.name = 'ForbiddenError';  
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }