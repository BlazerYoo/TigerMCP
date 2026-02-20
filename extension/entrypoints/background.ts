import { defineBackground } from 'wxt/utils/define-background';
import { browser } from 'wxt/browser';
import { storage } from '#imports';
import { onMessage } from '../utils/messaging';


export default defineBackground(() => {
    console.log('Background script loaded');


    const backend_api_url = 'https://chatgpt.com/backend-api/';


    browser.webRequest.onBeforeSendHeaders.addListener(
        (details): undefined => {
            (async () => {
                if (details.url.includes(backend_api_url)) {
                    console.log('Request to backend API:', details.url);
                    const headers = details.requestHeaders || [];
                    const authorization = headers.find(obj =>
                        obj.name.toLowerCase().includes('authorization')
                    );

                    if (authorization) {
                        console.log('Authorization header found:', authorization);

                        const auth_value_stored = await storage.getItem('local:auth_value_stored');

                        if (!auth_value_stored) {
                            await storage.setItem('local:auth_value_stored', authorization?.value);
                            console.log('Authorization value stored successfully');
                        } else {
                            console.log('Authorization value already stored');
                        }
                    }
                }
            })();
        },
        { urls: ['https://chatgpt.com/*'] },
        ['requestHeaders']
    );


    onMessage('msg', async (message) => {
        try {
            if (message.data.senderId !== browser.runtime.id) {
                throw new Error('unknown sender ID');
            }

            if (message.data.type === 'auth_value_request') {
                console.log('Received auth value request from content script');

                const auth_value = await storage.getItem('local:auth_value_stored');

                if (!auth_value) {
                    console.error('Authorization value not found in storage');
                    return '';
                }

                return auth_value;
            }

            return '';

        } catch (error) {
            console.error(`Error handling message: ${error}`);
            return '';
        }

    });
});