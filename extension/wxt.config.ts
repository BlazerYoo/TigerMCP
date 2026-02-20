import { defineConfig } from 'wxt';

export default defineConfig({
    manifest: {
        permissions: ['webRequest'],
        host_permissions: ['https://chatgpt.com/*']
    }
});