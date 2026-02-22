import { defineContentScript } from 'wxt/utils/define-content-script';
import { injectScript } from 'wxt/utils/inject-script';
import { browser } from 'wxt/browser';
import { sendMessage } from '../utils/messaging';


export default defineContentScript({
    matches: ['https://chatgpt.com/*'],
    async main() {
        console.log('Content script loaded');


        setTimeout(async () => {
            try {
                console.log('Toggling dev mode...');
                console.log('Sending auth token request from background script...');

                const auth_token = await sendMessage('msg', {
                    senderId: browser.runtime.id,
                    type: 'auth_token_request',
                    payload: ''
                });

                if (!auth_token) {
                    throw new Error('auth token not received from background script');
                }

                console.log('Auth token received from background script:', auth_token);

                console.log('Injecting dev mode toggle script...');

                await injectScript('/toggle_dev.js', {
                    keepInDom: true,
                    modifyScript: (script) => {
                        script.dataset['auth_token'] = auth_token;
                    }
                });

                console.log('Dev mode toggle script injected successfully');
            } catch (error) {
                console.error('Error toggling dev mode:', error);
                return;
            }

        }, 3000);
    }
});