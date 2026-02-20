import { defineContentScript } from 'wxt/utils/define-content-script';
import { browser } from 'wxt/browser';
import { sendMessage } from '../utils/messaging';


export default defineContentScript({
    matches: ['https://chatgpt.com/*'],
    async main() {
        console.log('Content script loaded');

        setTimeout(async () => {
            console.log('Toggling dev mode...');
            console.log('Sending auth value request from background script...');

            const auth_value = await sendMessage('msg', {
                senderId: browser.runtime.id,
                type: 'auth_value_request',
                payload: ''
            });

            if (auth_value) {
                // toggle_dev_mode(auth_value);

                console.log('Auth value received from background script:', auth_value);
            } else {
                console.error('Failed to retrieve authorization value from background script');
            }
        }, 5000);


        const check_dev_mode_status = async (auth_value: string) => {
            const dev_mode_confirm_url = 'https://chatgpt.com/backend-api/settings/user';

            const settings = await fetch(dev_mode_confirm_url, {
                method: 'GET',
                headers: {
                    authorization: auth_value
                }
            });


            // if (response?.settings?.developer_mode) {
            //     console.log('Dev mode enabled');
            // } else {
            //     console.error('Failed to enable dev mode: Unexpected response structure', response);
            //     return 'failed';
            // }

        };


        const toggle_dev_mode = async (auth_value: string) => {
            try {
                // https://chatgpt.com/#settings/Connectors/Advanced
                const dev_mode_url = 'https://chatgpt.com/backend-api/settings/account_user_setting';
                const data = { feature: 'developer_mode', value: true };


                const response = await fetch(dev_mode_url, {
                    method: 'PATCH',
                    headers: {
                        authorization: auth_value
                    },
                    body: JSON.stringify(data)
                });

                console.log(response);
                return 'ok';
            } catch (error) {
                return 'failed';
            }
        };
    }
});