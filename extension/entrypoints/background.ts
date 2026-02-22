import { defineBackground } from 'wxt/utils/define-background';
import { browser } from 'wxt/browser';
import { storage } from '#imports';
import { onMessage } from '../utils/messaging';


export default defineBackground(() => {
    console.log('Background script loaded');


    const backend_api_url = 'https://chatgpt.com/backend-api/';


    // intercept backend API requests
    browser.webRequest.onBeforeSendHeaders.addListener(
        (details): undefined => {
            (async () => {
                if (details.url.includes(backend_api_url)) {

                    // find auth token
                    console.log('Request to backend API:', details.url);
                    const headers = details.requestHeaders || [];
                    const authorization = headers.find(obj =>
                        obj.name.toLowerCase().includes('authorization')
                    );

                    // store auth token
                    if (authorization) {
                        console.log('Auth header found:', authorization);

                        const auth_token = await storage.getItem('local:auth_token');

                        if (auth_token !== authorization?.value) {
                            console.log('Auth token outdated or not stored');
                            await storage.setItem('local:auth_token', authorization?.value);
                            console.log('Auth token stored/updated successfully');
                        } else {
                            console.log('Latest auth token already stored');
                        }
                    }
                }
            })();
        },
        { urls: ['https://chatgpt.com/*'] },
        ['requestHeaders']
    );


    // handle messages from content script
    onMessage('msg', async (message) => {
        try {

            // only process messages from same extension
            if (message.data.senderId !== browser.runtime.id) {
                throw new Error('unknown sender ID');
            }

            // handle auth token request
            if (message.data.type === 'auth_token_request') {
                console.log('Received auth token request from content script');

                const auth_token = await storage.getItem('local:auth_token');

                if (!auth_token) {
                    throw new Error('auth token not found in storage');
                }

                console.log('Sending auth token to content script:', auth_token);

                return auth_token;
            } else {
                throw new Error('unknown message type');
            }
        } catch (error) {
            console.error('Error handling message:', error);
            return '';
        }
    });
});