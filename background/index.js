import { someFunction } from "./module.js";

console.log("Background script loaded");

someFunction();

// chrome webRequest 예시
chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log('Request completed:', details.url, 'IP:', details.ip);
  },
  {urls: ["<all_urls>"]}
);
