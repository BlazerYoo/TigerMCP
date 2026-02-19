export default defineContentScript({
    matches: ['https://chatgpt.com/'],
    async main() {
        console.log('Content script loaded');

        const url = 'https://chatgpt.com/backend-api/settings/account_user_setting';
        const data = { feature: 'developer_mode', value: true };

        // https://chatgpt.com/#settings/Connectors/Advanced
    }
});