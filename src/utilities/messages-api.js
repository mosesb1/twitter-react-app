import sendRequest from './send-request';

const BASE_URL = '/api/messages';

export function getMessages(threadId){
    return sendRequest(`${BASE_URL}/${threadId}`);
}

export function deleteMessage(messageId){
    return sendRequest(`${BASE_URL}/${messageId}`, "DELETE");
}

export function createMessage(threadId){
    return sendRequest(`${BASE_URL}/${threadId}`, "POST");
}