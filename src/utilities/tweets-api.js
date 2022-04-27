import sendRequest from "./send-request";

const BASE_URL = '/api/tweets';

export function getAll(){
    return sendRequest(BASE_URL);
}