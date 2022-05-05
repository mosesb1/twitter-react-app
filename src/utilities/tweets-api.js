import sendRequest from "./send-request";

const BASE_URL = '/api/tweets';

export function getAll(){
    return sendRequest(BASE_URL);
}

export function getTweet(id){
    return sendRequest(`${BASE_URL}/${id}`);
}

export function getUserTweets(id){
    return sendRequest(`${BASE_URL}/user/${id}`)
}

export function getUserTweetsAndReplies(id) {
    return sendRequest(`${BASE_URL}/user/all/${id}`)
}

export function getLikes(id){
    return sendRequest(`${BASE_URL}/likes/${id}`)
}

export function getReplies(id){
    return sendRequest(`${BASE_URL}/replies/${id}`);
}

export function tweetLike(tweetId, userId){
    return sendRequest(`${BASE_URL}/${tweetId}/${userId}`, "PATCH");
}

export function tweetRemoveLike(tweetId, userId){
    return sendRequest(`${BASE_URL}/remove/${tweetId}/${userId}`, "PATCH");
}

export function createTweet(body) {
    return sendRequest(BASE_URL, "POST", body);
}

export function createReply(id, body) {
    return sendRequest(`${BASE_URL}/${id}`, "POST", body);
}

export function deleteTweet(id) {
    return sendRequest(`${BASE_URL}/${id}`,"DELETE");
}

export function removeReply(tweetId, replyId){
    return sendRequest(`${BASE_URL}/replies/${tweetId}/${replyId}`, "PATCH");
}

export function editTweet(id, body){
    return sendRequest(`${BASE_URL}/${id}`, "PUT", body);
}