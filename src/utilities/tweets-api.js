import sendRequest from "./send-request";

const BASE_URL = '/api/tweets';

export function getAll(){
    return sendRequest(BASE_URL);
}

export function getTweet(id){
    return sendRequest(`${BASE_URL}/${id}`)
}

export function getReplies(id){
    return sendRequest(`${BASE_URL}/replies/${id}`)
}

export function createTweet(body) {
    return sendRequest(BASE_URL, "POST", body);
}

export function createReply(id, body) {
    return sendRequest(`${BASE_URL}/${id}`, "POST", body)
}

export function deleteTweet(id) {
    return sendRequest(`${BASE_URL}/${id}`,"DELETE")
}

export function removeReply(tweetId, replyId){
    return sendRequest(`${BASE_URL}/replies/${tweetId}/${replyId}`, "PATCH")
}