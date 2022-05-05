import sendRequest from './send-request';

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function findUser(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function userLike(userId, tweetId){
  return sendRequest(`${BASE_URL}/${userId}/${tweetId}`, "PATCH");
}

export function userRemoveLike(userId, tweetId){
  return sendRequest(`${BASE_URL}/remove/${userId}/${tweetId}`, "PATCH")
}