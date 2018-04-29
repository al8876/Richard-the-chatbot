const API_AI_TOKEN = 'f8c2b8f3b9db46589df0f6b14d47d908';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAADmcmb9ymEBAErKFgXVHBnBMwl4BrZAyk2kANApz1MD841kesXeZB17ZAfs6ytmA2zLD45ZCY1bHi80ZBO5fIlZCl7Qur9uA8aZBTvR8OOF4S4ebY2UChtE11e2q2aQEIWnMGhPDBxaou6RkNFWxKOFxIZBk8JdsalaLiDZBguOuekfnTVkIplZBt';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};