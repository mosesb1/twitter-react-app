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

export function findUserByName(username){
  return sendRequest(`${BASE_URL}/name/${username}`);
}

export function userLike(userId, tweetId){
  return sendRequest(`${BASE_URL}/${userId}/${tweetId}`, "PATCH");
}

export function userRemoveLike(userId, tweetId){
  return sendRequest(`${BASE_URL}/remove/${userId}/${tweetId}`, "PATCH");
}

export function follow(userId, followId){
  return sendRequest(`${BASE_URL}/follow/${userId}/${followId}`, "PATCH");
}

export function removeFollow(userId, followId){
  return sendRequest(`${BASE_URL}/follow/remove/${userId}/${followId}`, "PATCH");
}

export function bookmark(userId, tweetId){
  return sendRequest(`${BASE_URL}/bookmark/${userId}/${tweetId}`, "PATCH");
}

export function removeBookmark(userId,tweetId){
  return sendRequest(`${BASE_URL}/bookmark/remove/${userId}/${tweetId}`, "PATCH");
}

export function deleteUser(userId){
  return sendRequest(`${BASE_URL}/${userId}`, "DELETE");
}

export function changeUsername(userId, body){
  return sendRequest(`${BASE_URL}/username/${userId}`, "PATCH", body);
}

export function changeEmail(userId, body) {
  return sendRequest(`${BASE_URL}/email/${userId}`, "PATCH", body);
}

export function changePassword(userId, body) {
  return sendRequest(`${BASE_URL}/changepassword/${userId}`, "POST", body);
}

export function updateUserImg(userId, body) {
  return sendRequest(`${BASE_URL}/image/${userId}`, "PATCH", body);
}