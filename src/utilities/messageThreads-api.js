import sendRequest from "./send-request";

const BASE_URL = '/api/messageThreads';

export function getThread(userId, recipientId){
    return sendRequest(`${BASE_URL}/${userId}/${recipientId}`);
}

export function getThreadById(threadId){
    return sendRequest(`${BASE_URL}/thread/${threadId}`);
}

export function createThread(userId, recipientId){
    return sendRequest(`${BASE_URL}/${userId}/${recipientId}`, "POST");
}

export function addMessage(threadId, messageId){
    return sendRequest(`${BASE_URL}/${threadId}/${messageId}`, "PATCH");
}

export function deleteThread(threadId){
    return sendRequest(`${BASE_URL}/${threadId}`, "DELETE");
}

export function getThreads(userId){
    return sendRequest(`${BASE_URL}/${userId}`);
}