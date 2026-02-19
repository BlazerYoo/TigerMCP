import { browser } from 'wxt/browser';

export default defineBackground(() => {
    console.log('Background script loaded');

    browser.webRequest.onBeforeSendHeaders.addListener(
        (details) => {
            console.log('Request URL:', details.url);
            console.log('Request Headers:', details.requestHeaders);
            return { requestHeaders: details.requestHeaders };
        },
        {
            urls: [
            ]
        },
        ['requestHeaders']
    );
});