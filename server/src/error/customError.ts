class CustomError extends Error {
    errorCode: number;
    
    constructor(message: string, errorCode: number = 400) {
        super(message);
        this.name = this.constructor.name;
        this.errorCode = errorCode;
    }
  }

  export default CustomError;