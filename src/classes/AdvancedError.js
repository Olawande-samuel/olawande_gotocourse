class AdvancedError extends Error {
    constructor(msg, statusCode){
        super(msg);
        this.statusCode = statusCode;
    }

}



export default AdvancedError;