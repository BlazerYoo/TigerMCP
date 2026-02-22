import { defineConfig } from 'wxt';

export default defineConfig({
    manifest: {
        permissions: ['webRequest', 'storage'],
        host_permissions: ['https://chatgpt.com/*'],
        web_accessible_resources: [
            {
                resources: ['toggle_dev.js'],
                matches: ['https://chatgpt.com/*']
            }
        ]
    }
});