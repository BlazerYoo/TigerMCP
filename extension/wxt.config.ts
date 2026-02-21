import { defineConfig } from 'wxt';

export default defineConfig({
    manifest: {
        permissions: ['webRequest', 'storage'],
        host_permissions: ['https://chatgpt.com/*']
    }
});