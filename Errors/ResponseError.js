export default class ResponseError extends Error {
    constructor(message, response, responseStatus) {
        super(message + " " + response);
        this.name = "ResponseError";

        if(responseStatus)  {
            alert(message + " STATUS: " + responseStatus + " " + response);
            return;
        }
        alert(message + " " + response)
    }
}