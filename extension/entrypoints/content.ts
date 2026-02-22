import { defineContentScript } from 'wxt/utils/define-content-script';
import { browser } from 'wxt/browser';
import { storage } from '#imports';
import { waitFor, listenForSummon } from '../utils/load';
import { sendMessage } from '../utils/messaging';


export default defineContentScript({
    matches: ['https://chatgpt.com/*'],
    async main() {
        console.log('Content script loaded');


        const check_dev_mode_status = async (auth_token: string) => {
            const dev_mode_confirm_url = 'https://chatgpt.com/backend-api/settings/user';

            const response = await fetch(dev_mode_confirm_url, {
                method: 'GET',
                headers: {
                    authorization: auth_token
                }
            });

            if (!response.ok) {
                throw new Error(`failed to confirm dev mode status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Dev mode on:', data?.settings?.developer_mode);

            return data?.settings?.developer_mode;
        };


        const toggle_dev_mode = async (auth_token: string) => {
            // back up manual toggle with: https://chatgpt.com/#settings/Connectors/Advanced

            const dev_mode_status = await check_dev_mode_status(auth_token);

            const base_url = 'https://chatgpt.com/backend-api/settings/account_user_setting?feature=developer_mode&value=';
            const dev_mode_url = `${base_url}${!dev_mode_status}`;

            const response = await fetch(dev_mode_url, {
                method: 'PATCH',
                headers: {
                    authorization: auth_token
                },
            });

            if (!response.ok) {
                throw new Error(`1. failed to toggle dev mode: ${response.status}`);
            }

            const data = await response.json();

            if (data?.developer_mode !== !dev_mode_status) {
                throw new Error('2. failed to toggle dev mode');
            }

            const new_dev_mode_status = await check_dev_mode_status(auth_token);

            if (new_dev_mode_status === dev_mode_status) {
                throw new Error('3. failed to toggle dev mode');
            }

            console.log('Successfully toggled dev mode');

            await fetch('https://chatgpt.com/backend-api/system_hints?mode=connectors', {
                method: 'GET',
                headers: {
                    authorization: auth_token
                }
            });
        };


        const tigger_summoned = await storage.getItem('local:tigger_summoned');
        console.log('Tigger summoned status:', tigger_summoned);


        // wait for tigger's summoning
        await waitFor('#prompt-textarea');
        listenForSummon('#prompt-textarea', '@tigger ', async () => {
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

                await toggle_dev_mode(auth_token);

                await storage.setItem('local:tigger_summoned', !tigger_summoned);

                window.location.reload();
            } catch (error) {
                console.error('Error toggling dev mode:', error);
                return;
            }
        });
    }
});