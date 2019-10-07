class ResponseError {
    constructor(error, status, message){
        this.error=error;
        this.status=status;
        this.message=message;
    }
}
module.exports=ResponseError;