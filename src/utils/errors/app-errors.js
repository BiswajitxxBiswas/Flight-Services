class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.explanation = this.explanation;
    }
}

module.exports = AppError;